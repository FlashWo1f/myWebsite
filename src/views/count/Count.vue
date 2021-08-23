<template>
  <div class="count-bg">
    <div class="count-wrapper">
      <div class="count-text">
        {{ time }}
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import useCounter from './useCounter'
export default {
  setup(props) {
    const { time, setTime } = useCounter()
    let interval
    onMounted(() => {
      interval = setInterval(setTime, 1000)
    })

    onUnmounted(() => {
      clearInterval(interval)
      interval = null
    })
    
    return {
      time
    }
  }
}
</script>

<style lang='less' scoped>
.count-bg {
  width: 100vw;
  height: 100vh;
  background-color: #333;
  .count-text {
    color: #fff;
  }
}
</style>
