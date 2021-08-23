import { ref, computed, onUnmounted } from 'vue'
import { handleTransformTimeDiff } from '@/utils/util'

export default function useCountDown() {
  const timeArr = [30, 45, 60]
  const options = timeArr.map(v => ({ label: v, value: v }))
  let countTime = ref(timeArr[0])
  let countTimeBackup = ref(timeArr[0])
  const countTimeStr = computed(() => handleTransformTimeDiff(countTimeBackup.value * 60, true))
  let interval

  function handleStartCount() {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
    countTimeBackup.value = countTime.value
    interval = setInterval(() => {
      countTimeBackup.value -= 1 / 60
    }, 1000)
  }

  onUnmounted(() => {
    clearInterval(interval)
    interval = null
  })

  function changeCountTime(e) {
    countTime.value = e
  }

  return {
    options,
    changeCountTime,
    countTimeStr,
    countTime,
    handleStartCount,
  }
}
