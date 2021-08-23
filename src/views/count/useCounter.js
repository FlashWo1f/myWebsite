import { ref, watch } from 'vue'
import { getServerTime } from '@/utils/util'

export default function useCounter() {
  const time = ref(getServerTime())
  function setTime() {
    time.value += 1000
  }
  return {
    time,
    setTime,
  }
}


