//全局变量定义
var curInfo = {};
var requestData = {};
curInfo.curPage = 1;
curInfo.pageCapacity = 10;
curInfo.tableType = "big";
console.log($("#middle-table").children().length);

/*
函数名:dragAble 使可拖动函数
功能:将div设置为可拖动和缩放
参数:ele想要变成可拖动的div对象
返回值:无
*/

function dragAble(ele) {
  var eleId = ele.attr("id");
  if (curInfo[eleId] == 0) {
    var isMouseDown = false;
    var leftBorder = parseInt(ele.css("border-left-width"));
    var rightBorder = parseInt(ele.css("border-right-width"));
    var topBorder = parseInt(ele.css("border-top-width"));
    var bottomBorder = parseInt(ele.css("border-bottom-width"));

    var leftJudge = false;
    var rightJudge = false;
    var topJudge = false;
    var bottomJudge = false;
    var insideJudge = false;

    var leftTopJudge = false;
    var rightTopJudge = false;
    var leftBottomJudge = false;
    var rightBottomJudge = false;

    var preXPos = 0;
    var preYPos = 0;
    var preLeft = 0;
    var preTop = 0;

    ele.bind({
      mousedown: function(e) {
        var leftPos = ele.offset().left;
        var rightPos = leftPos + ele.width() + leftBorder + rightBorder;
        var topPos = ele.offset().top;
        var bottomPos = topPos + ele.height() + topBorder + bottomBorder;

        preXPos = e.pageX;
        preYPos = e.pageY;
        preLeft = parseInt(ele.css("left"));
        preTop = parseInt(ele.css("top"));

        if (
          e.pageX >= leftPos - 5 &&
          e.pageX <= rightPos + 5 &&
          e.pageY >= topPos - 5 &&
          e.pageY <= bottomPos + 5
        ) {
          isMouseDown = true;
        }
      }
    });

    $("body").bind({
      mousemove: function(e) {
        if (eleId == "myDiv") {
          hideIndetity(ele);
        }

        var leftPos = ele.offset().left;
        var rightPos = leftPos + ele.width() + leftBorder + rightBorder;
        var topPos = ele.offset().top;
        var bottomPos = topPos + ele.height() + topBorder + bottomBorder;
        //需要进行修改，锁定的时候cursor不改变
   
        if ($(".myDiv .div-header .fa-lock").hasClass("fa-unlock")) {
          if (
            leftPos - 5 <= e.pageX &&
            e.pageX <= leftPos + 5 &&
            topPos - 5 <= e.pageY &&
            e.pageY <= topPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "nw-resize");
            leftTopJudge = true;
          } else if (
            topPos - 5 <= e.pageY &&
            e.pageY <= topPos + 5 &&
            rightPos - 5 <= e.pageX &&
            e.pageX <= rightPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "ne-resize");
            rightTopJudge = true;
          } else if (
            leftPos - 5 <= e.pageX &&
            e.pageX <= leftPos + 5 &&
            bottomPos - 5 <= e.pageY &&
            e.pageY <= bottomPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "sw-resize");
            leftBottomJudge = true;
          } else if (
            bottomPos - 5 <= e.pageY &&
            e.pageY <= bottomPos + 5 &&
            rightPos - 5 <= e.pageX &&
            e.pageX <= rightPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "se-resize");
            rightBottomJudge = true;
          } else if (
            leftPos - 5 <= e.pageX &&
            e.pageX <= leftPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "w-resize");
            leftJudge = true;
          } else if (
            rightPos - 5 <= e.pageX &&
            e.pageX <= rightPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "e-resize");
            rightJudge = true;
          } else if (
            topPos - 5 <= e.pageY &&
            e.pageY <= topPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "n-resize");
            topJudge = true;
          } else if (
            bottomPos - 5 <= e.pageY &&
            e.pageY <= bottomPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "s-resize");
            bottomJudge = true;
          } else {
            if (!isMouseDown) {
              ele.css("cursor", "move");

              leftJudge = false;
              rightJudge = false;
              topJudge = false;
              bottomJudge = false;
              insideJudge = true;

              leftTopJudge = false;
              rightTopJudge = false;
              leftBottomJudge = false;
              rightBottomJudge = false;
            }
          }
        }
        if (isMouseDown) {
          if (leftTopJudge == true) {
            if (rightPos - e.pageX - leftBorder - rightBorder >= 0) {
              ele.width(rightPos - e.pageX - leftBorder - rightBorder + "px");
              ele.css("left", e.pageX + "px");
            }
            if (bottomPos - e.pageY - topBorder - bottomBorder >= 0) {
              ele.height(bottomPos - e.pageY - topBorder - bottomBorder + "px");
              ele.css("top", e.pageY + "px");
            }
          } else if (rightTopJudge == true) {
            if (e.pageX - leftPos - leftBorder - rightBorder >= 0) {
              ele.width(e.pageX - leftPos - leftBorder - rightBorder + "px");
            }
            if (bottomPos - e.pageY - topBorder - bottomBorder >= 0) {
              ele.height(bottomPos - e.pageY - topBorder - bottomBorder + "px");
              ele.css("top", e.pageY + "px");
            }
          } else if (leftBottomJudge == true) {
            if (rightPos - e.pageX - leftBorder - rightBorder >= 0) {
              ele.width(rightPos - e.pageX - leftBorder - rightBorder + "px");
              ele.css("left", e.pageX + "px");
            }
            if (e.pageY - topPos - topBorder - bottomBorder >= 0) {
              ele.height(e.pageY - topPos - topBorder - bottomBorder + "px");
            }
          } else if (rightBottomJudge == true) {
            if (e.pageX - leftPos - leftBorder - rightBorder >= 0) {
              ele.width(e.pageX - leftPos - leftBorder - rightBorder + "px");
            }
            if (e.pageY - topPos - topBorder - bottomBorder >= 0) {
              ele.height(e.pageY - topPos - topBorder - bottomBorder + "px");
            }
          } else if (leftJudge == true) {
            if (rightPos - e.pageX - leftBorder - rightBorder >= 0) {
              ele.width(rightPos - e.pageX - leftBorder - rightBorder + "px");
              ele.css("left", e.pageX + "px");
            }
          } else if (rightJudge == true) {
            if (e.pageX - leftPos - leftBorder - rightBorder >= 0) {
              ele.width(e.pageX - leftPos - leftBorder - rightBorder + "px");
            }
          } else if (topJudge == true) {
            if (bottomPos - e.pageY - topBorder - bottomBorder >= 0) {
              ele.height(bottomPos - e.pageY - topBorder - bottomBorder + "px");
              ele.css("top", e.pageY + "px");
            }
          } else if (bottomJudge == true) {
            if (e.pageY - topPos - topBorder - bottomBorder >= 0) {
              ele.height(e.pageY - topPos - topBorder - bottomBorder + "px");
            }
          } else if (insideJudge == true) {
            ele.css("left", preLeft + e.pageX - preXPos + "px");
            ele.css("top", preTop + e.pageY - preYPos + "px");
          }
        }
      },
      mouseup: function(e) {
        isMouseDown = false;

        leftJudge = false;
        rightJudge = false;
        topJudge = false;
        bottomJudge = false;
        insideJudge = false;

        leftTopJudge = false;
        rightTopJudge = false;
        leftBottomJudge = false;
        rightBottomJudge = false;

        adsorbent(ele);
      }
    });
  } else {
    ele.unbind();
    return false;
  }
}

