<template>
  <div class="container">
    <div class="header">
      魔仙堡 （毛胚房）
    </div>
    <div class="mid-img">
      <div class='img-item'>
        <img src="../assets/1.jpg" alt="">
      </div>
      <div class='img-item'>
        <img src="../assets/2.jpg" alt="">
      </div>
      <div class='img-item'>
        <img src="../assets/3.jpg" alt="">
      </div>
      <div class='img-item'>
        <img src="../assets/4.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
@keyframes hh {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(1300px);
  }
}
.header {
  color: #42b983;
  font-size: 24px;
  text-align: center;
  margin-bottom: 40px;
}
.mid-img {
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.mid-img .img-item {
  width: 20%;
  animation: hh 3s ease-in-out;
}

.mid-img .img-item img {
  width: 100%;
}

</style>