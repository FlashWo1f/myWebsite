<template>
  <div class="home-container">
    <div class="nav" :class="{ checked }">
      <div class="nav__content">
        <div class="nav__items">
          <div
            class="nav__item pointer"
            v-for="it in menu"
            :key="it.url"
            @click="$router.push(it.url)"
          >
            <span class="nav__item-text">
              {{ it.name }}
            </span>
          </div>
        </div>
      </div>
      {{ checked }}
      <div class="nav__btn pointer" @click="checked = !checked"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  setup(props) {
    const menu = [
      { name: "吃什么", url: "/order" },
      { name: "时间罗盘", url: "/timer" },
      { name: "todo", url: "/todo" },
    ]
    let checked = ref(false)
    return {
      menu,
      checked,
    }
  },
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100vw;
  height: 100vh;
  // background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  position: relative;
  .nav {
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    width: auto;
    height: 90px;
    background: #fff;
    border-radius: 5px;
    transform: translate3d(-50%, -50%, 0);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);
    .nav__content {
      position: relative;
      width: 90px;
      height: 100%;
      transition: width 1s cubic-bezier(0.49, -0.3, 0.68, 1.23);
      .nav__items {
        position: relative;
        width: 410px;
        height: 100%;
        padding-left: 20px;
        padding-right: 110px;
        list-style-type: none;
        font-size: 0;
        .nav__item {
          display: inline-block;
          vertical-align: top;
          width: 70px;
          text-align: center;
          color: #6c7784;
          font-size: 14px;
          line-height: 90px;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: bold;
          perspective: 1000px;
          transition: color 0.3s;
          cursor: pointer;
        }
        .nav__item:hover {
          color: #00bdea;
        }
        .nav__item-text {
          opacity: 0;
          transition: opacity 0.7s,
            -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
          transition: transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5),
            opacity 0.7s;
          transition: transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5),
            opacity 0.7s,
            -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
        }
        .nav__item:nth-child(1) .nav__item-text {
          transition-delay: 0.3s;
        }
        .nav__item:nth-child(2) .nav__item-text {
          transition-delay: 0.2s;
        }
        .nav__item:nth-child(3) .nav__item-text {
          transition-delay: 0.1s;
        }
        .nav__item:nth-child(4) .nav__item-text {
          transition-delay: 0s;
        }
      }
    }
    .nav__btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 90px;
      height: 90px;
      padding: 36px 31px;
      cursor: pointer;
    }
    .nav__btn:before,
    .nav__btn:after {
      content: "";
      display: block;
      width: 28px;
      height: 4px;
      border-radius: 2px;
      background: #096dd3;
      transform-origin: 50% 50%;
      transition: background-color 0.3s,
        -webkit-transform 1s cubic-bezier(0.48, 0.43, 0.29, 1.3);
      transition: transform 1s cubic-bezier(0.48, 0.43, 0.29, 1.3),
        background-color 0.3s;
      transition: transform 1s cubic-bezier(0.48, 0.43, 0.29, 1.3),
        background-color 0.3s,
        -webkit-transform 1s cubic-bezier(0.48, 0.43, 0.29, 1.3);
    }
    .nav__btn:before {
      margin-bottom: 10px;
    }
    .nav__btn:hover:before,
    .nav__btn:hover:after {
      background: #00bdea;
    }
  }
  .checked {
    .nav__content {
      -webkit-transition: width 1s cubic-bezier(0.48, 0.43, 0.29, 1.3);
      transition: width 1s cubic-bezier(0.48, 0.43, 0.29, 1.3);
      width: 410px;
      .nav__item-text {
        transform: rotateY(0);
        opacity: 1 !important;
        transition: opacity 0.2s,
          -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
        transition: transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5),
          opacity 0.2s;
        transition: transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5),
          opacity 0.2s,
          -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
      }
      .nav__item:nth-child(1) .nav__item-text {
        transition-delay: 0s;
      }
      .nav__item:nth-child(2) .nav__item-text {
        transition-delay: 0.1s;
      }
      .nav__item:nth-child(3) .nav__item-text {
        transition-delay: 0.2s;
      }
      .nav__item:nth-child(4) .nav__item-text {
        transition-delay: 0.3s;
      }
    }
    .nav__btn:before {
      transform: translateY(7px) rotate(-225deg);
    }
    .nav__btn:after {
      transform: translateY(-7px) rotate(225deg);
    }
  }
}
</style>
