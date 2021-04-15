<template>
  <div class="order-container">
    <div class="order-title">
      今天吃什么 小阿伟不要再问我
    </div>
    <div class="turntable">
      <div class="turn line1">
        <div
          class="card"
          :class="{ active: cd.key === activeKey }"
          v-for="cd in cardPart1"
          :key="cd.key"
        >
          {{ cd.name }} line1
        </div>
      </div>
      <div class="turn line2">
        <div
          class="card"
          :class="{ active: cd.key === activeKey }"
          v-for="cd in cardPart2"
          :key="cd.key"
        >
          {{ cd.name }} line2
        </div>
      </div>
      <div class="turn line3">
        <div
          class="card"
          :class="{ active: cd.key === activeKey }"
          v-for="cd in cardPart3"
          :key="cd.key"
        >
          {{ cd.name }} line3
        </div>
      </div>
      <div class="turn line4">
        <div
          class="card"
          :class="{ active: cd.key === activeKey }"
          v-for="cd in cardPart4"
          :key="cd.key"
        >
          {{ cd.name }} line4
        </div>
      </div>
    </div>
    <div class="order-btn-wrapper">
      <a-button type='primary' @click='handleSetInterval'>点我随机</a-button>
    </div>
    <!-- test Github Action -->
  </div>
</template>

<script>
import { reactive, createApp, ref, watch } from "vue";
import useActiveKey from './useActiveKey'
import { dishMenu } from '@/utils/const'
export default {
  setup(props) {
    // const activeKey = ref(0);
    const cards = dishMenu;
    const cardPart1 = cards.slice(0, 5);
    const cardPart2 = cards.slice(5, 9);
    const cardPart3 = cards.slice(9, 13);
    const cardPart4 = cards.slice(13, 16);
    const { activeKey, finishTimes, handleSetInterval } = useActiveKey(cards.length)

    // watch(() => finishTimes, (val, oldVal) => {
    //   console.log(val, oldVal)
    // })

    return {
      activeKey,
      handleSetInterval,
      cardPart1,
      cardPart2,
      cardPart3,
      cardPart4,
    };
  },
};
</script>

<style scoped lang='less'>
@import "./order.less";
</style>