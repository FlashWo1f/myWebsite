<template>
  <div class="wrap">
    <div class="sentence" 
      v-for="se in sentences" 
      :key="se.content"
      :style="{
        ...se.style,
        top: se.top + 'vh',
        left: se.left + 'vw',
      }"
    >
      {{ se.content }}
    </div>
  </div>
</template>

<script setup>
const sentences = [
  { 
    content: '接下来是职业生涯最重要的一步', 
    style: {
      fontSize: '2.2vw',
      // width: '30px',
      color: '#f8957c'
    },
    left: 5,
    top: 18
  },
  { 
    content: '有破釜沉舟的心，就放手去干，别让人看笑话', 
    style: {
      fontSize: '4vw',
    },
    left: 7,
    top: 4
  },
  { 
    content: '看再多快餐视频，都没有意义，耐心点啃知识、去整理，知识就是你的', 
    style: {
      fontSize: '1.8vw',
    },
    left: 7,
    top: 80
  },
  { 
    content: '耐心 耐心 还是 TMD 耐心', 
    style: {
      fontSize: '3.8vw',
      color: '#EB508B',
      transform: 'translate(-50%, -50%)'
    },
    left: 50,
    top: 50
  },
  { 
    content: '消除选择 减少内耗', 
    style: {
      fontSize: '3.8vw',
      color: '#5CA9FF',
    },
    left: 10,
    top: 60
  },
]
</script>

<style lang="less" scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  position: absolute;
  .sentence {
    position: absolute;
    line-height: 1.1;
  }
}
</style>