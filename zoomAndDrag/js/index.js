function dragAble(ele) {

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
  var preLeft = 0
  var preTop = 0;

  ele.bind({
    mousedown: function (e) {
      var leftPos = ele.offset().left;
      var rightPos = leftPos + ele.width() + leftBorder + rightBorder;
      var topPos = ele.offset().top;
      var bottomPos = topPos + ele.height() + topBorder + bottomBorder;

      preXPos = e.pageX;
      preYPos = e.pageY;
      preLeft = parseInt(ele.css('left'));
      preTop = parseInt(ele.css('top'));

      if (e.pageX >= leftPos - 5 && e.pageX <= rightPos + 5 &&
        e.pageY >= topPos - 5 && e.pageY <= bottomPos + 5) {
        isMouseDown = true;
        //创建遮罩层，防止mouseup事件被其它元素阻止冒泡，导致mouseup事件无法被body捕获，导致拖动不能停止
        var bodyWidth = ele.parent().width();
        var bodyHeight = ele.parent().height();
        $('body').append('<div id="mask" style="opacity:0.1;top:0px;left:0px;background-color:green;position:absolute;z-index:9999;width:'+bodyWidth+'px;height:'+bodyHeight+'px;"></div>');
      }
    }
  });

  $('body').bind({
    mousemove: function (e) {
      var leftPos = ele.offset().left;
      var rightPos = leftPos + ele.width() + leftBorder + rightBorder;
      var topPos = ele.offset().top;
      var bottomPos = topPos + ele.height() + topBorder + bottomBorder;

      if (leftPos - 5 <= e.pageX && e.pageX <= leftPos + 5 &&
        topPos - 5 <= e.pageY && e.pageY <= topPos + 5 && !isMouseDown) {
        ele.css('cursor', 'nw-resize');
        leftTopJudge = true;
      } else if (topPos - 5 <= e.pageY && e.pageY <= topPos + 5 &&
        rightPos - 5 <= e.pageX && e.pageX <= rightPos + 5 && !isMouseDown) {
        ele.css('cursor', 'ne-resize');
        rightTopJudge = true;
      } else if (leftPos - 5 <= e.pageX && e.pageX <= leftPos + 5 &&
        bottomPos - 5 <= e.pageY && e.pageY <= bottomPos + 5 && !isMouseDown) {
        ele.css('cursor', 'sw-resize');
        leftBottomJudge = true;
      } else if (bottomPos - 5 <= e.pageY && e.pageY <= bottomPos + 5 &&
        rightPos - 5 <= e.pageX && e.pageX <= rightPos + 5 && !isMouseDown) {
        ele.css('cursor', 'se-resize');
        rightBottomJudge = true;
      } else if (leftPos - 5 <= e.pageX && e.pageX <= leftPos + 5 && !isMouseDown) {
        ele.css('cursor', 'w-resize');
        leftJudge = true;
      } else if (rightPos - 5 <= e.pageX && e.pageX <= rightPos + 5 && !isMouseDown) {
        ele.css('cursor', 'e-resize');
        rightJudge = true;
      } else if (topPos - 5 <= e.pageY && e.pageY <= topPos + 5 && !isMouseDown) {
        ele.css('cursor', 'n-resize');
        topJudge = true;
      } else if (bottomPos - 5 <= e.pageY && e.pageY <= bottomPos + 5 && !isMouseDown) {
        ele.css('cursor', 's-resize');
        bottomJudge = true;
      } else {
        if (!isMouseDown) {
          ele.css('cursor', 'move');

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
      if (isMouseDown) {
        if (leftTopJudge == true) {
          if (rightPos - e.pageX - leftBorder - rightBorder >= 0) {
            ele.width((rightPos - e.pageX - leftBorder - rightBorder) + 'px');
            ele.css('left', e.pageX + 'px');
          }
          if (bottomPos - e.pageY - topBorder - bottomBorder >= 0) {
            ele.height((bottomPos - e.pageY - topBorder - bottomBorder) + 'px');
            ele.css('top', e.pageY + 'px');
          }
        } else if (rightTopJudge == true) {
          if (e.pageX - leftPos - leftBorder - rightBorder >= 0) {
            ele.width((e.pageX - leftPos - leftBorder - rightBorder) + 'px');
          }
          if (bottomPos - e.pageY - topBorder - bottomBorder >= 0) {
            ele.height((bottomPos - e.pageY - topBorder - bottomBorder) + 'px');
            ele.css('top', e.pageY + 'px');
          }
        } else if (leftBottomJudge == true) {
          if (rightPos - e.pageX - leftBorder - rightBorder >= 0) {
            ele.width((rightPos - e.pageX - leftBorder - rightBorder) + 'px');
            ele.css('left', e.pageX + 'px');
          }
          if (e.pageY - topPos - topBorder - bottomBorder >= 0) {
            ele.height((e.pageY - topPos - topBorder - bottomBorder) + 'px');
          }
        } else if (rightBottomJudge == true) {
          if (e.pageX - leftPos - leftBorder - rightBorder >= 0) {
            ele.width((e.pageX - leftPos - leftBorder - rightBorder) + 'px');
          }
          if (e.pageY - topPos - topBorder - bottomBorder >= 0) {
            ele.height((e.pageY - topPos - topBorder - bottomBorder) + 'px');
          }
        } else if (leftJudge == true) {
          if (rightPos - e.pageX - leftBorder - rightBorder >= 0) {
            ele.width((rightPos - e.pageX - leftBorder - rightBorder) + 'px');
            ele.css('left', e.pageX + 'px');
          }
        } else if (rightJudge == true) {
          if (e.pageX - leftPos - leftBorder - rightBorder >= 0) {
            ele.width((e.pageX - leftPos - leftBorder - rightBorder) + 'px');
          }
        } else if (topJudge == true) {
          if (bottomPos - e.pageY - topBorder - bottomBorder >= 0) {
            ele.height((bottomPos - e.pageY - topBorder - bottomBorder) + 'px');
            ele.css('top', e.pageY + 'px');
          }
        } else if (bottomJudge == true) {
          if (e.pageY - topPos - topBorder - bottomBorder >= 0) {
            ele.height((e.pageY - topPos - topBorder - bottomBorder) + 'px');
          }
        } else if (insideJudge == true) {
          ele.css('left', (preLeft + e.pageX - preXPos) + 'px');
          ele.css('top', (preTop + e.pageY - preYPos) + 'px');
        }
      }
    },
    mouseup: function (e) {
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
      $('#mask').remove();
      
    }

  });

};

$('#otherDiv').mouseup(function (e) {
  //e.preventDefault(); //阻止默认行为
  e.stopPropagation(); //阻止事件冒泡(导致body捕获不到mouseup事件)
});

/*
函数名:边缘吸附函数
功能:当div超过父容器边缘或者靠近边缘时,自动吸附到父容器边缘
参数:对象ele(div)
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
      adsorbBottomPosition = parentDivHeight - eleHeight - gapWidth - borderWidth * 2, //底部吸附位置
      adsorbRightPosition = parentDivWidth - eleWidth - gapWidth - borderWidth * 2; //右吸附位置

  if (leftPosition <= gapJudgeScope) {
    ele.css("left", gapWidth + "px");
  }
  if(rightPosition >= gapJudgeScopeRight){
    ele.css("left", adsorbRightPosition + "px");
  }
  if (topPosition <= gapJudgeScope) {
    ele.css("top", gapWidth + "px");
  }
  if (bottomPosition >= gapJudgeScopeBottom) {
    ele.css("top", adsorbBottomPosition + "px");
  }
}
$(document).ready(dragAble($('#myDiv')));