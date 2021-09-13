<template>
  <div class="light-container">
    <div class="title">{{tip}}{{count}}</div>
    <div class="light-box">
      <div class="light__item" :class='{ red: count % 23 < 10}'>阿伦</div>
      <div class="light__item" :class='{ green: (count % 23 > 9) && (count % 23 < 18)}'>你没</div>
      <div class="light__item" :class='{ yellow: count % 23 > 17}'>事了</div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'
export default {
  setup(props) {
    let count = ref(0)
    let interval = null
    function addCount() {
      count.value ++
    }
    const tip = computed(() => {
      if (count.value % 23 < 10) {
        return '稍微等一哈'
      } else if ((count.value % 23 > 9) && (count.value % 23 < 18)) {
        return '逮虾户'
      } else {
        return 'slow down'
      }
    })
    onMounted(() => {
      interval = setInterval(addCount, 1000)
    })
    onUnmounted(() => {
      clearInterval(interval)
      interval = null
    })
    return {
      count,
      tip,
    }
  }
}
</script>

<style lang='less' scoped>
.light-container {
  width: 100vw;
  .title {
    font-size: 64px;
    text-align: center;
    margin-bottom: 32px;
  }
  .light-box {
    display: flex;
    width: 600px;
    justify-content: space-between;
    margin: 0 auto;
    .light__item {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      font-size: 32px;
      color: #fff;
      border-radius: 50%;
      background: grey;
    }
  }
  .red {
    background: red !important;
  }
  .green {
    background: green !important;
  }
  .yellow {
    background: orange !important;
  }
}
</style>