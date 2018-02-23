let testStyle = document.createElement('div').style;

let transformStyle = 'transform' in testStyle ? 'transform' : 'webkitTransform'
let transitionStyle = 'transition' in testStyle ? 'transition' : 'webkitTransition'


let p = document.getElementById('p');

let touchStartPos = {
  clientX: 0,
  clientY: 0,
  screenX: 0,
  screenY: 0,
  timeStamp: 0
};

let touchMovePos = {
  clientX: 0,
  clientY: 0,
  screenX: 0,
  screenY: 0,
  timeStamp: 0
};

let touchEndPos = {
  clientX: 0,
  clientY: 0,
  screenX: 0,
  screenY: 0,
  timeStamp: 0
};
let dom_start_pos = {
  clientX: p.offsetLeft,
  clientY: p.offsetTop,
  screenX: 0,
  screenY: 0,
};
let move_distance = 0;
//屏幕的宽度
let win_width = document.body.clientWidth || document.documentElement.clientWidth;
console.log(win_width)
p.addEventListener('touchstart', function (e) {
  console.log('touchstart');
  let touch = e.targetTouches[0];
  touchStartPos = {
    clientX: touch.clientX,
    clientY: touch.clientY,
    screenX: touch.screenX,
    screenY: touch.screenY,
    timeStamp: e.timeStamp
  }
  console.log(dom_start_pos)
}, false);

p.addEventListener('touchmove', function (e) {
  let touch = e.targetTouches[0];
  touchMovePos = {
    clientX: touch.clientX,
    clientY: touch.clientY,
    screenX: touch.screenX,
    screenY: touch.screenY,
    timeStamp: e.timeStamp
  }
  move_distance = touchMovePos.clientX - touchStartPos.clientX;

  transform(p, move_distance)


}, false)

p.addEventListener('touchend', function (e) {
  console.log('touchend');
  let touch = e.changedTouches[0];
  touchEndPos = {
    clientX: touch.clientX,
    clientY: touch.clientY,
    screenX: touch.screenX,
    screenY: touch.screenY,
    timeStamp: e.timeStamp
  }
  /* console.log(touchStartPos)
   console.log(touchMovePos)
   console.log(touchEndPos)*/
  if (Math.abs(move_distance) > win_width / 2) {
    if (move_distance > 0) {
      transform(p, win_width)
    }
    if (move_distance < 0) {
      transform(p, -win_width)
    }
  } else {
    transform(p, dom_start_pos.clientX)
  }
});

/**
 * 移动
 * @param dom
 * @param distance
 */
function transform(dom, distance) {
  dom.style[transformStyle] = `translateX(${distance}px)`
}
