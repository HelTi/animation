import './css/index.scss'
import animationFrame from './lib/animationFrame'
import './js/test'

let start = null;
let animate_ele_1 = document.getElementById('animate1');

function animate1(timestep) {
    if (!start) start = timestep;
    let progress = timestep - start;
    animate_ele_1.style.width = Math.min(progress) + 'px';
    if (progress < 1000) {
        animationFrame(animate1)
    } else {
        window.cancelAnimationFrame(animate1)
    }
}

animationFrame(animate1);

let window_h = document.documentElement.clientHeight;
let window_w = document.documentElement.clientWidth;

function Circle() {
    let c_left = getRandom(0, window_w, true);
    let c_top = getRandom(0, window_h, true);
    let c_width = getRandom(0, 10);
    let c_zindex = getRandom(0, 100);
    let circle = document.createElement('div');
    circle.style.position = 'absolute';
    circle.style.left = c_left + 'px';
    circle.style.top = c_top + 'px';
    circle.style.width = c_width + 'px';
    circle.style.height = c_width + 'px';
    circle.style.borderRadius = "50%";
    circle.style.zIndex = c_zindex;
    circle.style.backgroundColor = getRandomColor();
    circle.setAttribute('class', 'z_circle');
    let direction = getRandom(0, 2) !== 1;
    direction ? circle.classList.add('d_top') : circle.classList.add('d_bottom');
    return circle;
}

// setInterval(() => {
//     let circle = Circle();
//     document.body.appendChild(circle)
// }, 500);
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
            let c_l,c_h;
            if(direction && c_offset_left < window_w && c_offset_top <window_h){
                 c_l = circle.offsetLeft + 1;
                 c_h = circle.offsetTop - 1;
            }else{
                 c_l = circle.offsetLeft - 1;
                 c_h = circle.offsetTop + 1;
            }
            // let c_l = direction ? circle.offsetLeft + 1 : circle.offsetLeft - 1;
            // let c_h = direction ? circle.offsetTop + 1 : circle.offsetTop - 1;
           /* let c_l = circle.offsetLeft + 1
            let c_h = circle.offsetTop + 1*/
            circle.style.left = c_l + 'px';
            circle.style.top = c_h + 'px';
        }
    }, 100);

}

run();

function runStep(ele, left, top) {
    ele.style.left = left + 'px';
    ele.style.top = top + 'px';
}

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