/*
函数名:adsorbent 吸附函数
功能:当div超过或靠近页面边缘的时候自动吸附在页面边缘
参数:div对象ele
返回值:无
*/

function adsorbent(ele) {
  var parentDiv = ele.parent(), //父容器
    parentDivWidth = parentDiv.width(), //父容器宽度
    parentDivHeight = parentDiv.height(), //父容器高度
    borderWidth = parseInt(ele.css("border")), //对象边的宽度
    eleWidth = ele.width(), //对象宽度
    eleHeight = ele.height(), //对象高度
    position = ele.position(), //相对父容器位置position对象
    leftPosition = parseInt(position.left), //相对父容器左位置
    topPosition = parseInt(position.top), //相对父容器顶部位置
    bottomPosition = topPosition + eleHeight + borderWidth * 2, //相对父容器右位置
    rightPosition = leftPosition + eleWidth + borderWidth * 2, //相对父容器底部位置
    gapWidth = 2, //与父容器边的间隙
    gapJudgeScope = 20, //判定吸附的范围的最大值(适用于左吸附和顶部吸附)
    gapJudgeScopeRight = parentDivWidth - gapJudgeScope, //判定吸附的范围的最小值(适用于右吸附)
    gapJudgeScopeBottom = parentDivHeight - gapJudgeScope, //判定吸附的范围的最小值(适用于底部吸附)
    adsorbBottomPosition =
      parentDivHeight - eleHeight - gapWidth - borderWidth * 2, //底部吸附位置
    adsorbRightPosition =
      parentDivWidth - eleWidth - gapWidth - borderWidth * 2; //右吸附位置

  if (leftPosition <= gapJudgeScope) {
    ele.css("left", gapWidth + "px");
  }
  if (rightPosition >= gapJudgeScopeRight) {
    ele.css("left", adsorbRightPosition + "px");
  }
  if (topPosition <= gapJudgeScope) {
    ele.css("top", gapWidth + "px");
  }
  if (bottomPosition >= gapJudgeScopeBottom) {
    ele.css("top", adsorbBottomPosition + "px");
  }
}

