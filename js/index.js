/* 全局对象定义 */
var curInfo = {}; //此页面的唯一全局变量

/* 构造函数定义 */

/*
函数名:InfoObject 信息对象
功能:创建一个信息对象
参数:无
返回值:信息对象info
*/
function InfoObject() {
  var info = {
    curPage: 1, //当前页
    pageCapacity: 10, //页容量(中小表格适用6/8/10)
    tableType: "big", //表格类型(大中小)
    isLoad: 0, //是否已经从后台加载数据
    isLock: 1, //是否被锁定(可以拖动和改变大小)
    data: {}, //存放后台加载的数据
    x: 0, //存放x坐标,默认为0
    y: 0, //存放y坐标,默认为0
    height: 400, //存放表格高度,默认为400,
    width: 800, //存放表格宽度,默认800
    z_index: 300, //存放z-index值,默认为300
    is_seraching: 0, //是否正在搜索
    search_result: {} //存放搜索结果
  };
  return info;
}

/* 函数定义 */

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

/*
函数名:arrayDuplicateAndSort 数组去重和排序
函数功能:为指定的数组排序后去重
参数:需要排序去重的数组
返回值:无
*/
function arrayDuplicateAndSort(array) {
  //排序
  function compare(val1, val2) {
    return val1 - val2;
  }
  array.sort(compare);
  //去重
  var i = 0;
  while (i <= array.length - 1) {
    if (array[i] == array[i + 1]) {
      array.splice(i, 1);
    } else {
      i++;
    }
  }
}

/*
函数名:arraySortByProperty 数组按指定属性排序
函数功能:为指定的数组排序
参数:需要排序的数组,和对象属性名
返回值:无
*/
function arraySortByProperty(array, property) {
  function compare(property) {
    return function(a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    };
  }
  return array.sort(compare(property));
}
/*
函数名:chooseWriteIntoPage 选择写入页面函数
功能:根据传入的Id选择正确的写入函数
参数:id
返回值:无
*/
function chooseWriteIntoPage(id) {
  if (id == "staff-info") {
    writeIntoPageForStaffInfo();
  } else if (id == "equipment-info") {
    writeIntoPageForEquipmentInfo();
  } else {
    writeIntoPageForWarningInfo();
  }
}

