import { calcTimeBetween2 } from '@/utils/util'
import { useIntervalFn } from './useIntervalFn'
import { ref } from 'vue'

const isDef = v => v !== null && v !== undefined && v !== ''

/**
 * 
 * @param {number} time1 小时间
 * @param {number} time2 大时间
 * @param {boolean} minus true 倒计时 false 正计时
 * @returns resetTime 重新赋值 time1 time2 重启 interval
 */
export function useCountdown (time1, time2, minus = true) {
  const time1Ref = ref(isDef(time1) ? time1 : 0)
  const time2Ref = ref(isDef(time2) ? time2 : 0)
  const timeStr = ref('00: 00')

  const { pause, isActive, resume } = useIntervalFn(getTimeStr)


  function getTimeStr () {
    timeStr.value = calcTimeBetween2(time1Ref.value, time2Ref.value)
    if (minus) {
      time2Ref.value -= 1000
    } else {
      time2Ref.value += 1000
    }
    if (time1Ref.value > time2Ref.value) {
      pause()
    }
  }

  function resetTime(_time1, _time2) {
    time1Ref.value = _time1,
    time2Ref.value = _time2
    resume()
  }

  return {
    resetTime,
    timeStr,
    isActive,
  }

}