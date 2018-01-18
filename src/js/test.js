import animate from '../lib/animate';
/**
 * TEST animation
 */
console.log('test');
animate({
    to:3000,
    duration:1000,
    easing:'QuartEaseIn'
}, function (value) {
    console.log(value);
});