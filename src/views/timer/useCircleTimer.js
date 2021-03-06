import { reactive, ref, onUnmounted } from 'vue'

export default function useCircleTimer() {
  const secondTexts = [
    '零零', '一秒', '二秒', '三秒', '四秒', '五秒', '六秒', '七秒', '八秒', '九秒', '十秒',
    '十一秒', '十二秒', '十三秒', '十四秒', '十五秒', '十六秒', '十七秒', '十八秒', '十九秒', '二十秒',
    '二十一秒', '二十二秒', '二十三秒', '二十四秒', '二十五秒', '二十六秒', '二十七秒', '二十八秒', '二十九秒', '三十秒',
    '三十一秒', '三十二秒', '三十三秒', '三十四秒', '三十五秒', '三十六秒', '三十七秒', '三十八秒', '三十九秒', '四十秒',
    '四十一秒', '四十二秒', '四十三秒', '四十四秒', '四十五秒', '四十六秒', '四十七秒', '四十八秒', '四十九秒', '五十秒',
    '五十一秒', '五十二秒', '五十三秒', '五十四秒', '五十五秒', '五十六秒', '五十七秒', '五十八秒', '五十九秒'
  ]
  const minuteTexts = [
    '零零', '一分', '二分', '三分', '四分', '五分', '六分', '七分', '八分', '九分', '十分',
    '十一分', '十二分', '十三分', '十四分', '十五分', '十六分', '十七分', '十八分', '十九分', '二十分',
    '二十一分', '二十二分', '二十三分', '二十四分', '二十五分', '二十六分', '二十七分', '二十八分', '二十九分', '三十分',
    '三十一分', '三十二分', '三十三分', '三十四分', '三十五分', '三十六分', '三十七分', '三十八分', '三十九分', '四十分',
    '四十一分', '四十二分', '四十三分', '四十四分', '四十五分', '四十六分', '四十七分', '四十八分', '四十九分', '五十分',
    '五十一分', '五十二分', '五十三分', '五十四分', '五十五分', '五十六分', '五十七分', '五十八分', '五十九分'
  ]
  const hourTexts = [
    '一时', '二时', '三时', '四时', '五时', '六时', '七时', '八时', '九时', '十时', '十一时', '十二时',
    '十三时', '十四时', '十五时', '十六时', '十七时', '十八时', '十九时', '二十时', '二十一时', '二十二时', '二十三时', '二十四时'
  ]

  const monthTexts = [
    '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
  ]
  const dayTexts = [
    '一日', '二日', '三日', '四日', '五日', '六日', '七日', '八日', '九日', '十日',
    '十一日', '十二日', '十三日', '十四日', '十五日', '十六日', '十七日', '十八日', '十九日', '二十日', 
    '二十一日', '二十二日', '二十三日', '二十四日', '二十五日', '二十六日', '二十七日', '二十八日', '二十九日', '三十日', , '三十一日'
  ]
  const current = reactive({
    currentYear: 0,
    currentMonths: 0,
    currentDays: 0,
    currentHours: 0,
    currentMinutes: 0, // 当前-分钟
    currentSeconds: 0, // 当前-秒
  })

  const deg = reactive({
    monthDeg: 0,
    hoursDeg: 0,
    daysDeg: 0,
    minutesDeg: 0, // 当前-分钟-转动角度
    secondsDeg: 0, // 当前-面-转动角度
  })

  const boxSize = {
    seconds: 580,
    minutes: 440,
    hours: 320,
    days: 180,
    months: 80,
  }

  let timer

  function init() {
    const d = new Date()
    const year = d.getFullYear() // 年
    const month = d.getMonth() + 1 // 月
    const day = d.getDate()
    const hours = d.getHours() // 时
    const minutes = d.getMinutes() // 分
    const seconds = d.getSeconds() // 秒
    // 当前时间
    current.currentYear = year
    current.currentMonths = month
    current.currentDays = day
    current.currentHours = hours
    current.currentMinutes = minutes
    current.currentSeconds = seconds
    // 角度
    deg.monthsDeg = (current.currentMonths - 1) * getPerDeg(monthTexts)
    deg.daysDeg = (current.currentDays - 1) * getPerDeg(dayTexts)
    deg.hoursDeg = (current.currentHours - 1) * getPerDeg(hourTexts)
    deg.minutesDeg = current.currentMinutes * getPerDeg(minuteTexts)
    deg.secondsDeg = current.currentSeconds * getPerDeg(secondTexts)
    // 设置定时器
    timer = setInterval(() => {
      runClock()
    }, 1000)
  }

  init()

  function runClock() {
    const d = new Date()
    const year = d.getFullYear() // 年
    const month = d.getMonth() + 1 // 月
    const hours = d.getHours() // 时
    const day = d.getDate() // 日
    // console.log('@@@@', hours)
    const minutes = d.getMinutes() // 分
    const seconds = d.getSeconds() // 秒
    if (current.currentYear !== year) {
      current.currentYear = year
    }
    if (current.currentMonths !== month) {
      current.currentMonths = month
      deg.monthDeg += getPerDeg(monthTexts)
    }
    if (current.currentDays !== day) {
      current.currentDays = day
      deg.daysDeg += getPerDeg(dayTexts)
    }
    if (current.currentHours !== hours) {
      current.currentHours = hours
      deg.hoursDeg += getPerDeg(hourTexts)
    }
    if (current.currentMinutes !== minutes) {
      current.currentMinutes = minutes
      deg.minutesDeg += getPerDeg(minuteTexts)
    }
      current.currentSeconds = seconds
      deg.secondsDeg += getPerDeg(secondTexts)
  }

  function boxStyle(key, deg) {
    return {
      // 设置文字外围盒子宽度、高度
      width: boxSize[key] + 'px',
      height: boxSize[key] + 'px',
      // 添加转动
      transform: `rotate(-${deg}deg)`
    }
  }

  function spanStyle(size, texts, i) {
    const r = size / 2 // 半径
    const deg = getPerDeg(texts) // 元素平均间隔度数
    const angle = i * deg // 夹角
    const { a, b } = getHypotenuse(r, angle)
    const rotateDeg = deg * i // 文字旋转角度
    return {
      top: a + r + 'px',
      left: b + r + 'px',
      transform: `rotate(${rotateDeg}deg)`,
      transformOrigin: '0 0'
    }
  }

  // 元素平均间隔度数
  function getPerDeg(texts) {
    return 360 / texts.length
  }
  
  // 已知角度和斜边，获取直角边
  function getHypotenuse(long, angle) {
    // 获得弧度
    let radian = 2 * Math.PI / 360 * angle
    return {
      a: Math.sin(radian) * long, // 邻边
      b: Math.cos(radian) * long // 对边
    }
  }

  onUnmounted(() => {
    clearInterval(timer)
    timer = null
  })
  return {
    secondTexts,
    boxSize,
    current,
    deg,
    hourTexts,
    dayTexts,
    monthTexts,
    minuteTexts,
    boxStyle,
    spanStyle,
  }
}