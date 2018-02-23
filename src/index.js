import animate from './lib/animate'
import animationFrame from './lib/animationFrame'
import easings from './lib/easings';

import './css/index.scss'
import './js/star';
import './js/test'

let animate_ele_1 = document.getElementById('animate1');
animate({
    to:1000,
    duration:1000,
    easing:'QuartEaseIn'
},function (progress) {
    animate_ele_1.style.width = Math.min(progress) + 'px'
});
