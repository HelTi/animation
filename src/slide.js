console.log('slide');
import './css/reset.css'
import './css/slide.scss'
import {animationFrame, cancelFrame} from "./lib/animationFrame";

let testStyle = document.createElement('div').style;
let transformStyle = 'transform' in testStyle ? 'transform' : 'webkitTransform';
let transitionStyle = 'transition' in testStyle ? 'transition' : 'webkitTransition';

/**
 * transform
 * @param dom
 * @param distance
 */
function transform(dom, distance) {
  dom.style[transformStyle] = `translateX(${distance}px)`;
}

let slideSwiper = function () {
  this.viewAreaWidth = document.body.clientWidth || document.documentElement.clientWidth;
  this.slide_content_dom = document.querySelector('.slide-wrapper-content');
  this.slide_item_doms_s = document.querySelectorAll('.slide-wrapper-content .item');
  this.slide_content_width = 0;
  this.startMoveTime = 0;
  this.endMoveTime = 0;
  this.startX = 0;
  this.currentX = 0;//触摸时的x位置
  this.translateX = 0;//触摸滑动距离
  this.lastX = 0;
  this.isTouching = false;//是否处于触摸状态
  this.moveDistance = 0;//经过阻力处理后应该滑动距离
  this.scrollX = 0;//滑动的距离，
  this.isBounding = true;//是否回弹
  this.frameTime = 16.7; // 每个动画帧的ms数
  this.frameStartTime = 0;
  this.frameEndTime = 0;
  this.inertiaFrame = 0;
  this.zeroSpeed = 0.001; // 当speed绝对值小于该值时认为速度为0 (可用于控制惯性滚动结束期的顺滑度)
  this.acceleration = 0; // 惯性滑动加速度;
  this.additionalX = 50;// 近似等于超出边界时最大可拖动距离(px);
};
slideSwiper.prototype = {
  init: function () {
    this.setSlideContentWidth();
    this.bindEvent();
  },
  setSlideContentWidth: function () {
    let items_dom = this.slide_item_doms_s;
    Array.prototype.map.call(items_dom, (item) => {
      this.slide_content_width += item.offsetWidth
    });
    this.slide_content_dom.style.width = this.slide_content_width + 'px';
  },
  bindEvent: function () {
    this.touchStartHandle();
    this.touchMoveHandle();
  },
  touchStartHandle: function () {
    let that = this;
    this.slide_content_dom.addEventListener('touchstart', function (e) {
      let touch = e.targetTouches[0];
      that.lastX = touch.clientX;
    }, false);
  },
  touchMoveHandle: function () {
    let that = this;
    this.slide_content_dom.addEventListener('touchmove', function (e) {
      let touch = e.targetTouches[0];
      that.isTouching = true;
      that.startMoveTime = that.endMoveTime;
      that.startX = that.lastX;
      that.currentX = touch.clientX;

      let isMoveLeft = that.computedIsMoveLeft();
      let canScrollX = that.computeCanScrollX();
      console.log('isl:', isMoveLeft);
      console.log('csx', canScrollX)

      if (isMoveLeft) {
        console.log('move left');
        if (that.translateX <= 0 && that.translateX + canScrollX > 0 || that.translateX > 0) {
          that.translateX += that.currentX - that.lastX;
        } else if (that.translateX + canScrollX <= 0) {
          that.translateX += that.additionalX * (that.currentX - that.lastX) / (that.viewAreaWidth + Math.abs(that.translateX + canScrollX))
        }
      } else {
        console.log('move right');
        if (that.translateX >= 0) {
          that.translateX += that.additionalX * (that.currentX - that.lastX) / (that.viewAreaWidth + canScrollX);
        } else if (that.translateX <= 0 && that.translateX + canScrollX >= 0 || that.translateX + canScrollX <= 0) {
          that.translateX += that.currentX - that.lastX
        }
      }
      that.lastX = that.currentX;
      that.endMoveTime = e.timeStamp;
      console.log(that.translateX)
    }, false);
  },
  computeCanScrollX: function () {
    // 可视区与可滑动元素宽度差值;
    return this.slide_content_dom.offsetWidth - this.viewAreaWidth;
  },
  computedIsMoveLeft() {
    return this.currentX <= this.startX;
  },
  slideTransform(distance) {
    transform(this.slide_content_dom, distance)
  }
};

new slideSwiper().init();





