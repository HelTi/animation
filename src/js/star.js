import $dom from '../lib/dom';

console.log('starjs');

let window_h = document.documentElement.clientHeight;
let window_w = document.documentElement.clientWidth;

function Circle() {
    let c_left = getRandom(0, window_w, true);
    let c_top = getRandom(0, window_h, true);
    let c_width = getRandom(0, 10);
    let c_zindex = getRandom(0, 100);
    let circle = document.createElement('div');
    $dom(circle).css({
        'position': 'absolute',
        'left': c_left + 'px',
        'top': c_top + 'px',
        'width': c_width + 'px',
        'height': c_width + 'px',
        'border-radius': '50%',
        'z-index': c_zindex,
        'background-color': getRandomColor(),
    });
    circle.setAttribute('class', 'z_circle');
    let direction = getRandom(0, 2) !== 1;
    direction ? circle.classList.add('d_top') : circle.classList.add('d_bottom');
    return circle;
}

function createCircles() {
    for (let i = 0; i < 100; i++) {
        let circle = Circle();
        document.body.appendChild(circle);
    }
    run();
}

createCircles();

function run() {
    setInterval(() => {
        let circles_dom = document.querySelectorAll('.z_circle');
        for (let circle of circles_dom) {
            let direction = circle.classList.contains('d_top');
            let c_offset_left = circle.offsetLeft;
            let c_offset_top = circle.offsetTop;
            let c_l, c_h;
            if (direction && c_offset_left < window_w && c_offset_top < window_h) {
                c_l = circle.offsetLeft + 1;
                c_h = circle.offsetTop - 1;
            } else {
                c_l = circle.offsetLeft - 1;
                c_h = circle.offsetTop + 1;
            }
            circle.style.left = c_l + 'px';
            circle.style.top = c_h + 'px';
        }
    }, 100);

}

run();

/**
 * 返回随机数
 * @param start_number
 * @param end_number
 * @returns {number}
 */
function getRandom(min_number, max_number, is_float = false) {
    if (is_float) {
        return Math.random() * (max_number - min_number) + min_number;
    } else {
        return Math.floor(Math.random() * (max_number - min_number) + min_number);
    }
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 256).toString(10);
}
