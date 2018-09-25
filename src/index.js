//import parabolaAnimation from 'parabola-animation'


import animate from './lib/animate'
import animationFrame from './lib/animationFrame'
import easings from './lib/easings';

import './js/star';

import parabolaAnimation from 'parabola-animation'

console.log('index');
console.log(parabolaAnimation);
let p = new parabolaAnimation(null,{
  startPos:{
    left:10, //相对屏幕的left
    top:10   //相对屏幕的top
  },
  endPos:{
    left:100,
    top:100
  },
  endFunc:function(){
    p.destroy(); //结束时的callback
  }
})
let animate_ele_1 = document.getElementById('animate1');
animate({
    to:1000,
    duration:1000,
    easing:'QuartEaseIn'
},function (progress) {
    animate_ele_1.style.width = Math.min(progress) + 'px'
});
