<template>
  <div class="weight-container">
    <div class="weight-title">李某的体重</div>
    <div ref="weightWrapperRef" class="weight-wrapper"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useECharts } from "@/hooks/useEcharts";

const weightWrapperRef = ref();
const { setOptions } = useECharts(weightWrapperRef);
const weightMap = {
  "2-16": 149, // done
  "2-17": 148, // done
  "2-18": 149, // done
  "2-19": 150, // done
  "2-20": 149, // done
  "2-21": 149, // done
  "5-8": 146, // done
};
setOptions({
  xAxis: {
    type: "category",
    data: Object.keys(weightMap),
  },
  yAxis: {
    type: "value",
    min: 135,
    max: 165,
  },
  label: {
    show: true
  },
  series: [
    {
      data: Object.values(weightMap),
      type: "line",
    },
  ],
});
</script>

<style lang="less">
.weight-container {
  justify-content: center;
  .weight-title {
    text-align: center;
    font-size: 32px;
  }
  .weight-wrapper {
    margin: 0 auto;
    width: 80vw;
    height: 80vh;
  }
}
</style>