/* 未完成.
函数名:savaPositionToArray 存储位置至数组函数
功能:将div的位置存入数组
参数:div对象ele
返回值:无
*/
function savePosistionToArray(ele) {
  var flag = 0;
  var borderWidth = parseInt(ele.css("border"));
  var position = ele.position();
  var id = ele.attr("id");
  var x1 = position.left;
  var x2 = x1 + ele.width() + borderWidth * 2;
  var y1 = position.top;
  var y2 = y1 + ele.height() + borderWidth * 2;
  $.each(positionArray, function(index, value) {
    if (value.id == id) {
      value.x1 = x1;
      value.x2 = x2;
      value.y1 = y1;
      value.y2 = y2;
      flag = 1;
      //return false;
    }
  });
  if (!flag) {
    var obj = {
      id: id,
      x1: x1,
      x2: x2,
      y1: y1,
      y2: y2
    };
    positionArray.push(obj);
  }
}

$(writeIntoPage());
/*datatable的写入*/
function writeIntoPage() {
  $.ajaxSetup({
    async: false
  });
  $.post("php/staff_management_big.php", function(json) {
    var data = JSON.parse(json).data;
    var html = "";
    if (curInfo.tableType == "big") {
      $("#example").DataTable({
        data: data,
        columns: [
          { data: "staff_serial_number" },
          { data: "staff_name" },
          { data: "staff_gender" },
          { data: "staff_phone_num" },
          { data: "staff_id_card_no" },
          { data: "staff_role_name" },
          { data: "staff_create_time" }
        ],
        columnDefs: [
          {
            targets: 7,
            render: function() {
              return '<a href="#">Download</a>';
            }
          }
        ],
        aLengthMenu: [5, 10, 15],
        dom:
          '<".float-left padding-10px"f>rt<"bottom .padding-10px"li><"bottom .padding-10px top-move-20px"p><"clear">',
        language: {
          emptyTable: "表中没有可用数据",
          info: "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
          infoEmpty: "没有记录",
          infoFiltered: "(从 _MAX_ 条记录中过滤)",
          infoPostFix: "",
          thousands: ",",
          lengthMenu: "每页显示 _MENU_ 条",
          loadingRecords: "加载中...",
          processing: "处理中...",
          search: "搜索:",
          zeroRecords: "没有找到符合条件的数据",
          paginate: {
            first: "首页",
            last: "尾页",
            next: "下一页",
            previous: "上一页"
          }
        },
        aria: {
          sortAscending: ": activate to sort column ascending", //当一列被按照升序降序的时候添加到表头的ARIA标签，注意列头是这个字符串的前缀

          sortDescending: ": activate to sort column descending" //当一列被按照升序降序的时候添加到表头的ARIA标签，注意列头是这个字符串的前缀
        }
      });
    }
    if (curInfo.tableType == "middle") {
      $("#staff-info-miantain-container").hide();
      html +=
        "<div class='search-bar-container'>" +
        "<span>搜索:</span>" +
        "<input type='text' placeholder='  input something' class='search-bar'>" +
        "<i class='fa fa-trash fa-lg'></i>" +
        "<i class='fa fa-plus-circle fa-lg'></i></div>" +
        "<div class='pageBtn-left'>" +
        "<i class='fa fa-chevron-left page-middle fa-lg'></i>" +
        "</div><div class='infoCardContainer'></div></div>" +
        "<div class='pageBtn-right'>" +
        "<i class='fa fa-chevron-right page-middle fa-lg'></i></div>" +
        "<div class='Pagination-container'>" +
        "<i data-page='1' class='fa fa-circle-thin'></i>" +
        "<i data-page='2' class='fa fa-circle'></i>" +
        "<i data-page='3' class='fa fa-circle-thin'></i>" +
        "<i data-page='4' class='fa fa-circle-thin'></i>" +
        "<i data-page='5' class='fa fa-circle-thin'></i>" +
        "<i data-page='6' class='fa fa-circle-thin'></i>" +
        "</div>";
      $("#middle-table").html(html);
      var html2 = "";
      var pageStart = (curInfo.curPage - 1) * curInfo.pageCapacity;
      var pageEnd = curInfo.curPage * curInfo.pageCapacity;
      $.each(data, function(index, value) {
        if (index >= pageStart && index < pageEnd) {
          html2 += "<div class='infoCard'>";
          html2 += "<div class='avatar'>";
          html2 += "<img src='img/avatar.jpg' alt='用户头像'>";
          html2 += "</div><span>" + value.staff_name + "</span>";
          html2 += "<span><b>员工类型</b></span>";
          html2 += "<span>" + value.staff_role_name + "</span>";
          html2 += "<span><b>入职时间</b></span>";
          html2 += "<span>" + value.staff_create_time + "</span></div>";
        }
      });
      $(".infoCardContainer").html(html2);
    }
  });
  setMinHeight();
  $("select[name='example_length']").change(function() {
    setMinHeight();
  });
  $.ajaxSetup({
    async: true
  });
}


