//全局变量定义
var curInfo = {}; //存放目前页面全局变量
var data = {}; //存放从数据库获得的数据
curInfo.curPage = 1; //当前页面为1
curInfo.pageCapacity = 10; //当前页面容量为10
curInfo.tableType = "middle"; //当前页面类型为最小的表格
curInfo.isLoad = 0; //是否已经从数据库获得数据

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
        var leftPos = ele.offset().left;
        var rightPos = leftPos + ele.width() + leftBorder + rightBorder;
        var topPos = ele.offset().top;
        var bottomPos = topPos + ele.height() + topBorder + bottomBorder;
        //需要进行修改，锁定的时候cursor不改变
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
          } 
          else if (
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
          }else {
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
        if (isMouseDown) {
          eleWidthChange(ele);


          var minHeight = parseInt(ele.css("min-height")) - leftBorder - rightBorder;
          var minWidth = parseInt(ele.css("min-width")) - topBorder - bottomBorder;
          //console.log(minHeight,parseInt(ele.height()));
         // console.log(parseInt(ele.width()),minWidth);

          if (leftTopJudge == true) {
            if (rightPos - e.pageX - leftBorder - rightBorder  > minWidth) {
              ele.width(rightPos - e.pageX - leftBorder - rightBorder + "px");
              ele.css("left", e.pageX + "px");
            }
            if (bottomPos - e.pageY - topBorder - bottomBorder  > minHeight) {
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
            if (e.pageX - leftPos - leftBorder - rightBorder  > minWidth) {
              ele.width(e.pageX - leftPos - leftBorder - rightBorder + "px");
            }
            if (e.pageY - topPos - topBorder - bottomBorder  > minHeight) {
              ele.height(e.pageY - topPos - topBorder - bottomBorder + "px");
            }
          } else if (leftJudge == true) {
            if (rightPos - e.pageX - leftBorder - rightBorder  > minWidth) {
              ele.width(rightPos - e.pageX - leftBorder - rightBorder + "px");
              ele.css("left", e.pageX + "px");
            }
          } else if (rightJudge == true) {
            if (e.pageX - leftPos - leftBorder - rightBorder  > minWidth) {
              ele.width(e.pageX - leftPos - leftBorder - rightBorder + "px");
            }
          } else if (topJudge == true) {
            if (bottomPos - e.pageY - topBorder - bottomBorder > minHeight) {
              ele.height(bottomPos - e.pageY - topBorder - bottomBorder + "px");
              ele.css("top", e.pageY + "px");
            }
          } else if (bottomJudge == true) {
            if (e.pageY - topPos - topBorder - bottomBorder  > minHeight) {
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
  var eleWidth = ele.width();
  var tr = $("#example_wrapper tr");
  var middleTable = $("#middle-table");
  if (curInfo.tableType == "big"){
    if (eleWidth < 785) {
      curInfo.tableType = "middle";
      if (middleTable.children().length == 0) {
        writeIntoPage();
      } else {
        $("#staff-info-miantain-container").hide();
        $(".not-for-big-table").show();
      } 
      ele.css("height","430px");
      ele.css("min-Height","430px");
    }
  } else if (curInfo.tableType == "middle") {
    if (eleWidth < 760 && curInfo.pageCapacity == 10) {
      curInfo.pageCapacity = 8;
      middleTable.css("width","96%");
      setPagination();
      writeIntoPage();
    }
    if (eleWidth < 626 && curInfo.pageCapacity == 8) {
      curInfo.pageCapacity = 6;
      middleTable.css("width","94%");
      setPagination();
      writeIntoPage();
    }
    if (eleWidth < 480) {
      curInfo.pageCapacity = 10;
      curInfo.tableType = "small";
      ele.css("height", "282px");
      ele.css("min-height", "282px");
      setPagination();
      writeIntoPage();
    }
    if (eleWidth >= 636 && curInfo.pageCapacity == 6){
      curInfo.pageCapacity = 8;
      middleTable.css("width","96%");
      setPagination();
      writeIntoPage();
    }
    if (eleWidth >= 770 && curInfo.pageCapacity == 8) {
      curInfo.pageCapacity = 10;
      middleTable.css("width","100%");
      setPagination();
      writeIntoPage();
    }
    if (eleWidth >= 785) {
      curInfo.tableType = "big";
      $(".not-for-big-table").hide();
      if ($("#example tbody").children().length == 0) {
        writeIntoPage();
      }
      $("#staff-info-miantain-container").show();
      setMinHeight();
    }
    registEventForPagination(ele);
  } else {
    if (eleWidth <= 430 && curInfo.pageCapacity == 10) {
      middleTable.css("width", "90%");
      curInfo.pageCapacity = 8;
      setPagination();
      writeIntoPage();
    }
    if (eleWidth > 435 && curInfo.pageCapacity == 8) {
      middleTable.css("width", "100%");
      curInfo.pageCapacity = 10;
      setPagination();
      writeIntoPage();
    }
    if (eleWidth > 480) {
      curInfo.tableType = "middle";
      curInfo.pageCapacity = 8;
      setPagination();
      writeIntoPage();
      ele.css("height", "440px");
      ele.css("min-height", "440px");
    }
    registEventForPagination(ele);
  }
}

/*
函数名:registEventForPagination
函数功能:为新插入的分页栏注册跳转页面事件
参数:无
返回值:无
*/
function registEventForPagination() {
  var pageCircles = $(".pagination i");
  pageCircles.click(function() {
    curInfo.curPage = $(this).attr("data-page");
    pageCircles.attr("class","fa fa-circle-thin");
    $(this).attr("class","fa fa-circle");
    writeIntoPage();
  });
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

/*
函数名:showDetails
功能:当鼠标悬停在小表格的头像上时使用悬浮窗显示详细信息
参数:无
返回值:无
*/
function showDetails() {
  var count = 0;
  var hoverWindowIsExist = 0;
  $(".condensed-info i").hover(function(event) {
      $(".hover-window").hide();
      hoverWindowIsExist = 1;
      var icon = $(this);
      var container = icon.parent();
      var childCount = container.children().length;
      var staff_name = icon.next().next().text();
      var staff_role_name = icon.attr("data-role-name");
      var staff_create_time = icon.attr("data-create-time");
      var staff_gender = icon.attr("data-gender");
      var positionNumber = icon.attr("data-position-number");
      var myDiv = $("#myDiv");
      var divX = myDiv.offset().left;
      var divY = myDiv.offset().top;
      var positionNumberForX =
        positionNumber >= curInfo.pageCapacity / 2
          ? positionNumber - curInfo.pageCapacity / 2
          : positionNumber;
      var hoverWindowX = divX + positionNumberForX * 80 - 30;
      var hoverWindowY = divY + 50 + Math.floor(positionNumber / 5) * 100;
      if(childCount == 3){
        var html2 = "";
        html2 += "<div class='info-card hover-window'>";
            html2 += "<p><span class='staff-name'><b>" + staff_name + "</b></span></p>";
            html2 += "<p>";
            html2 += "<span class='join-time-title'>入职时间</span><br>";
            html2 += "<span class='join-time'><b>" + staff_create_time + "</b></span>";    
            html2 += "</p><p><i class='fa fa-user " + 
            (staff_gender == "男" ? "male-color" : "female-color") + "'></i>"
            html2 += "<span class='staff-type'> " + staff_role_name + "</span> </p>";
            html2 += "<div class='staff-status leave-color'>离职";
            html2 += "</div></div>";
            container.append(html2);
      }
      var hoverWindow = icon.next().next().next();
      hoverWindow
        .css({ left: hoverWindowX + "px", top: hoverWindowY + "px" })
        .show();
      hoverWindow.mouseleave(function() {
        $(this).hide();
        hoverWindowIsExist = 0;
      });
  });
}
/*
函数名:getMinHeight 设置最小高度函数
函数功能:设置每个可拖动的div的最小高度,但是不设置高度
参数:无
返回值:无
*/
function getMinHeight(){
  var ele = $("#myDiv");
  var headerHeight = ele.find(".div-header").height();
  var maintianHeight = ele.find("#staff-info-miantain-container").height() + 25;
  var minHeight = headerHeight + maintianHeight;
  ele.css("min-height", minHeight + "px");
}
/*
函数名:setMinHeight 设置最小高度函数
函数功能:设置每个可拖动的div的最小高度
参数:无
返回值:无
*/
function setMinHeight() {
  var ele = $("#myDiv");
  var headerHeight = ele.find(".div-header").height();
  var maintianHeight = ele.find("#staff-info-miantain-container").height() + 40;
  var minHeight = headerHeight + maintianHeight;
  ele.css("height", minHeight + "px");
  ele.css("min-height", minHeight + "px");
}

/*
函数名:setPagination
函数功能:当页面容量变化时,相应修改总的页数以及分页栏
参数:无
返回值:无
*/
function setPagination() {
  curInfo.curPage = 1;
  var l = data.length;
  var html = "";
  curInfo.pageNumber = Math.ceil(l / curInfo.pageCapacity);
  for (var i = 0; i < curInfo.pageNumber; i++) {
    if (i == 0) {
      html += "<i data-page='" + (i + 1) + "' class='fa fa-circle'></i>";
    } else {
      html += "<i data-page='" + (i + 1) + "' class='fa fa-circle-thin'></i>";
    }
    $(".pagination").html(html);
  }
}

/*
函数名:writeIntoPage
函数功能:为当前页面的可拖动div写入数据(大中小三种表格)
参数:无
返回值:无
*/
function writeIntoPage() {
  $.ajaxSetup({
    async: false
  });
  if (!curInfo.isLoad) {
    $.post("php/staff_management_big.php", function(json) {
      curInfo.isLoad++;
      data = JSON.parse(json).data;
    });
  }
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
    $("#example_filter input")
      .attr("type", "text")
      .addClass("remove-default-style")
      .addClass("search-input-for-big")
      .attr("placeholder", "  input something");
    $("#example").addClass("border-bottom-and-top");
    setMinHeight();
    $("select[name='example_length']").change(function() {
      $("#myDiv").css("width", "1000px");
      $("#staff-info-miantain-container td").show();
      $("#staff-info-miantain-container th").show();
      setMinHeight();
    });
    $("#example_paginate").click(function() {
      setMinHeight();
    });
    $(".not-for-big-table").hide();
  }
  if (curInfo.tableType == "middle" || curInfo.tableType == "small") {
    $("#staff-info-miantain-container").hide();
    $(".not-for-big-table").show();
    var html = "";
    if (curInfo.isLoad == 1) {
      curInfo.isLoad++;
      setPagination();
    }
    var html2 = "";
    var pageStart = (curInfo.curPage - 1) * curInfo.pageCapacity;
    var pageEnd = curInfo.curPage * curInfo.pageCapacity;
    $.each(data, function(index, value) {
      if (index >= pageStart && index < pageEnd) {
        if (curInfo.tableType == "middle") {
          html2 += "<div class='info-card'>";
          html2 += "<p><span class='staff-name'><b>" + value.staff_name + "</b></span></p>";
          html2 += "<p>";
          html2 += "<span class='join-time-title'>入职时间</span><br>";
          html2 += "<span class='join-time'><b>" + value.staff_create_time + "</b></span>";    
          html2 += "</p><p><i class='fa fa-user " + 
          (value.staff_gender == "男" ? "male-color" : "female-color") + "'></i>"
          html2 += "<span class='staff-type'> " + value.staff_role_name + "</span> </p>";
          html2 += "<div class='staff-status leave-color'>离职";
          html2 += "</div></div>";
        } else {
          html2 += "<div class='condensed-info float-left'>";
          html2 += "<i class='fa fa-user fa-4x " +
          (value.staff_gender == "男" ? "male-color" : "female-color") + "'";
          html2 += "data-create-time='" + value.staff_create_time + "' ";
          html2 += "data-gender='" + value.staff_gender + "' ";
          html2 += "data-role-name='" + value.staff_role_name + "'"; 
          html2 += "data-position-number='" + (index - pageStart ) + "'"; 
          html2 += "></i><br>";
          html2 += "<span class='staff-name'>" + value.staff_name + "</span></div>";
        }
      }
    });
    $("#middle-table").html(html2);
    registEventForPagination();
    if (curInfo.tableType == "small") {
      showDetails();
    }
  }

  $.ajaxSetup({
    async: true
  });
}
//获取保存的坐标数据
function getTheModulePos(){
  $(function(){
  $.ajax({  
        url:'php/get_the_module_pos.php',
        data:{
          
        },  
        type:'get',  
        cache:false,  
        dataType:'json',  
        success:function(data) {
          var allDragableDiv = $(".myDiv");
          $(".myDiv").css("width",data.module_width+"px");
          $(".myDiv").css("height",data.module_height+"px");
          $(".myDiv").css("left",data.module_x+"px");
          $(".myDiv").css("top",data.module_y+"px");
        }
    })

  })

}
/*
当文档加载完成后执行(执行顺序从上之下同注释)
执行功能:
初次写入数据到可拖动div
点击Lock图标时锁定或解锁可拖动div
*/

$(function() {
  
  writeIntoPage();
  getMinHeight();
  
  //getTheModulePos();

 $(".fa-send").click(function() {
    var allDragableDiv = $(".myDiv");
    var faLock = $(this);
    var dragableParentDiv = $(this)
      .parent()
      .parent()
      .parent();
    var parentId = dragableParentDiv.attr("id");
    faLock.toggleClass("fa-send-o").toggleClass("fa-send");
    if (faLock.hasClass("fa-send-o")) {
        curInfo[parentId] = 0;
    } else {
        curInfo[parentId] = 1;
        /* $(".myDiv").css("cursor", "default");
        var info = new Array();
        info[0] = parseInt(allDragableDiv.css("left"));
        info[1] = parseInt(allDragableDiv.css("top"));
        info[2] = parseInt(allDragableDiv.css("width"));
        info[3] = parseInt(allDragableDiv.css("height"));
        console.log(info);
        $.ajax({
          url:'php/save_the_module_pos.php',
          data:{
            'info':info
          },  
          type:'post',  
          cache:false,  
          dataType:'json',  
          success:function(data) {
            if(data=="ok"){
              console.log("记录成功");
            }
            else{
               console.log("记录出错");
            }
          }
       }) */
    }
    $.each(allDragableDiv, function() {
      dragAble($(this));
    });
  });





});
