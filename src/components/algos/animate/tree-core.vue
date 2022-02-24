<template>
  <el-row :align="'middle'" :gutter="15">
    <el-col :lg="enableInfo?18:24" :md="enableInfo?18:24" :sm="24" :xl="enableInfo?18:24" :xs="24">
      <div class="array-core-frame">
        <el-tooltip content="动画展示区域" placement="top">
          <span>Animation<help :strokeWidth="4" fill="#000000" size="16" strokeLinecap="butt" strokeLinejoin="miter"
                               theme="outline"/></span>
        </el-tooltip>
        <canvas ref="canvas"></canvas>
      </div>
    </el-col>
    <el-col v-if="enableInfo" :lg="6" :md="6" :sm="24" :xl="6" :xs="24">
      <div class="array-info-frame">
        <el-tooltip content="信息展示区域" placement="top">
          <span>Info<help :strokeWidth="4" fill="#000000" size="16" strokeLinecap="butt" strokeLinejoin="miter"
                          theme="outline"/></span>
        </el-tooltip>
        <div style="height: 255px">
          <el-scrollbar ref="scrollbar" native style="padding-top: 10px" @scroll="scroll">
            <div>
              <p v-for="(item,idx) in infos" :key="item"
                 :class="{'list-item':true,'list-item-emphasized':nowPosition === idx}">
                {{ item }}
              </p>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row :align="'middle'" :gutter="15">
    <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
      <div class="slider-block">
        <el-row :align="'middle'" :gutter="15">
          <el-col :lg="2" :md="2" :sm="12" :xl="2" :xs="12">
            <el-tooltip content="通过按钮进行逐帧移动、暂停/继续；通过调整进度条来指定动画位置" placement="top">
              <span>Control<help :strokeWidth="4" fill="#000000" size="16" strokeLinecap="butt" strokeLinejoin="miter"
                                 theme="outline"/></span>
            </el-tooltip>
          </el-col>
          <el-col :lg="2" :md="2" :sm="12" :xl="2" :xs="12">
            <el-button-group class="ml-4">
              <el-button type="primary" @click="pauseWrapper">
                <right v-if="paused" fill="#ffffff" size="24" theme="outline"/>
                <pause v-else fill="#ffffff" size="24" theme="outline"/>
              </el-button>
            </el-button-group>
          </el-col>
          <el-col :lg="20" :md="20" :sm="24" :xl="20" :xs="24">
            <el-slider v-model="nowPosition" :disabled="false" :max="max - 1" :min="0" :show-tooltip="false" show-stops
                       @change="changePosition(nowPosition)"></el-slider>
          </el-col>

        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {onMounted, onUnmounted, ref, watch} from "vue";
import {destroy, init, pause, setPosition} from 'algomotion/type/tree'
import {Help, Pause, Right} from "@icon-park/vue-next";
import {ElNotification} from "element-plus";

export default {
  name: 'tree-core',
  props: {
    mvs: Array,
    dta: Array,
    infos: Array,
    enableInfo: Boolean
  },
  components: {
    Pause,
    Right,
    Help
  },
  setup(props) {
    let canvas = ref();
    let scrollbar = ref();
    let nowPosition = ref(0);
    let max = props.mvs.length;
    let paused = ref(false);
    let infos = props.infos;
    let enableInfo = props.enableInfo;
    onMounted(() => {
      let set = {
        hidpi: true,
        height: 250,
        width: document.querySelector("canvas").offsetWidth,
        motion: true,
        emphasisColor: '#66b1ff',
        emphasisTextColor: "#c6e2ff",
        textColor: '#409eff',
        fillColor: '#b3d8ff',
        position: [nowPosition],
        speed: 0.5
      }
      let info = {
        'dta': props.dta.concat(),
        'mvs': props.mvs
      }
      init(set, info, canvas.value)
      pause(paused.value)
      if (enableInfo) {
        watch(nowPosition, (now, past) => {
          scrollbar.value.setScrollTop((now - 1) * 87)
        })
      }
    })
    onUnmounted(() => {
      destroy()
    })

    const changePosition = () => {
      if(isNaN(nowPosition.value)) {
        ElNotification({
          title: 'Error',
          message: "该动画仅有一个动作",
          type: 'error',
        })
      }
      setPosition(nowPosition.value)
    }
    const pauseWrapper = () => {
      paused.value = !paused.value
      pause(paused.value)
    }
    return {
      canvas,
      scrollbar,
      nowPosition,
      max,
      paused,
      infos,
      enableInfo,
      changePosition,
      pauseWrapper
    }
  }
}
</script>

<style>
.array-core-frame {
  padding: 20px;
  border: 1px solid var(--el-border-color-base);
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin-top: 30px;
}

.array-info-frame {
  padding: 20px;
  border: 1px solid var(--el-border-color-base);
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin-top: 30px;
}

.slider-block {
  padding: 30px;
  border: 1px solid var(--el-border-color-base);
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin-top: 30px;
}

.el-button {
  padding: 6px 12px;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
  border: 1px solid var(--el-border-color-base);
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
}

.list-item-emphasized {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  background: var(--el-color-primary-light-2);
  margin: 10px;
  color: var(--el-color-white);
  border: 1px solid var(--el-border-color-base);
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
}

canvas {
  display: block;
  width: 100% !important;
}
</style>
