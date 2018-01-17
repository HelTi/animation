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
export default function (from, to, duration = 200, easing = 'Linear', callback) {
    if (!easings[easing]) {
        throw new Error(`NO ${easing} effect`);
    }
    let start = 0, duration_time = duration,
        frame = null;

    function step() {
        let value = easings[easing](start, from, to - from, duration_time);
        start++;
        if (start <= duration_time) {
            callback(value);
            animationFrame(step);
            frame = animationFrame(step);
        } else {
            cancelFrame(step);
        }
    }

    step();
    return () => frame;
}