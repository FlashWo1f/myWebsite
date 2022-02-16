import { ref } from 'vue'
import { tryOnScopeDispose } from './tryOnScopeDispose'

export function useIntervalFn(cb = () => {}, interval = 1000, options = {}) {
  const {
    immediate = true,
    immediateCallback = true,
  } = options

  let timer = null
  const isActive = ref(false)

  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function pause() {
    isActive.value = false
    clean()
  }

  function resume() {
    if (interval <= 0) return
    isActive.value = true

    if (immediateCallback) cb()

    clean()

    timer = setInterval(cb, interval);
  }

  if (immediate) resume()

  tryOnScopeDispose(pause)

  return {
    pause,
    resume,
    isActive,
  }

}