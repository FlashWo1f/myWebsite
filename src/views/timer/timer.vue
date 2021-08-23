<template>
  <div class="home">
    <div class="time-left">
      <!-- 月 -->
      <div class="box-wrapper">
        <div
          class="circle-box"
          :style="boxStyle('months', deg.monthsDeg)"
          ref="months"
        >
          <span
            v-for="(item, index) in monthTexts"
            :key="item"
            :class="{ active: index === current.currentMonths - 1 }"
            :style="spanStyle(boxSize.months, monthTexts, index)"
            >{{ item }}</span
          >
          <i class="circle-dot"></i>
        </div>
      </div>
      <!-- 日 -->
      <div class="box-wrapper">
        <div
          class="circle-box"
          :style="boxStyle('days', deg.daysDeg)"
          ref="days"
        >
          <span
            v-for="(item, index) in dayTexts"
            :key="item"
            :class="{ active: index === current.currentDays - 1 }"
            :style="spanStyle(boxSize.days, dayTexts, index)"
            >{{ item }}</span
          >
        </div>
      </div>
      <!-- 小时 -->
      <div class="box-wrapper">
        <div
          class="circle-box"
          :style="boxStyle('hours', deg.hoursDeg)"
          ref="hours"
        >
          <span
            v-for="(item, index) in hourTexts"
            :key="item"
            :class="{ active: index === current.currentHours - 1 }"
            :style="spanStyle(boxSize.hours, hourTexts, index)"
            >{{ item }}</span
          >
        </div>
      </div>
      <!-- 分 -->
      <div class="box-wrapper">
        <div class="circle-box" :style="boxStyle('minutes', deg.minutesDeg)">
          <span
            v-for="(item, index) in minuteTexts"
            :key="item"
            :style="spanStyle(boxSize.minutes, minuteTexts, index)"
            :class="{ active: index === current.currentMinutes }"
            >{{ item }}</span
          >
        </div>
      </div>

      <!-- 秒 -->
      <div class="box-wrapper">
        <div class="circle-box" :style="boxStyle('seconds', deg.secondsDeg)">
          <span
            v-for="(item, index) in secondTexts"
            :key="item"
            :style="spanStyle(boxSize.seconds, secondTexts, index)"
            :class="{ active: index === current.currentSeconds }"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
    <div class="time-right">
      <div class="time-right-inner">
        <div class="right-inner__title">倒计时</div>
        <div class="right-inner__select">
          <a-select
            style="width: 150px; margin-right: 15px"
            @change="changeCountTime"
            :options="options"
          ></a-select>
          <a-button ghost @click="handleStartCount">开始</a-button>
        </div>
        <div class="right-inner__text">
          {{ countTimeStr }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useCountDown from "./useCountDown"
import useCircleTimer from "./useCircleTimer"
export default {
  setup(props) {
    const {
      secondTexts,
      boxSize,
      current,
      deg,
      hourTexts,
      dayTexts,
      monthTexts,
      minuteTexts,
      boxStyle,
      spanStyle,
    } = useCircleTimer()
    // useCountDown
    const {
      options,
      changeCountTime,
      countTimeStr,
      countTime,
      handleStartCount,
    } = useCountDown()

    return {
      secondTexts,
      boxSize,
      current,
      deg,
      hourTexts,
      dayTexts,
      monthTexts,
      minuteTexts,
      boxStyle,
      spanStyle,
      options,
      changeCountTime,
      countTimeStr,
      countTime,
      handleStartCount,
    }
  },
}
</script>

<style scoped lang="less">
@import "./timer.less";
</style>
