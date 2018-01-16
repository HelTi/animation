import animate from '../lib/animate';
/**
 * TEST animation
 */

/*
let progress = 0;
let start_time = +new Date();

function step(v) {
    console.log(v);
    let end_time = +new Date();
    let duration_time = end_time - start_time;
    if (duration_time > 3000) {
        return false;
    } else {
        console.log('time:', end_time);
        window.requestAnimationFrame(step);
    }
}

window.requestAnimationFrame(step);*/

animate(0, 100, 3000, 'BounceEaseInOut', function (value) {
    console.log(value);
});