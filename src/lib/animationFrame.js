let animationFrame = undefined;

if (window.requestAnimationFrame) {
    animationFrame = window.requestAnimationFrame;
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