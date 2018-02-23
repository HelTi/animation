import animationFrame, {cancelFrame} from './animationFrame'
import easings from './easings'

/**
 * 动画函数
 * @param from 初始值
 * @param to 结束值
 * @param duration 过度时间
 * @param easing 缓动类型
 * @param callback 回调函数
 */
//(from, to, duration = 200, easing = 'Linear', callback)

export default function ({from = 0, to = 0, duration = 200, easing = 'Linear'}, callback) {
  if (!easings[easing]) {
    throw new Error(`NO ${easing} effect`);
  }
  let start_frame = null;
  //frame = null;
  let step = function (timestep) {
    if (!start_frame) start_frame = timestep;
    let value = easings[easing](timestep - start_frame, from, to - from, duration);
    if (Math.abs(value) <= Math.abs(to - from)) {
      animationFrame(step);
      callback(value);
      //frame = animationFrame(step);
    } else {
      console.log('end');
      cancelFrame(step);
      return false;
    }
  };
  animationFrame(step);
  //return () => frame;
}