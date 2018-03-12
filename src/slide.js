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
  this.reBoundingDuration = 360;
  this.speed = 0; //回弹速度
  this.sensitivity = 1000;//灵敏度(惯性滑动时的灵敏度,值越小，阻力越大),可近似认为速度减为零所需的时间(ms);
  this.reBoundExponent = 10; // 惯性回弹指数(值越大，幅度越大，惯性回弹距离越长);
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
    this.touchEndHandle();
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
      console.log(that.translateX);
      that.setAnimateStyle();
    }, false);
  },
  touchEndHandle: function () {
    let that = this;
    this.slide_content_dom.addEventListener('touchend', function (e) {
      console.log('touchend');
      let checkBound = that.checkIsNeedBoundX();
      console.log('checkBound:', checkBound)
      this.isTouching = false;
      if (checkBound) {
        cancelFrame(this.inertiaFrame);
      } else {
        let slienceTime = e.timeStamp - that.endMoveTime;
        let timeStamp = that.endMoveTime - that.startMoveTime;
        console.log('slienceTime:', slienceTime);
        if (slienceTime > 100) return false;
        that.speed = (that.lastX - that.startX);
        that.acceleration = that.speed / that.sensitivity;
        that.frameStartTime = new Date().getTime();
        that.inertiaFrame = animationFrame(that.moveByInertia);
      }
    }, false)
  },
  moveByInertia: function () {
    console.log('moveByInertia');
    let that = this;
    let isMoveLeft = this.computedIsMoveLeft();
    let isMoveRight = this.computedIsMoveRight();
    let canScrollX = this.computeCanScrollX();
    that.frameEndTime = new Date().getTime();
    that.frameTime = that.frameEndTime - that.frameStartTime;
    debugger;
    if (isMoveLeft) {
      if (that.translateX <= -canScrollX) {
        that.acceleration *= (that.reBoundExponent + Math.abs(that.translateX + canScrollX)) / that.reBoundExponent;
        that.speed = Math.min(that.speed - that.acceleration * that.frameTime, 0)
      } else {
        that.speed = Math.min(that.speed - that.acceleration * that.frameTime, 0)
      }
    } else if (isMoveRight) {
      if (that.translateX >= 0) {
        that.acceleration *= (that.reBoundExponent + that.translateX) / that.reBoundExponent;
        that.speed = Math.max(that.speed - that.acceleration * that.frameTime, 0)
      } else {
        that.speed = Math.max(that.speed - that.acceleration * that.frameTime, 0)
      }
    }
    that.translateX += that.speed * that.frameTime / 2;
    if (Math.abs(that.speed) <= that.zeroSpeed) {
      that.checkIsNeedBoundX();
      return;
    }
    that.frameStartTime = that.frameEndTime;
    that.inertiaFrame = animationFrame(that.moveByInertia)
  },
  checkIsNeedBoundX: function () {
    this.isBounding = false;
    console.log('checkB_TX', this.translateX);
    let canScrollX = this.computeCanScrollX();
    console.log('cx', canScrollX)
    if (this.translateX > 0) {
      this.isBounding = true;
      this.translateX = 0;
    } else if (this.translateX < -canScrollX) {
      this.isBounding = true;
      this.translateX = -canScrollX;
    }
    return this.translateX === 0 || this.translateX === -canScrollX;
  },
  computeCanScrollX: function () {
    // 可视区与可滑动元素宽度差值;
    return this.slide_content_dom.offsetWidth - this.viewAreaWidth;
  },
  computedIsMoveLeft: function () {
    return this.currentX <= this.startX;
  },
  computedIsMoveRight: function () {
    return this.currentX >= this.startX;
  },
  computedTransitionDuration: function () {
    if (this.isTouching || (!this.isBounding && !this.isTouching)) {
      return '0';
    }
    if (this.isBounding && !this.isTouching) {
      return this.reBoundingDuration;
    }
  },
  computedTransitionTimingFunction: function () {
    return this.isBounding ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'cubic-bezier(0.1, 0.57, 0.1, 1)'
  },
  setAnimateStyle: function () {
    let ts_duration = this.computedTransitionDuration();
    let ts_timing_function = this.computedTransitionTimingFunction();
    this.slide_content_dom.style['transform'] = `translate3d(${this.translateX}px, 0px, 0px)`;
    this.slide_content_dom.style['transitionDuration'] = `${ts_duration}ms`;
    this.slide_content_dom.style['transitionTimingFunction'] = `${ts_timing_function}`;
  }
};

new slideSwiper().init();





