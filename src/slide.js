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

let slideSwiper = function (dom, opt) {
  this.viewAreaWidth = document.body.clientWidth || document.documentElement.clientWidth;
  this.slide_content_dom = document.querySelector('.slide-wrapper-content');
  this.slide_item_doms_s = document.querySelectorAll('.slide-wrapper-content .item');
  this.slide_content_width = 0;
  this.startX = 0;
  this.currentX = 0;
  this.translateX = 0;
  this.scrollX = 0;//滑动的距离，
  this.isBounding = true;
  this.endX = 0;
  this.moveDistance = 0;
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
    var _this = this;
    this.slide_content_dom.addEventListener('touchstart', function (e) {
      let touch = e.targetTouches[0];
      _this.startX = touch.clientX;
      console.log(_this.startX);
    }, false);
  },
  touchMoveHandle: function () {
    var _this = this;
    this.slide_content_dom.addEventListener('touchmove', function (e) {
      let touch = e.targetTouches[0];
      _this.currentX = touch.clientX;
      _this.translateX = _this.currentX - _this.startX;
      console.log('currentX:', _this.translateX);
      console.log('translateX:', _this.translateX);
      //滑动事件
      let translate_x = _this.translateX;
      let scroll_x = _this.computeScrollX();
      console.log('scrollx',scroll_x);

      _this.slideTransform(translate_x);

    }, false);
  },
  computeScrollX: function () {
    return this.slide_content_dom.offsetWidth - this.viewAreaWidth;
  },
  slideTransform(distance){
    transform(this.slide_content_dom,distance)
  }
};

new slideSwiper().init();





