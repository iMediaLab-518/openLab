/*
Function  :modal.js
Author    :wl
Build_Date:2017-7-14
Version   :1.1.1
*/
/*使用说明
//Alert无回调调用形式
Alert('内容');
//Alert回调调用形式
Alert({
    msg: '内容',
    onOk: function(){
    }
});
//Confirm调用形式
Confirm({
    msg: '内容',
    onOk: function(){

    },
    onCancel: function(){
 
    }
});
//自定义模态框调用形式
var modal = new Modal({
    title: '',//模态框的标题
    content: '',//模态框的内容
    width: ,//模态框的宽度
    buttons: [//模态框底部的按钮
        {
            html: '<button type="button" class="btn btn-sm btn-default btn-ok">确定</button>',//按钮的内容
            selector: '.btn-ok',//按钮的类型
            callback: function(){
                //点击确定按钮的回调
            }
        },
        {
            html: '<button type="button" class="btn btn-sm btn-default btn-cancel">取消</button>',
            selector: '.btn-cancel',
            callback: function(){
                //点击取消按钮的回调
            }
        }
    ]
    //如有需要，在下方写回调函数
});
$('#btn-audit').click(function(){//触发对象
    modal.open();
});
*/
var Modal = (function ($) {
    //遮罩处理
    var $body = $(document.body),
        BackDrop = (function () {
            var $backDrop,
                count = 0,
                create = function () {
                    $backDrop = $('<div class=""></div>').appendTo($body);
                };

            return {
                show: function () {
                    !$backDrop && create();
                    $backDrop[0].style.display = 'block';
                    count++;
                },
                hide: function () {
                    count--;
                    if (!count) {
                        $backDrop.remove();
                        $backDrop = undefined;
                    }
                }
            }
        })(),
        //获得模态框结构
        getTpl = function () {
            return ['<div class="modal fade" data-backdrop="false" data-show="false" data-keyboard="false">',
                '    <div class="modal-dialog">',
                '        <div class="modal-content">',
                '            <div class="modal-header">',
                '                <h4 class="modal-title"></h4>',
                '            </div>',
                '            <div class="modal-body"></div>',
                '            <div class="modal-footer"></div>',
                '        </div>',
                '    </div>',
                '</div>'].join("");
        },
        //初始化模态框
        initModal = function (that, opts) {
            var $modal = createModal(that);
            that.setTitle(opts.title);//设置标题
            that.setContent(opts.content);//设置html内容
            that.addButtons(opts.buttons);//注册按钮
            that.setWidth(opts.width);//设置宽度
            bindHandler(that, opts);//注册modal事件
            $modal.modal();//调用bootstrap的Modal组件
            $modal.trigger('contentReady');//触发contentReady事件
        },
        //创建模态框
        createModal = function (that) {
            var $modal = that.$modal = $(getTpl()).appendTo($body);
            that.$modalTitle = $modal.find('.modal-title');
            that.$modalBody = $modal.find('.modal-body');
            that.$modalFooter = $modal.find('.modal-footer');
            return $modal;
        },
        //注册modal事件
        bindHandler = function (that, opts) {
            var $modal = that.$modal;
            typeof opts.onContentChange === 'function' && $modal.on('contentChange', $.proxy(opts.onContentChange, that));
            typeof opts.onContentReady === 'function' && $modal.on('contentReady', $.proxy(opts.onContentReady, that));
            typeof opts.onModalShow === 'function' && $modal.on('modalShow', $.proxy(opts.onModalShow, that));
            typeof opts.onModalHide === 'function' && $modal.on('modalHide', $.proxy(opts.onModalHide, that));
            $modal.on('show.bs.modal', function () {
                $modal.trigger('modalShow');
            });
            $modal.on('hidden.bs.modal', function () {
                $modal.trigger('modalHide');
            });
        },
        //获得默认的回调
        getDefaultBtnCallbackProxy = function (callbackName) {
            return function () {
                var opts = this.options,
                    callback = opts[callbackName] && typeof opts[callbackName] === 'function' ? opts[callbackName] : '';

                return callback && callback.apply(this, arguments);
            }
        };
    //变量声明
    function ModalDialog(options) {
        this.options = this.getOptions(options);
        this.$modal = undefined;
        this.$modalTitle = undefined;
        this.$modalBody = undefined;
        this.$modalFooter = undefined;
        this.state = undefined;
    }
    //组件的选项的默认值定义
    ModalDialog.defaults = {
        title: '',
        content: '',
        width: 800,
        buttons: [
            {
                html: '<button type="button" class="btn btn-sm btn-success btn-ok">确定</button>',
                selector: '.btn-ok',
                callback: getDefaultBtnCallbackProxy('onOk')
            },
            {
                html: '<button type="button" class="btn btn-sm btn-default btn-cancel">取消</button>',
                selector: '.btn-cancel',
                callback: getDefaultBtnCallbackProxy('onCancel')
            }
        ],
        onOk: $.noop,
        onCancel: $.noop,
        onContentReady: $.noop,
        onContentChange: $.noop,//content替换之后的回调
        onModalShow: $.noop,
        onModalHide: $.noop//modal关闭之后的回调
    };
    //主要函数
    $.extend(ModalDialog.prototype, {
        //获取内容
        getOptions: function (options) {
            return $.extend({}, ModalDialog.defaults, options || {});
        },
        //设置内容
        setOptions: function (options) {
            return $.extend(this.options, options || {});
        },
        //打开原型
        open: function (state) {
            this.state = state;
            !this.$modal && initModal(this, this.options);
            BackDrop.show();
            this.$modal.modal('show');
        },
        //隐藏原型
        hide: function () {
            var $modal = this.$modal;
            $modal.modal('hide');
            $modal.one('hidden.bs.modal', function () {
                BackDrop.hide();
            });
        },
        //设置标题
        setTitle: function (title, html) {
            this.$modalTitle[html === true ? 'html' : 'text'](title);
        },
        //设置html内容
        setContent: (function () {
            var init = true;
            return function (content) {
                this.$modalBody.html(content);
                !init ? this.$modal.trigger('contentChange') : (init = false);
            }
        })(),
        //注册按钮
        addButtons: function (buttons) {
            var buttons = !$.isArray(buttons) ? [] : buttons,
                that = this,
                htmlS = [];
            buttons.forEach(function (btn) {
                htmlS.push(btn.html);

                btn.selector && that.$modal.on('click', btn.selector, $.proxy(function (e) {

                    var self = this,
                        $btn = $(e.currentTarget);

                    //先禁用按钮
                    $btn[0].disabled = true;

                    var callback = typeof btn.callback === 'function' ? btn.callback : '',
                        ret = callback && callback.apply(self, arguments);

                    if (ret === false) {
                        $btn[0].disabled = false;
                        return;
                    }

                    if (typeof(ret) === 'object' && 'done' in ret && typeof ret['done'] === 'function') {
                        //异步任务只有在成功回调的时候关闭Modal
                        ret.done(function () {
                            that.hide();
                        }).always(function () {
                            $btn[0].disabled = false;
                        });
                    } else {
                        $btn[0].disabled = false;
                        that.hide();
                    }

                }, that));
            });

            this.$modalFooter.prepend($(htmlS.join('')));
        },
        //隐藏按钮
        hideButton: function (selector) {
            selector && this.$modalFooter.find(selector).hide();
        },
        //显示按钮
        showButton: function (selector) {
            selector && this.$modalFooter.find(selector).show();
        },
        //设置宽度
        setWidth: function (width) {
            this.$modal.find('.modal-dialog').css('width', width);
        }
    });

    //针对这些方法统一加个校验
    ['setTitle', 'setContent', 'addButtons', 'hideButton', 'showButton', 'setWidth'].forEach(function (name) {
        var _old = ModalDialog.prototype[name];
        ModalDialog.prototype[name] = function () {
            if (!arguments.length || !this.$modal) {
                return;
            }
            return _old.apply(this, arguments);
        }
    });

    return ModalDialog;
})(jQuery);