/*
函数名:dragAble 使可拖动函数
功能:将div设置为可拖动和缩放
参数:ele想要变成可拖动的div对象
返回值:无
*/
function dragAble(ele) {
  var eleId = ele.attr("id");
  // console.log("--------");
  // console.log("staff-info" ,curInfo["staff-info"].isLock);
  // console.log("equipment-info", curInfo["equipment-info"].isLock);
  // console.log("warning-info", curInfo["warning-info"].isLock);
  // console.log("--------");
  if (curInfo[eleId].isLock == 0) {
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
        var leftPos = ele.offset().left;
        var rightPos = leftPos + ele.width() + leftBorder + rightBorder;
        var topPos = ele.offset().top;
        var bottomPos = topPos + ele.height() + topBorder + bottomBorder;
        //需要进行修改，锁定的时候cursor不改变
        if (curInfo[eleId].isLock == 0) {
          if (
            leftPos - 5 <= e.pageX &&
            e.pageX <= leftPos + 5 &&
            topPos - 5 <= e.pageY &&
            e.pageY <= topPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "nw-resize");
            leftJudge = false;
            rightJudge = false;
            topJudge = false;
            bottomJudge = false;
            insideJudge = false;

            leftTopJudge = false;
            rightTopJudge = false;
            leftBottomJudge = false;
            rightBottomJudge = false;

            leftTopJudge = true;
          } else if (
            topPos - 5 <= e.pageY &&
            e.pageY <= topPos + 5 &&
            rightPos - 5 <= e.pageX &&
            e.pageX <= rightPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "ne-resize");
            leftJudge = false;
            rightJudge = false;
            topJudge = false;
            bottomJudge = false;
            insideJudge = false;

            leftTopJudge = false;
            rightTopJudge = false;
            leftBottomJudge = false;
            rightBottomJudge = false;

            rightTopJudge = true;
          } else if (
            leftPos - 5 <= e.pageX &&
            e.pageX <= leftPos + 5 &&
            bottomPos - 5 <= e.pageY &&
            e.pageY <= bottomPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "sw-resize");
            leftJudge = false;
            rightJudge = false;
            topJudge = false;
            bottomJudge = false;
            insideJudge = false;

            leftTopJudge = false;
            rightTopJudge = false;
            leftBottomJudge = false;
            rightBottomJudge = false;

            leftBottomJudge = true;
          } else if (
            bottomPos - 5 <= e.pageY &&
            e.pageY <= bottomPos + 5 &&
            rightPos - 5 <= e.pageX &&
            e.pageX <= rightPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "se-resize");
            leftJudge = false;
            rightJudge = false;
            topJudge = false;
            bottomJudge = false;
            insideJudge = false;

            leftTopJudge = false;
            rightTopJudge = false;
            leftBottomJudge = false;
            rightBottomJudge = false;

            rightBottomJudge = true;
          } else if (
            leftPos - 5 <= e.pageX &&
            e.pageX <= leftPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "w-resize");
            leftJudge = false;
            rightJudge = false;
            topJudge = false;
            bottomJudge = false;
            insideJudge = false;

            leftTopJudge = false;
            rightTopJudge = false;
            leftBottomJudge = false;
            rightBottomJudge = false;

            leftJudge = true;
          } else if (
            rightPos - 5 <= e.pageX &&
            e.pageX <= rightPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "e-resize");
            leftJudge = false;
            rightJudge = false;
            topJudge = false;
            bottomJudge = false;
            insideJudge = false;

            leftTopJudge = false;
            rightTopJudge = false;
            leftBottomJudge = false;
            rightBottomJudge = false;

            rightJudge = true;
          } else if (
            topPos - 5 <= e.pageY &&
            e.pageY <= topPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "n-resize");
            leftJudge = false;
            rightJudge = false;
            topJudge = false;
            bottomJudge = false;
            insideJudge = false;

            leftTopJudge = false;
            rightTopJudge = false;
            leftBottomJudge = false;
            rightBottomJudge = false;

            topJudge = true;
          } else if (
            bottomPos - 5 <= e.pageY &&
            e.pageY <= bottomPos + 5 &&
            !isMouseDown
          ) {
            ele.css("cursor", "s-resize");
            leftJudge = false;
            rightJudge = false;
            topJudge = false;
            bottomJudge = false;
            insideJudge = false;

            leftTopJudge = false;
            rightTopJudge = false;
            leftBottomJudge = false;
            rightBottomJudge = false;

            bottomJudge = true;
          } else if (
            topPos + 6 <= e.pageY &&
            e.pageY <= topPos + 40 &&
            !isMouseDown
          ) {
            ele.css("cursor", "move");
            leftJudge = false;
            rightJudge = false;
            topJudge = false;
            bottomJudge = false;
            insideJudge = false;

            leftTopJudge = false;
            rightTopJudge = false;
            leftBottomJudge = false;
            rightBottomJudge = false;

            insideJudge = true;
          } else {
            if (!isMouseDown) {
              ele.css("cursor", "default");

              leftJudge = false;
              rightJudge = false;
              topJudge = false;
              bottomJudge = false;
              insideJudge = false;

              leftTopJudge = false;
              rightTopJudge = false;
              leftBottomJudge = false;
              rightBottomJudge = false;
            }
          }
        }
        if (isMouseDown) {
          eleWidthChange(ele);

          // console.log("--------");
          // console.log("staff-info" ,curInfo["staff-info"].isLock);
          // console.log("equipment-info", curInfo["equipment-info"].isLock);
          // console.log("warning-info", curInfo["warning-info"].isLock);
          // console.log("--------");

          var minHeight =
            parseInt(ele.css("min-height")) - leftBorder - rightBorder;
          var minWidth =
            parseInt(ele.css("min-width")) - topBorder - bottomBorder;
          //console.log(minHeight,parseInt(ele.height()));
          // console.log(parseInt(ele.width()),minWidth);

          if (leftTopJudge == true) {
            if (rightPos - e.pageX - leftBorder - rightBorder > minWidth) {
              ele.width(rightPos - e.pageX - leftBorder - rightBorder + "px");
              ele.css("left", e.pageX + "px");
            }
            if (bottomPos - e.pageY - topBorder - bottomBorder > minHeight) {
              ele.height(bottomPos - e.pageY - topBorder - bottomBorder + "px");
              ele.css("top", e.pageY + "px");
            }
          } else if (rightTopJudge == true) {
            if (e.pageX - leftPos - leftBorder - rightBorder > minWidth) {
              ele.width(e.pageX - leftPos - leftBorder - rightBorder + "px");
            }
            if (bottomPos - e.pageY - topBorder - bottomBorder > minHeight) {
              ele.height(bottomPos - e.pageY - topBorder - bottomBorder + "px");
              ele.css("top", e.pageY + "px");
            }
          } else if (leftBottomJudge == true) {
            if (rightPos - e.pageX - leftBorder - rightBorder > minWidth) {
              ele.width(rightPos - e.pageX - leftBorder - rightBorder + "px");
              ele.css("left", e.pageX + "px");
            }
            if (e.pageY - topPos - topBorder - bottomBorder > minHeight) {
              ele.height(e.pageY - topPos - topBorder - bottomBorder + "px");
            }
          } else if (rightBottomJudge == true) {
            if (e.pageX - leftPos - leftBorder - rightBorder > minWidth) {
              ele.width(e.pageX - leftPos - leftBorder - rightBorder + "px");
            }
            if (e.pageY - topPos - topBorder - bottomBorder > minHeight) {
              ele.height(e.pageY - topPos - topBorder - bottomBorder + "px");
            }
          } else if (leftJudge == true) {
            if (rightPos - e.pageX - leftBorder - rightBorder > minWidth) {
              ele.width(rightPos - e.pageX - leftBorder - rightBorder + "px");
              ele.css("left", e.pageX + "px");
            }
          } else if (rightJudge == true) {
            if (e.pageX - leftPos - leftBorder - rightBorder > minWidth) {
              ele.width(e.pageX - leftPos - leftBorder - rightBorder + "px");
            }
          } else if (topJudge == true) {
            if (bottomPos - e.pageY - topBorder - bottomBorder > minHeight) {
              ele.height(bottomPos - e.pageY - topBorder - bottomBorder + "px");
              ele.css("top", e.pageY + "px");
            }
          } else if (bottomJudge == true) {
            if (e.pageY - topPos - topBorder - bottomBorder > minHeight) {
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
函数名:eleWidthChange
函数功能:当宽度到达某个临界值是隐藏或显示某列
参数:需要隐藏的表格所在的可拖动div
返回值:无
*/
function eleWidthChange(ele) {
  //获取对象宽度
  var eleWidth = ele.width();
  //获取对象id
  var ele_id = ele.attr("id");
  //获取信息对象
  var infoObject = curInfo[ele_id];
  //获取中等大小表格
  var middleTable = ele.find(".middle-table");
  //当表格类型为big
  if (infoObject.tableType == "big") {
    //当对象宽度小于785时
    if (eleWidth < 785) {
      //将表格类型改变为middle
      infoObject.tableType = "middle";
      //设置表格最小高度
      setMinHeight(ele);
      //根据表格id选择写入页面函数
      chooseWriteIntoPage(ele_id);
    }
    //当表格类型为middle
  } else if (infoObject.tableType == "middle") {
    //当表格宽度小于且页面容量为10
    if (eleWidth < 760 && infoObject.pageCapacity == 10) {
      //设置页面容量为8
      infoObject.pageCapacity = 8;
      //适当缩小容器宽度
      middleTable.css("width", "96%");
      //重写分页栏按钮
      setPagination(ele);
      chooseWriteIntoPage(ele_id);
    }
    if (eleWidth < 626 && infoObject.pageCapacity == 8) {
      infoObject.pageCapacity = 6;
      middleTable.css("width", "94%");
      setPagination(ele);
      chooseWriteIntoPage(ele_id);
    }
    if (eleWidth < 480) {
      infoObject.pageCapacity = 10;
      infoObject.tableType = "small";

      setPagination(ele);
      chooseWriteIntoPage(ele_id);
    }
    if (eleWidth >= 636 && infoObject.pageCapacity == 6) {
      infoObject.pageCapacity = 8;
      middleTable.css("width", "96%");
      setPagination(ele);
      chooseWriteIntoPage(ele_id);
    }
    if (eleWidth >= 770 && infoObject.pageCapacity == 8) {
      infoObject.pageCapacity = 10;
      middleTable.css("width", "100%");
      setPagination(ele);
      chooseWriteIntoPage(ele_id);
    }
    if (eleWidth >= 785) {
      infoObject.tableType = "big";
      if (ele.find("td").length > 0) {
        ele.find(".big-table-wrapper").show();
        ele.find(".not-for-big-table").hide();
        setMinHeight(ele);
      } else {
        chooseWriteIntoPage(ele_id);
      }
    }
    registEventForPagination(ele);
  } else {
    if (eleWidth <= 430 && infoObject.pageCapacity == 10) {
      middleTable.css("width", "90%");
      infoObject.pageCapacity = 8;
      setPagination(ele);
      chooseWriteIntoPage(ele_id);
    }
    if (eleWidth > 435 && infoObject.pageCapacity == 8) {
      middleTable.css("width", "100%");
      infoObject.pageCapacity = 10;
      setPagination(ele);
      chooseWriteIntoPage(ele_id);
    }
    if (eleWidth > 480) {
      infoObject.tableType = "middle";
      infoObject.pageCapacity = 8;
      setPagination(ele);
      chooseWriteIntoPage(ele_id);
    }
    registEventForPagination(ele);
  }
}

/*
函数名:firstLoad 初次载入
函数功能:第一次载入的页面初始化
参数:无
返回值:无
*/
function firstLoad() {
  //创建页面三个表格相关的信息对象
  curInfo["staff-info"] = new InfoObject();
  curInfo["equipment-info"] = new InfoObject();
  curInfo["warning-info"] = new InfoObject();
  //初次写入三个表格
  writeIntoPageForEquipmentInfo();
  writeIntoPageForStaffInfo();
  writeIntoPageForWarningInfo();
  //为三个表格的搜索功能注册事件
  searchInfoFromMiddleTable();
  //为页面的可拖动开关注册事件
  $(".fa-thumb-tack").click(function() {
    //获取所有可拖动Div
    var allDragableDiv = $(".myDiv");
    //获取点击的按钮
    var faLock = $(this);
    //获取被点击按钮的可拖动的祖先Div
    var dragableParentDiv = faLock
      .parent()
      .parent()
      .parent();
    //获取div的ID
    var parentId = dragableParentDiv.attr("id");

    // console.log(curInfo["staff-info"].isLock);
    // console.log(curInfo["equipment-info"].isLock);
    // console.log(curInfo["warning-info"].isLock);
    faLock.toggleClass("faLock");
    if (faLock.hasClass("faLock")) {
      curInfo[parentId].isLock = 0;
      dragableParentDiv.css("cursor", "default");
    } else {
      curInfo[parentId].isLock = 1;
      dragableParentDiv.css("cursor", "default");
      // console.log(dragableParentDiv.css("z-index"));
      var info = new Array();
      info[0] = parseInt(dragableParentDiv.css("left"));
      info[1] = parseInt(dragableParentDiv.css("top"));
      info[2] = parseInt(dragableParentDiv.css("width"));
      info[3] = parseInt(dragableParentDiv.css("height"));
      info[4] = parentId;
      console.log(dragableParentDiv);
      $.ajax({
        url: "php/save_the_module_pos.php",
        data: {
          info: info
        },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(data) {
          if (data == "ok") {
            console.log("记录成功");
          } else {
            console.log("记录出错");
          }
        }
      });
    }
    $.each(allDragableDiv, function() {
      dragAble($(this));
    });
  });
}

/*
函数名:getInformationArray 获取信息数组
函数功能:将json格式的数组转换为可搜索的数组
参数:需要转换的数组
返回值:无
*/
function getInformationArray(obj) {
  var info_obj = {};
  $.each(obj, function(index, value) {
    $.each(value, function(key, val) {
      if (index == 0) {
        info_obj[key] = [val];
      } else {
        info_obj[key].push(val);
      }
    });
  });
  return info_obj;
}

/*
函数名:idToName id转换为中文名
函数功能:根据输入的Id返回对应的中文名
参数:id
返回值:无
*/
function idToName(id) {
  if (id == "staff-info") {
    return "员工信息";
  } else if (id == "equipment-info") {
    return "设备信息";
  } else {
    return "预警信息";
  }
}

/*
函数名:registEventForPagination
函数功能:为新插入的分页栏注册跳转页面事件
参数:无
返回值:无
*/
function registEventForPagination(ele) {
  var ele_id = ele.attr("id");
  var pageCircles = ele.find(".pagination i");
  var infoObject = curInfo[ele_id];
  pageCircles.click(function() {
    infoObject.curPage = $(this).attr("data-page");
    pageCircles.attr("class", "fa fa-circle-thin");
    $(this).attr("class", "fa fa-circle");
    chooseWriteIntoPage(ele_id);
  });
}

/*
函数名:registEventForZIndexChange
函数功能:为改变z-index的上一层下一层按钮注册事件
参数:无
返回值:无
*/
function registEventForZIndexChange() {
  var dragable_divs = $(".myDiv");
  $(".fa-arrow").click(function() {
    var z_index_array = [];
    $.each(dragable_divs, function() {
      var obj = {
        div_name: $(this).attr("id"),
        z_index: $(this).css("z-index")
      };
      z_index_array.push(obj);
    });
    z_index_array = arraySortByProperty(z_index_array, "z_index");
    var arrow_icon = $(this);
    var dragable_div_id = arrow_icon
    .parent()
    .parent()
    .parent().attr("id");
    var info_obj = curInfo[dragable_div_id];
    var info = new Array();
    $.each(z_index_array, function(index, value) {
      if (arrow_icon.hasClass("fa-arrow-circle-down")) {
        if (index != 0 && dragable_div_id == value.div_name) {
          curInfo[dragable_div_id].z_index = (
            parseInt(curInfo[dragable_div_id].z_index) - 100
          ).toString();
          curInfo[z_index_array[index - 1].div_name].z_index = (
            parseInt(curInfo[z_index_array[index - 1].div_name].z_index) + 100
          ).toString();
          info.push(dragable_div_id, curInfo[dragable_div_id].z_index);
          info.push(z_index_array[index - 1].div_name, curInfo[z_index_array[index - 1].div_name].z_index);
        }
      } else if (index != 2 && dragable_div_id == value.div_name) {
        curInfo[dragable_div_id].z_index = (
          parseInt(curInfo[dragable_div_id].z_index) + 100
        ).toString();
        curInfo[z_index_array[index + 1].div_name].z_index = (
          parseInt(curInfo[z_index_array[index + 1].div_name].z_index) - 100
        ).toString();
        info.push(dragable_div_id, curInfo[dragable_div_id].z_index);
        info.push(z_index_array[index + 1].div_name, curInfo[z_index_array[index + 1].div_name].z_index);
      }
    });

    $.ajax({
      url: "php/save_the_module_index.php",
      data: {
        info: info
      },
      type: "post",
      cache: false,
      dataType: "json",
      success: function(data) {
        if (data == "ok") {
          console.log("记录成功");
        } else {
          console.log("记录出错");
        }
      }
    });


    $.each(dragable_divs, function() {
      var obj = curInfo[$(this).attr("id")];
      $(this).css("z-index", obj.z_index);
    });
  });
  /* $(".z-index-icon-wrapper").click(function(event) {
    event.stopPropagation();
    var icon = $(this).find("i");
    var icon_class_name = icon.attr("class");
    var cur_z_index_div = $(".cur-z-index-div");
    var next_z_index_div = cur_z_index_div.next();
    var prev_z_index_div = cur_z_index_div.prev();
    var cur_table_selecter = "#" + cur_z_index_div.attr("data-id");
    var next_table_selecter = "#" + next_z_index_div.attr("data-id");
    var prev_table_selecter = "#" + prev_z_index_div.attr("data-id");
    var cur_table = $(cur_table_selecter);
    var next_table = $(next_table_selecter);
    var prev_table = $(prev_table_selecter);
    var cur_table_z_index = cur_table.css("z-index");
    var next_table_z_index = next_table.css("z-index");
    var prev_table_z_index = prev_table.css("z-index");
    var info = new Array();
    if (icon_class_name == "fa fa-arrow-circle-down common-color") {
      next_z_index_div.after(cur_z_index_div);
      next_table.css("z-index", cur_table_z_index);
      cur_table.css("z-index", next_table_z_index);
      info.push(next_table.attr("id"), next_table.css("z-index"));
      info.push(cur_table.attr("id"), cur_table.css("z-index"));
    } else {
      if (prev_z_index_div.attr("data-icon") != 1) {
        cur_z_index_div.after(prev_z_index_div);
        prev_table.css("z-index", cur_table_z_index);
        cur_table.css("z-index", prev_table_z_index);
        info.push(prev_table.attr("id"), prev_table.css("z-index"));
        info.push(cur_table.attr("id"), cur_table.css("z-index"));
      }
    }
    $.ajax({
      url: "php/save_the_module_index.php",
      data: {
        info: info
      },
      type: "post",
      cache: false,
      dataType: "json",
      success: function(data) {
        if (data == "ok") {
          console.log("记录成功");
        } else {
          console.log("记录出错");
        }
      }
    });
  }); */
}

/*
函数名:registEventForZIndexIcon
函数功能:为改变z-index的图标写入上一层下一层按钮的事件
参数:无
返回值:无
*/
/* function registEventForZIndexIcon() {
  $(".fa-clone").click(function(event) {
    event.stopPropagation();
    $(".z-index-div-wrapper").remove();
    var fa_clone = $(this);
    var div_header = fa_clone.parent().parent();
    var cur_table_id = div_header.parent().attr("id");
    var html = "";
    var index_array = [0, 0, 0];
    $(".myDiv").each(function() {
      if ($(this).css("z-index") == 500) {
        index_array[0] = $(this).attr("id");
      } else if ($(this).css("z-index") == 400) {
        index_array[1] = $(this).attr("id");
      } else {
        index_array[2] = $(this).attr("id");
      }
    });
    console.log(index_array);
    html += "<div class='z-index-div-wrapper float-right'>";
    html += "<div class='z-index-div' data-icon='1'>";
    html += "<div class='z-index-icon-wrapper'>";
    html += "<i class='fa fa-arrow-circle-up common-color'></i>";
    html += "<span>向上一层</span>";
    html += "</div> ";
    html += "<div class='z-index-icon-wrapper'>";
    html += "<i class='fa fa-arrow-circle-down common-color'></i>";
    html += "<span>向下一层</span>";
    html += "</div>";
    html += "</div>";
    html += "<div class='z-index-div' data-id='" + index_array[0] + "'>";
    html += idToName(index_array[0]);
    html += "</div>";
    html += "<div class='z-index-div' data-id='" + index_array[1] + "'>";
    html += idToName(index_array[1]);
    html += "</div>";
    html += "<div class='z-index-div' data-id='" + index_array[2] + "'>";
    html += idToName(index_array[2]);
    html += "</div>";
    div_header.before(html);
    $(".z-index-div").each(function() {
      if ($(this).attr("data-id") == cur_table_id) {
        $(this).addClass("cur-z-index-div");
      }
      if ($(this).attr("data-id")) {
        $(this).hide();
      }
    });

    $(".z-index-div-wrapper")
      .show()
      .css("height", "1px");
    if (curInfo[cur_table_id].tableType != "big") {
      $(".z-index-div-wrapper").addClass("left-400-top-20");
    } else {
      $(".z-index-div-wrapper").removeClass("left-400-top-20");
    }
    $("body").bind("click", function() {
      $(".z-index-div-wrapper").remove();
      $("body").unbind("click");
    });
    registEventForZIndexChange();
  });
} */
/* 
函数名:setMinHeight 设置最小高度
功能:当表格的大小类型发生改变时,设置对应的最小高度
参数:ele,被改变宽度的表格
返回值:无
*/

function setMinHeight(ele) {
  var divHeaderHeight = ele.find(".div-header").height();
  var eleId = ele.attr("id");
  var maintainType = curInfo[eleId].tableType;
  var bigTableHeight = ele.find(".big-table-wrapper").height();
  var middleTableHeight =
    ele.find(".middle-table").height() + ele.find(".pagination").height();
  var maintainHeight =
    maintainType == "big" ? bigTableHeight : middleTableHeight;
  var totalHeight = divHeaderHeight + maintainHeight + 20;
  if (maintainType != "big") {
    totalHeight += 10;
  }
  ele.css("height", totalHeight + "px");
  ele.css("min-height", totalHeight + "px");
}

/* 
函数名:showDetails
功能:当鼠标悬停在小表格的头像上时使用悬浮窗显示详细信息
参数:无
返回值:无
*/

function showDetails() {
  $(".condensed-info i").hover(function(event) {
    var icon = $(this);
    var dragale_parent_id = icon
      .parent()
      .parent()
      .parent()
      .attr("id");
    var container = icon.parent();
    var info_object = curInfo[dragale_parent_id];
    $(".hover-window").remove();
    if (dragale_parent_id == "staff-info") {
      var staff_name = icon
        .next()
        .next()
        .text();
      var staff_role_name = icon.attr("data-role-name");
      var staff_create_time = icon.attr("data-create-time");
      var staff_gender = icon.attr("data-gender");
      var html2 = "";
      html2 += "<div class='info-card hover-window'>";
      html2 +=
        "<p><span class='staff-name'><b>" + staff_name + "</b></span></p>";
      html2 += "<p>";
      html2 += "<span class='join-time-title'>入职时间</span><br>";
      html2 +=
        "<span class='join-time'><b>" + staff_create_time + "</b></span>";
      html2 +=
        "</p><p><i class='fa fa-user " +
        (staff_gender == "男" ? "male-color" : "female-color") +
        "'></i>";
      html2 += "<span class='staff-type'> " + staff_role_name + "</span> </p>";
      html2 += "<div class='staff-status leave-color'>离职";
      html2 += "</div></div>";
      container.append(html2);
      container.css("height", "84px");
      $(".hover-window").css("bottom", "100px");
    } else if (dragale_parent_id == "warning-info") {
      var position = icon.attr("data-position");
      var name = icon.attr("data-name");
      var disease = icon.attr("data-disease");
      var html2 = "";
      html2 += "<div class='equipment-info-card hover-window'>";
      html2 += "<i class='fa fa-tag equipment-bind-icon common-color'></i><p>";
      html2 += "<span class='font-size-13px'>";
      html2 += position + "</span></p>";
      html2 += "<p class='margin-bottom-20px'>";
      html2 += "<span class='font-size-20px'><b>" + name + "</b></span><br>";
      html2 += "<span class='join-time'>";
      html2 += "<b>" + disease + "</b></span></p>";
      html2 += "<div class='staff-status leave-color'>异常</div></div>";
      container.append(html2);
      container.css("height", "96px");
      $(".hover-window").css("bottom", "120px");
    } else {
      var building_no = icon.attr("data-building-no");
      var room_no = icon.attr("data-room-no");
      var bed_no = icon.attr("data-bed-no");
      var equipment_install_date = icon.attr("data-install-date");
      var equipment_status = icon.attr("data-equipment-status");
      html2 = "";
      html2 += "<div class='equipment-info-card hover-window'>";
      html2 +=
        "<i class='fa fa-link fa-lg equipment-bind-icon common-color'></i>";
      html2 += "<p><span class='font-size-13px'>";
      html2 += "<b>" + building_no + "</b><br>";
      html2 += "<b>" + room_no + "号房" + bed_no + "床</b></span></p><p>";
      html2 += "<span class='join-time-title'>使用时间</span><br>";
      html2 += "<span class='join-time'>";
      html2 += "<b>" + equipment_install_date + "</b></span></p>";
      html2 +=
        "<div class='staff-status leave-color'>" +
        equipment_status +
        "</div></div>";
      container.append(html2);
      container.css("height", "136px");
      $(".hover-window").css("bottom", "160px");
    }
    var hoverWindow = $(".hover-window");
    hoverWindow.show();
    hoverWindow.mouseleave(function() {
      $(this).remove();
    });
    $("body").bind("click", function() {
      hoverWindow.remove();
      $("body").unbind("click");
    });
  });
}

/*
函数名:setPagination
函数功能:当页面容量变化时,相应修改总的页数以及分页栏
参数:无
返回值:无
*/
function setPagination(ele) {
  var ele_id = ele.attr("id");
  var infoObject = curInfo[ele_id];
  infoObject.curPage = 1;
  var l = infoObject.is_searching
    ? infoObject.search_result.length
    : infoObject.data.length;
  var html = "";
  var pageNumber = Math.ceil(l / infoObject.pageCapacity);
  for (var i = 0; i < pageNumber; i++) {
    if (i == 0) {
      html += "<i data-page='" + (i + 1) + "' class='fa fa-circle'></i>";
    } else {
      html += "<i data-page='" + (i + 1) + "' class='fa fa-circle-thin'></i>";
    }
    ele.find(".pagination").html(html);
  }
}

/* 
函数名:searchInfoFromMiddleTable 搜索员工信息
函数功能:输入内容返回匹配项
参数:无
返回值:无
*/
function searchInfoFromMiddleTable() {
  var eval_str, info_object, parent_id, input_val;
  //为搜索框注册keydown事件
  $(".search-input").on("keydown", function(event) {
    //获取输入内容
    input_val = $(this).val();
    //获取当前搜索框所在的表格的id
    parent_id = $(this)
      .parent()
      .parent()
      .attr("id");
    //获取存放员工信息表格相关信息的对象
    info_object = curInfo[parent_id];
    //当输入内容不为空并敲下回车时执行
    if (input_val != "" && event.keyCode == 13) {
      //获取员工信息表格对象
      var ele_selecter = "#" + parent_id;
      var ele = $(ele_selecter);

      //将员工信息数组转换为可搜索的数组
      var staff_info_obj = getInformationArray(info_object.data);
      //定义存放返回的下标的数组
      var result = [];
      //设置为正在搜索
      info_object.is_searching = 1;
      //遍历数组并返回匹配的项的下标,下标存放在result数组中
      if (parent_id == "staff-info") {
        eval_str =
          "index == 'staff_name' || index == 'staff_create_time' || index == 'staff_role_name'";
      } else if (parent_id == "equipment-info") {
        eval_str =
          "index == 'bed_no' || index == 'building_no' || index == 'room_no' || index == 'equipment_install_date'";
      } else {
        eval_str =
          "index == 'name' || index == 'position' || index == 'disease'";
      }

      $.each(staff_info_obj, function(index, value) {
        //只搜索这三项
        if (eval(eval_str)) {
          $.each(value, function(key, val) {
            if (val.indexOf(input_val) != -1) {
              result.push(key);
            }
          });
        }
      });
      //对下标结果进行排序和去重
      arrayDuplicateAndSort(result);
      info_object.search_result = result;
      setPagination(ele);
      chooseWriteIntoPage(parent_id);
    }
    if (input_val == "" && event.keyCode == 13) {
      info_object.is_searching = 0;
      chooseWriteIntoPage(parent_id);
    }
  });
}
/* 
函数名:writeIntoPageForStaffInfo
函数功能:为当前页面的员工信息可拖动div写入数据(大中小三种表格)
参数:无
返回值:无
*/
function writeIntoPageForStaffInfo() {
  var ele = $("#staff-info");
  var infoObject = curInfo["staff-info"];
  $.ajaxSetup({
    async: false
  });
  if (!infoObject.isLoad) {
    $.post("php/get_staff_management_info.php", function(json) {
      infoObject.isLoad++;
      infoObject.data = JSON.parse(json).data;
    });
  }
  if (infoObject.tableType == "big") {
    $("#staff-info-big-table").DataTable({
      data: infoObject.data,
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
    $("#staff-info-big-table_filter input")
      .attr("type", "text")
      .addClass("remove-default-style")
      .addClass("search-input-for-big")
      .attr("placeholder", "  搜索姓名 性别等");
    $("#staff-info-big-table").addClass("border-bottom-and-top");

    $("select[name='staff-info-big-table_length']").change(function() {});
    $("#staff-info-big-table_paginate").click(function() {});
    ele.find(".not-for-big-table").hide();
  }
  if (infoObject.tableType == "middle" || infoObject.tableType == "small") {
    $("#staff-info-big-table-wrapper").hide();
    ele.find(".not-for-big-table").show();
    if (infoObject.isLoad == 1) {
      infoObject.isLoad++;
      setPagination(ele);
    }
    var html2 = "";
    var pageStart = (infoObject.curPage - 1) * infoObject.pageCapacity;
    var pageEnd = infoObject.curPage * infoObject.pageCapacity;
    var loop_array = infoObject.is_searching
      ? infoObject.search_result
      : infoObject.data;
    $.each(loop_array, function(index, value) {
      if (infoObject.is_searching) {
        value = infoObject.data[value];
      }
      if (index >= pageStart && index < pageEnd) {
        if (infoObject.tableType == "middle") {
          html2 += "<div class='info-card'>";
          html2 +=
            "<p><span class='staff-name'><b>" +
            value.staff_name +
            "</b></span></p>";
          html2 += "<p>";
          html2 += "<span class='join-time-title'>入职时间</span><br>";
          html2 +=
            "<span class='join-time'><b>" +
            value.staff_create_time +
            "</b></span>";
          html2 +=
            "</p><p><i class='fa fa-user " +
            (value.staff_gender == "男" ? "male-color" : "female-color") +
            "'></i>";
          html2 +=
            "<span class='staff-type'> " +
            value.staff_role_name +
            "</span> </p>";
          html2 += "<div class='staff-status leave-color'>离职";
          html2 += "</div></div>";
        } else {
          html2 += "<div class='condensed-info float-left'>";
          html2 +=
            "<i class='fa fa-user fa-4x " +
            (value.staff_gender == "男" ? "male-color" : "female-color") +
            "'";
          html2 += "data-create-time='" + value.staff_create_time + "' ";
          html2 += "data-gender='" + value.staff_gender + "' ";
          html2 += "data-role-name='" + value.staff_role_name + "'";
          html2 += "data-position-number='" + (index - pageStart) + "'";
          html2 += "></i><br>";
          html2 +=
            "<span class='staff-name'>" + value.staff_name + "</span></div>";
        }
      }
    });
    if (!html2) {
      html2 += "<h4 class='no-data-info'>表中暂无数据</h4>";
      $("#staff-info-middle-table").css("width", "100%");
      ele.find(".pagination").hide();
    }
    $("#staff-info-middle-table").html(html2);
    registEventForPagination(ele);
    if (infoObject.tableType == "small") {
      showDetails();
    }
  }
  setMinHeight(ele);
  $.ajaxSetup({
    async: true
  });
}

/*
函数名:writeIntoPageForEquipmentInfo
函数功能:为当前页面的设备信息可拖动div写入数据(大中小三种表格)
参数:无
返回值:无
*/
function writeIntoPageForEquipmentInfo() {
  var ele = $("#equipment-info");
  var infoObject = curInfo["equipment-info"];
  $.ajaxSetup({
    async: false
  });
  if (!curInfo.isLoad) {
    $.post("php/get_equipment_info.php", function(json) {
      curInfo.isLoad++;
      infoObject.data = JSON.parse(json).data;
    });
  }
  if (infoObject.tableType == "big") {
    $("#equipment-info-big-table").DataTable({
      data: infoObject.data,
      columns: [
        { data: "building_no" },
        { data: "room_no" },
        { data: "bed_no" },
        { data: "equipment_status" }
      ],
      columnDefs: [
        {
          targets: 4,
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
    $("#equipment-info-big-table_filter input")
      .attr("type", "text")
      .addClass("remove-default-style")
      .addClass("search-input-for-big")
      .attr("placeholder", "  搜索位置 设备号等");
    $("#equipment-info-big-table").addClass("border-bottom-and-top");

    $("select[name='equipment-info-big-table_length']").change(function() {});
    $("#equipment-info-big-table_paginate").click(function() {});
    ele.find(".not-for-big-table").hide();
  }
  if (infoObject.tableType == "middle" || infoObject.tableType == "small") {
    $("#equipment-info-big-table-wrapper").hide();
    ele.find(".not-for-big-table").show();
    var html = "";
    if (infoObject.isLoad == 1) {
      infoObject.isLoad++;
      setPagination(ele);
    }
    var html2 = "";
    var pageStart = (infoObject.curPage - 1) * infoObject.pageCapacity;
    var pageEnd = infoObject.curPage * infoObject.pageCapacity;
    var loop_array = infoObject.is_searching
      ? infoObject.search_result
      : infoObject.data;
    $.each(loop_array, function(index, value) {
      if (infoObject.is_searching) {
        value = infoObject.data[value];
      }
      if (index >= pageStart && index < pageEnd) {
        if (infoObject.tableType == "middle") {
          html2 += "<div class='equipment-info-card'>";
          html2 +=
            "<i class='fa fa-link fa-lg equipment-bind-icon common-color'></i>";
          html2 += "<p><span class='font-size-13px'>";
          html2 += "<b>" + value.building_no + "</b><br>";
          html2 +=
            "<b>" +
            value.room_no +
            "号房" +
            value.bed_no +
            "床</b></span></p><p>";
          html2 += "<span class='join-time-title'>使用时间</span><br>";
          html2 += "<span class='join-time'>";
          html2 += "<b>" + value.equipment_install_date + "</b></span></p>";
          html2 +=
            "<div class='staff-status leave-color'>" +
            value.equipment_status +
            "</div></div>";
        } else {
          html2 += "<div class='condensed-info float-left'>";
          html2 +=
            "<i class='fa fa-hdd-o fa-4x " +
            (value.equipment_status == "异常"
              ? "leave-color"
              : "female-color") +
            "'";
          html2 += "data-install-date='" + value.equipment_install_date + "' ";
          html2 += "data-building-no='" + value.building_no + "' ";
          html2 += "data-room-no='" + value.room_no + "' ";
          html2 += "data-bed-no='" + value.bed_no + "' ";
          html2 += "data-equipment-status='" + value.equipment_status + "' ";
          html2 += "></i><br>";
          html2 +=
            "<span class='font-size-5px'>" + value.building_no + "</span><br>";
          html2 +=
            "<span class='font-size-5px'>" +
            value.room_no +
            "号房" +
            value.bed_no +
            "</span></div>";
        }
      }
    });
    if (!html2) {
      html2 += "<h4 class='no-data-info'>表中暂无数据</h4>";
      $("#equipment-info-middle-table").css("width", "100%");
      ele.find(".pagination").hide();
    }
    $("#equipment-info-middle-table").html(html2);
    registEventForPagination(ele);
    if (infoObject.tableType == "small") {
      showDetails();
    }
  }
  setMinHeight(ele);

  $.ajaxSetup({
    async: true
  });
}

/*
函数名:writeIntoPageForWarningInfo
函数功能:为当前页面的预警信息可拖动div写入数据(大中小三种表格)
参数:无
返回值:无
*/
function writeIntoPageForWarningInfo() {
  var ele = $("#warning-info");
  var infoObject = curInfo["warning-info"];
  $.ajaxSetup({
    async: false
  });
  if (!curInfo.isLoad) {
    $.post("php/get_bed_info.php", function(json) {
      curInfo.isLoad++;
      infoObject.data = JSON.parse(json).data;
    });
  }
  if (infoObject.tableType == "big") {
    $("#warning-info-big-table").DataTable({
      data: infoObject.data,
      columns: [
        { data: "name" },
        { data: "position" },
        { data: "disease" },
        { data: "status" }
      ],
      columnDefs: [
        {
          targets: 4,
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
    $("#warning-info-big-table_filter input")
      .attr("type", "text")
      .addClass("remove-default-style")
      .addClass("search-input-for-big")
      .attr("placeholder", "  搜索姓名 位置等");
    $("#warning-info-big-table").addClass("border-bottom-and-top");

    $("select[name='warning-info-big-table_length']").change(function() {});
    $("#warning-info-big-table_paginate").click(function() {});
    ele.find(".not-for-big-table").hide();
  }
  if (infoObject.tableType == "middle" || infoObject.tableType == "small") {
    $("#warning-info-big-table-wrapper").hide();
    ele.find(".not-for-big-table").show();
    var html = "";
    if (infoObject.isLoad == 1) {
      infoObject.isLoad++;
      setPagination(ele);
    }
    var html2 = "";
    var pageStart = (infoObject.curPage - 1) * infoObject.pageCapacity;
    var pageEnd = infoObject.curPage * infoObject.pageCapacity;
    var loop_array = infoObject.is_searching
      ? infoObject.search_result
      : infoObject.data;
    $.each(loop_array, function(index, value) {
      if (infoObject.is_searching) {
        value = infoObject.data[value];
      }
      if (index >= pageStart && index < pageEnd) {
        if (infoObject.tableType == "middle") {
          html2 += "<div class='equipment-info-card'>";
          html2 +=
            "<i class='fa fa-tag equipment-bind-icon common-color'></i><p>";
          html2 += "<span class='font-size-13px'>";
          html2 += value.position + "</span></p>";
          html2 += "<p class='margin-bottom-20px'>";
          html2 +=
            "<span class='font-size-20px'><b>" + value.name + "</b></span><br>";
          html2 += "<span class='join-time'>";
          html2 += "<b>" + value.disease + "</b></span></p>";
          html2 += "<div class='staff-status leave-color'>异常</div></div>";
        } else {
          html2 += "<div class='condensed-info float-left'>";
          html2 += "<i class='fa fa-line-chart fa-4x female-color' ";
          html2 += "data-position='" + value.position + "' ";
          html2 += "data-disease='" + value.disease + "' ";
          html2 += "data-name='" + value.name + "'";
          html2 += "></i><br>";
          html2 +=
            "<span class='font-size-10px'>" + value.position + "</span></div>";
        }
      }
    });
    if (!html2) {
      html2 += "<h4 class='no-data-info'>表中暂无数据</h4>";
      $("#warning-info-middle-table").css("width", "100%");
      ele.find(".pagination").hide();
    }
    $("#warning-info-middle-table").html(html2);

    registEventForPagination(ele);
    if (infoObject.tableType == "small") {
      showDetails();
    }
  }
  setMinHeight(ele);

  $.ajaxSetup({
    async: true
  });
}

//获取保存的坐标数据
function getTheModulePos() {
  $(function() {
    $.ajax({
      url: "php/get_the_module_pos.php",
      data: {},
      type: "get",
      cache: false,
      dataType: "json",
      success: function(data) {
        $.each(data, function(index, value) {
          var id = value.module_id;
          var curParentId = "#" + id;
          var curDiv = $(curParentId);
          var info_obj = curInfo[id];
          // console.log(value);
          // console.log(curParentId);
          curDiv.css("z-index", value.zindex);
          info_obj.z_index = value.zindex;
          curDiv.css("width", value.module_width + "px");
          info_obj.width = value.module_width;
          // curDiv.css("height", value.module_height + "px");
          curDiv.css("left", value.module_x + "px");
          info_obj.x = value.module_x;
          curDiv.css("top", value.module_y + "px");
          info_obj.y = value.module_y;
          if (value.module_width < 785 && value.module_width >= 480) {
            curInfo[id].tableType = "middle";
          } else if (value.module_width < 480) {
            curInfo[id].tableType = "small";
          }

          eleWidthChange(curDiv);
        });
        registEventForZIndexChange();
      }
    });
  });
}

$(function() {
  firstLoad();
  getTheModulePos();
});
/* $("#hide-menu").mouseenter(function(){
  console.log("hover");
  $(this).animate({"width":"100%"},"slow");
})
.mouseleave(function(){
  $(this).css("width","0.1%");
}) */
