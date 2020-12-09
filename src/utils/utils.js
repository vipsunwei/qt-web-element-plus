/**
 * 格式化日期
 * @param date
 * @param format
 * @return {string}
 */
export const formatDate = (date = new Date(), format = "yyyy-MM-dd") => {
  const o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
};

/**
 * 防抖函数
 * @description 返回一个防抖函数
 * @param {function} func 需要防抖的函数
 * @param {number} wait 延迟时间默认300ms
 * @param {boolean} immediate 是否立即执行 true：立即；false：不立即
 */
export function debounce(func, wait = 300, immediate) {
  let timeout;

  return function(...args) {
    let context = this;
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  };
}
/**
 * 节流函数
 * @description 返回一个节流函数
 * @param {function} fn 执行的函数
 * @param {number} gapTime 多久执行一次默认300ms
 */
export function throttle(fn, gapTime = 300) {
  let _lastTime = null;

  return function(...args) {
    let context = this;
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(context, args);
      _lastTime = _nowTime;
    }
  };
}

// 睡眠 单位：毫秒
export const sleep = (t) =>
  new Promise((resolve) => setTimeout(() => resolve(), t));
