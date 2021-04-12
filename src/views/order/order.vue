<template>
  <div class="order-container">
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
  </div>
</template>

<script>
import { reactive, createApp, ref } from "vue";
export default {
  setup(props) {
    const activeKey = ref(0);
    const cards = [
      { key: 1, name: "麻辣香锅" },
      { key: 2, name: "小酥肉" },
      { key: 3, name: "辣椒炒肉" },
      { key: 4, name: "麻辣香锅" },
      { key: 5, name: "麻辣香锅" },
      { key: 6, name: "麻辣香锅" },
      { key: 7, name: "麻辣香锅" },
      { key: 8, name: "麻辣香锅" },
      { key: 9, name: "麻辣香锅" },
      { key: 10, name: "麻辣香锅" },
      { key: 11, name: "麻辣香锅" },
      { key: 12, name: "麻辣香锅" },
      { key: 13, name: "麻辣香锅" },
      { key: 14, name: "麻辣香锅" },
      { key: 15, name: "麻辣香锅" },
      { key: 16, name: "麻辣香锅" },
    ];
    const cardPart1 = cards.slice(0, 5);
    const cardPart2 = cards.slice(5, 9);
    const cardPart3 = cards.slice(9, 13);
    const cardPart4 = cards.slice(13, 16);
    setInterval(() => {
      if (activeKey.value === cards.length) {
        activeKey.value = 1;
      } else {
        activeKey.value += 1;
      }
    }, 200);
    return {
      activeKey,
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