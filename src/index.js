import animate from './lib/animate'
import animationFrame from './lib/animationFrame'
import easings from './lib/easings';

import './css/index.scss'
import './js/star';
import './js/test'

/*let start = null;
let animate_ele_1 = document.getElementById('animate1');
let start_time = +new Date();
let animate1 = function(timestep) {
    let now_time = +new Date();
    if (!start) start = timestep;
    console.log('start',start);
    console.log('timestep',timestep);
    console.log('start_time',start_time);
    console.log('now_time',now_time);
    console.log('duration',now_time-start_time);
    console.log('frame_duration',timestep-start);
    //let progress = timestep - start;
    let progress = easings['QuadEaseIn'](timestep-start,0,1200,1000);
    console.log('progress',progress);
    animate_ele_1.style.width = Math.min(progress) + 'px';
    if (progress < 1200) {
        //animationFrame(animate1)
        window.requestAnimationFrame(animate1)
    } else {
        console.log('end');
        return false;

        //window.cancelAnimationFrame(animate1)
    }
}
window.requestAnimationFrame(animate1);*/
//animationFrame(animate1);
let animate_ele_1 = document.getElementById('animate1');
animate({
    to:1000,
    duration:1000,
    easing:'QuartEaseIn'
},function (progress) {
    animate_ele_1.style.width = Math.min(progress) + 'px'
});
