<template>
  <div class="workcard-container">
    <div class="wc-show">
      <div class="wc-show__title">预览区域{{ shape }}</div>
      <div class="wc-show__oneline">
        <div class="wc-show-context">
          <div class="wc-show-context__hole"></div>
          <div class="wc-show-context__logo"></div>
          <div class="wc-show-context__shape">
            <div
              class="wc-show-context__shape--item"
              :class="{
                circle: shape === 1,
                rect: shape === 2,
                polygon3: shape === 3,
                polygon5: shape === 5,
              }"
              :style="{
                backgroundColor: color,
                zIndex: 999,
                transform: `rotate(${rotate}deg) translateX(${translateX}px)`,
              }"
            >
              <img
                :style="{ transform: `rotate(-${rotate}deg)` }"
                src="../../assets/wc/3.png"
                alt=""
                id="previewContainer"
              />
            </div>
            <div
              v-for="item in shadow * 1"
              :key="item"
              class="wc-show-context__shape--item"
              :class="{
                circle: shape === 1,
                rect: shape === 2,
                polygon3: shape === 3,
                polygon5: shape === 5,
              }"
              :style="{
                backgroundColor: color,
                opacity: 1 - item * 0.3,
                zIndex: 30 - item,
                transform: `rotate(${rotate}deg) translateX(${
                  translateX - item * 32
                }px) scale(${1 - 0.1 * item})`,
              }"
            ></div>
          </div>
          <div class="wc-show-context__info">
            <div class="wc-show-context__info--name">
              {{ info.name }}
            </div>
            <div class="wc-show-context__info--position">
              {{ info.position }}
            </div>
            <div class="wc-show-context__info--slogan">MAPPING THE RIGHT</div>
          </div>
        </div>
        <div class="wc-show-info">
          <h2>输入你的信息</h2>
          <div class="wc-operate">
            <div class="wc-operate-item">
              <div class="wc-operate-item__label">姓名:</div>
              <div class="wc-operate-item__value">
                <a-input v-model:value="info.name" />
              </div>
            </div>
            <div class="wc-operate-item">
              <div class="wc-operate-item__label">职位:</div>
              <div class="wc-operate-item__value">
                <a-input v-model:value="info.position" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wc-operate df">
      <div class="wc-operate-item">
        <div class="wc-operate-item__label">形状:</div>
        <div class="wc-operate-item__value">
          <a-select
            style="width: 100px"
            v-model:value="shape"
            :options="shapeSelect"
          ></a-select>
        </div>
      </div>
      <div class="wc-operate-item">
        <div class="wc-operate-item__label">颜色:</div>
        <div class="wc-operate-item__value">
          <input type="color" v-model="color" />
          {{ color }}
        </div>
      </div>
      <div class="wc-operate-item">
        <div class="wc-operate-item__label">旋转角度:</div>
        <div class="wc-operate-item__value">
          <input type="range" min="0" max="360" v-model="rotate" />
          <input type="text" v-model="rotate" />
        </div>
      </div>
      <div class="wc-operate-item">
        <div class="wc-operate-item__label">重影:</div>
        <div class="wc-operate-item__value">
          <input type="range" :min="0" :max="5" v-model="shadow" />
          {{ shadow }}
        </div>
      </div>
    </div>
    <input type="file" accept="image/*" @change="loadFile" />
  </div>
</template>

<script>
import OptionList from 'ant-design-vue/lib/vc-select/OptionList'
import { reactive, toRefs, watch } from 'vue'
export default {
  setup(props) {
    // shape Map => 1. ⚪ 2. 矩形 3. 三角形 4. 五边形
    const option = reactive({
      color: '#6f00ff',
      shape: 1,
      shadow: 2,
      deg: 0,
      shapeSelect: [
        { label: '圆', value: 1 },
        { label: '矩形', value: 2 },
        { label: '三角形', value: 3 },
        { label: '五边形', value: 5 },
      ],
      info: {
        name: '钱老板',
        position: '创始人',
      },
    })

    const transform = reactive({
      rotate: 0,
      translateX: 0,
    })

    const transformMap = {
      1: {
        translateX: 45,
      },
      2: {
        translateX: 45,
      },
      3: {
        translateX: 0,
      },
      5: {
        rotate: 340,
        translateX: 55,
      },
    }

    watch(
      () => option.shape,
      val => {
        ;(transform.rotate = transformMap[val].rotate || 0),
          (transform.translateX = transformMap[val].translateX || 0)
      },
      {
        immediate: true,
      }
    )

    function loadFile(event) {
      const output = document.querySelector("#previewContainer");
      output.src = URL.createObjectURL(event.target.files[0])
    }

    return {
      loadFile,
      ...toRefs(option),
      ...toRefs(transform),
    }
  },
}
</script>

<style lang="less">
@import url('./shape.less');
.workcard-container {
  width: 70vw;
  margin: 0 auto;
  padding: 12px;
  padding-top: 60px;
  background: #ddd;
  .wc-show {
    // width: 30%;
    .wc-show__oneline {
      display: flex;
      padding: 0 40px;
      justify-content: space-between;
    }
    .wc-show-context {
      overflow: hidden;
      width: 300px;
      height: 500px;
      border-radius: 20px;
      background: #fff;
      position: relative;
      padding-top: 100px;
      .wc-show-context__hole {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ddd;
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
      }
      .wc-show-context__logo {
        width: 113.5px;
        height: 25px;
        background-image: url('@/assets/wc/1.png');
        background-size: contain;
        position: absolute;
        top: 28px;
        left: 20px;
      }
      .wc-show-context__shape {
        width: 300px;
        height: 300px;
        overflow: hidden;
        .wc-show-context__shape--item {
          overflow: hidden;
          position: absolute;
          right: 0;
          transform: translateX(45px);
          img {
            width: 100%;
          }
        }
      }
      .wc-show-context__info {
        position: absolute;
        bottom: 20px;
        left: 20px;
        color: #6f00ff;
        .wc-show-context__info--name {
          font-size: 18px;
          font-weight: bold;
        }
        .wc-show-context__info--position {
          font-size: 16px;
        }
        .wc-show-context__info--slogan {
          font-size: 16px;
        }
      }
    }
  }
}
.wc-operate {
  padding: 0 40px;
  justify-content: space-between;
}
.df {
  display: flex;
}
</style>
