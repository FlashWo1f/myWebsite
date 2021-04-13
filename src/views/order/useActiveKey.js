import { ref, watch } from 'vue'

export default function useActiveKey(maxCount) {
  const activeKey = ref(0);

  const finishTimes = ref(0)

  const fastTime = 40
  const midTime = 200
  const slowTime = 500
  const almostTime = 800
  const arr = [fastTime, midTime, slowTime, almostTime]

  function getRandomDuring(speedIdx) {
    return (Math.random() * (10 - speedIdx * 2) + 2) * 1000
  }

  let speedIdx = 0
  let interval
  function _handleSetInterval() {
    let breakTime = arr[speedIdx]
    let count = 0
    const maxCountPerLoop = Math.floor(getRandomDuring(speedIdx) / breakTime)
    interval = setInterval(() => {
      setActiveKey()
      count++
      if (count === maxCountPerLoop) {
        clearInterval(interval)
        interval = null
        if (speedIdx < arr.length - 1) {
          speedIdx++
          _handleSetInterval()
        } else {
          finishTimes.value++
        }
      }
    }, breakTime)
  }

  function handleSetInterval() {
    if (interval) {
      console.log('interval', interval)
      return;
    } else {
      speedIdx = 0
    }
    _handleSetInterval()
  }

  watch(() => finishTimes, (val, oldVal) => {
    console.log(val, oldVal)
  })

  function setActiveKey() {
    if (activeKey.value === maxCount) {
      activeKey.value = 1;
    } else {
      activeKey.value += 1;
    }
  }

  return {
    activeKey,
    finishTimes,
    handleSetInterval,
  }

}