//注册Alert和Confirm函数
var Alert, Confirm;
(function () {
    var modal,
        Proxy = function (isAlert) {
            return function () {
                if (arguments.length != 1) return;
                var msg = typeof arguments[0] === 'string' && arguments[0] || arguments[0].msg || '',
                    onOk = typeof arguments[0] === 'object' && typeof arguments[0].onOk === 'function' && arguments[0].onOk,
                    onCancel = typeof arguments[0] === 'object' && typeof arguments[0].onCancel === 'function' && arguments[0].onCancel,
                    width = typeof arguments[0] === 'object' && arguments[0].width || 400,
                    _onModalShow = function () {
                        this.setWidth(width);
                        this.setContent(msg);
                        this[(isAlert ? 'hide' : 'show') + 'Button']('.btn-cancel');
                    },
                    _onModalHide = function () {
                        this.setContent('');
                    };

                //延迟初始化modal
                if(!modal) {
                    modal = new Modal({
                        'title': '操作提示',
                        onModalShow: _onModalShow,
                        onModalHide: _onModalHide,
                        onContentReady: function(){
                            this.$modalBody.css({
                                'padding-top': '30px',
                                'padding-bottom': '30px'
                            })
                        }
                    });
                } else {
                    var $modal = modal.$modal;
                    //如果modal已经初始化则需要重新监听事件
                    $modal.off('modalShow modalHide');
                    $modal.off('modalShow modalHide');
                    $modal.on('modalShow', $.proxy(_onModalShow, modal));
                    $modal.on('modalHide', $.proxy(_onModalHide, modal));
                }

                modal.setOptions({
                    onOk: onOk || $.noop,
                    onCancel: onCancel || $.noop
                });

                modal.open();
            }
        };

    Alert = Proxy(true);
    Confirm = Proxy();
})();
