console.log('tab')
import './css/tab.scss'
import { animationFrame, cancelFrame } from './lib/animationFrame'
import { composite } from 'popmotion'

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

    scrollTo(tabs_ele, navScrollLeft, tabOffsetLeft - (navWidth - tabWidth) / 2)
  })
}

function scrollIntoView(el, from, to) {
  el.scrollLeft += to - from
}

function scrollTo(el, from, to) {
  let count = 0
  const frames = Math.round((0.3 * 1000) / 16)

  const animate = () => {
    el.scrollLeft += (to - from) / frames
    if (++count < frames) {
      animationFrame(animate)
    }
  }

  animate()
}
document.getElementById('scroll').addEventListener('click', e => {
  tabs_ele.scrollLeft = 50
})