/*
函数名:setMinHeight 设置最小高度函数
函数功能:设置每个可拖动的div的最小高度
参数:无
返回值:无
*/
function setMinHeight() {
  var myDiv = $(".myDiv");
  $.each(myDiv, function() {
    var minHeight = $(this).height();
    $(this).css("min-height", minHeight + "px");
  });
}

/*
函数名:hideIndetity 
函数功能:当宽度到达某个临界值是隐藏或显示某列
参数:需要隐藏的表格所在的可拖动div
返回值:无
*/
function hideIndetity(ele) {
  var eleWidth = ele.width();
  var tr = $("#example_wrapper tr");
  if (eleWidth < 810) {
    $.each(tr, function() {
      $(this)
        .find("th")
        .eq(4)
        .hide();
      $(this)
        .find("td")
        .eq(4)
        .hide();
    });
  }
  if (eleWidth < 620) {
    $.each(tr, function() {
      $(this)
        .find("th")
        .eq(6)
        .hide();
      $(this)
        .find("td")
        .eq(6)
        .hide();
    });
  }
  if(eleWidth < 520){
    curInfo.tableType = "middle";
    if($("#middle-table").children().length == 0){
      writeIntoPage();
    } else {
      $("#staff-info-miantain-container").hide();
      $("#middle-table").show();
    }
    
    
  }
  if(eleWidth >= 520 && curInfo.tableType == "middle"){
    console.log(123);
    curInfo.tableType = "big";
    $("#middle-table").hide();
    $("#staff-info-miantain-container").show();
    setMinHeight(ele);
    
    /* $("#example").css("display","");
    curInfo.tableType = "big";
    writeIntoPage(); */
  }
  if (eleWidth >= 620) {
    $.each(tr, function() {
      $(this)
        .find("th")
        .eq(6)
        .show();
      $(this)
        .find("td")
        .eq(6)
        .show();
    });
  }
  if (eleWidth >= 810) {
    $.each(tr, function() {
      $(this)
        .find("th")
        .eq(4)
        .show();
      $(this)
        .find("td")
        .eq(4)
        .show();
    });
  }
}

