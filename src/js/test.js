import animate from '../lib/animate';
/**
 * TEST animation
 */

animate(0, 100, 3000, 'BounceEaseInOut', function (value) {
    console.log(value);
});