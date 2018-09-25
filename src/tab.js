console.log('tab');
import './css/tab.scss'
import { animationFrame, cancelFrame } from "./lib/animationFrame";
import { composite } from 'popmotion';

const tabs_ele = document.querySelector('.tabs')

const tabs = document.querySelectorAll('.tabs .tab-item')

for (let tab of tabs) {
  tab.addEventListener('click', e => {
    const navWidth = tabs_ele.offsetWidth
    const tabWidth = e.target.offsetWidth

    const navScrollLeft = tabs_ele.scrollLeft
    const tabOffsetLeft = e.target.offsetLeft
    console.log('navWidth', navWidth)
    console.log('tabWidth', tabWidth)
    console.log('navScrollLeft', navScrollLeft)
    console.log('tabOffsetLeft', tabOffsetLeft)

    scrollIntoView(tabs_ele, navScrollLeft, tabOffsetLeft - (navWidth - tabWidth) / 2)
  })
}


function scrollIntoView(el, from, to) {
  el.scrollLeft += to - from
}
document.getElementById('scroll').addEventListener('click', e => {
  tabs_ele.scrollLeft = 50
})