/*当文档加载完成后执行(执行顺序从上之下同注释)
执行功能:
初次写入中等大小表格的卡片
点击翻页按钮分页栏发生变化(向前向后各一个)
点击分页栏,分页栏发生变化
修改datatable默认搜索框样式
为表格设置底线和顶线
点击Lock图标时锁定或解锁可拖动div
*/

$(function() {
  //getInfoCard();
  $(".fa-chevron-left").bind("click", function() {
    console.log(123);
    curInfo.curPage--;
    var curDiv = $(this)
      .parents()
      .find(".myDiv");
    var pageCircles = curDiv.find(".Pagination-container").children();
    var curPageCircle = pageCircles.filter(function() {
      return $(this).attr("class") == "fa fa-circle";
    });
    var prevPageCircle = curPageCircle.prev();
    if (prevPageCircle.is("i")) {
      pageCircles.removeClass("fa-circle").addClass("fa-circle-thin");
      prevPageCircle.removeClass("fa-circle-thin").addClass("fa-circle");
    }

    writeIntoPage();
  });
  $(".fa-chevron-right").bind("click", function() {
    curInfo.curPage++;
    var curDiv = $(this)
      .parents()
      .find(".myDiv");
    var pageCircles = curDiv.find(".Pagination-container").children();
    var curPageCircle = pageCircles.filter(function() {
      return $(this).attr("class") == "fa fa-circle";
    });
    var nextPageCircle = curPageCircle.next();
    if (nextPageCircle.is("i")) {
      pageCircles.removeClass("fa-circle").addClass("fa-circle-thin");
      nextPageCircle.removeClass("fa-circle-thin").addClass("fa-circle");
    }
    writeIntoPage();
  });
  $(".Pagination-container i").bind("click", function() {
    curInfo.curPage = $(this).attr("data-page");
    var curDiv = $(this)
      .parents()
      .find(".myDiv");
    var pageCircles = curDiv.find(".Pagination-container").children();
    pageCircles.removeClass("fa-circle").addClass("fa-circle-thin");
    $(this)
      .removeClass("fa-circle-thin")
      .addClass("fa-circle");
      writeIntoPage();
  });
  $("#example_filter input")
    .attr("type", "text")
    .addClass("remove-default-style")
    .addClass("search-input");
  $("#example").addClass("border-bottom-and-top");
  $(".fa-lock").click(function() {
    var allDragableDiv = $(".myDiv");
    var faLock = $(this);
    var dragableParentDiv = $(this)
      .parent()
      .parent()
      .parent();
    var parentId = dragableParentDiv.attr("id");
    curInfo[parentId] = 0;
    faLock.toggleClass("fa-unlock");
    if (faLock.hasClass("fa-unlock")) {
      curInfo[parentId] = 0;
    } else {
      curInfo[parentId] = 1;
      $(".myDiv").css("cursor", "default");
    }
    $.each(allDragableDiv, function() {
      dragAble($(this));
    });
  });
});
