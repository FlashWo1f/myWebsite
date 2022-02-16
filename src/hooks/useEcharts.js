import { useTimeoutFn } from '@/hooks/useTimeout'
import { tryOnUnmounted, useDebounceFn } from '@vueuse/core'
import { unref, nextTick, watch, computed, ref } from 'vue'
import { useEventListener } from '@/hooks/event/useEventListener'
import { useBreakpoint } from '@/hooks/event/useBreakpoint'
import echarts from '@/plugins/echarts'

export function useECharts(elRef, theme) {
  const getDarkMode = computed(() => {
    return 'default'
  })
  let chartInstance = null
  let resizeFn = resize
  const cacheOptions = ref({})
  let removeResizeFn = () => {}

  resizeFn = useDebounceFn(resize, 200)

  const getOptions = computed(() => {
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    }
  })

  function initCharts(t = theme) {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }

    chartInstance = echarts.init(el, 'dark')
    // console.log(chartInstance)
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    })
    removeResizeFn = removeEvent
    const { widthRef, screenEnum } = useBreakpoint()
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options, clear = true) {
    cacheOptions.value = options
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions))
      }, 30)
      return
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts(getDarkMode.value)

          if (!chartInstance) return
        }
        clear && chartInstance?.clear()

        chartInstance?.setOption(unref(getOptions))
      }, 30)
    })
  }

  function resize() {
    chartInstance?.resize()
  }

  watch(
    () => getDarkMode.value,
    theme => {
      if (chartInstance) {
        chartInstance.dispose()
        initCharts(theme)
        setOptions(cacheOptions.value)
      }
    }
  )

  tryOnUnmounted(() => {
    if (!chartInstance) return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  function getInstance() {
    if (!chartInstance) {
      initCharts(getDarkMode.value)
    }
    return chartInstance
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  }
}
