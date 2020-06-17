export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}

export function debounce (func, wait=60) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

export function throttle (func, wait=20) {
  let previous = 0
  return function () {
    let now = Date.now()
    let context = this
    let args = arguments
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}

export function deepCopy (target) {
  let copyTarget = JSON.parse(JSON.stringify(target))
  return copyTarget
}

export function isPC () {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      // alert(navigator.userAgent);  
      // window.location.href ="iPhone.html"
      // console.log('iPhone')
  } else if (/(Android)/i.test(navigator.userAgent)) {
      // alert(navigator.userAgent); 
      // window.location.href ="Android.html"
      // console.log('Android')
  } else {
      // window.location.href ="pc.html"
      // console.log('PC')
      alert('非常抱歉，该网站只适配移动端，PC端按F12打开调试工具可以切换为移动端视图~')
  }
}
