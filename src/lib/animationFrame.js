let animationFrame = undefined;
let cancelFrame = undefined;
if (window.requestAnimationFrame) {
    animationFrame = window.requestAnimationFrame;
    cancelFrame = window.cancelAnimationFrame;
} else {
    let start = 0;
    animationFrame = function (callback) {
        let now = new Date().getTime();
        let nextTime = Math.max(start + 16, now);
        return setTimeout(() => {
            callback(start = nextTime)
        }, nextTime - now)
    }
}
export default  animationFrame;
export  {animationFrame,cancelFrame};