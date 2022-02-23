<template>
  <el-row :gutter="15" :align="'middle'">
    <el-col :xs="24" :sm="24" :md="enableInfo?18:24" :lg="enableInfo?18:24" :xl="enableInfo?18:24">
      <div class="array-core-frame">
        <el-tooltip content="动画展示区域" placement="top">
          <span>Animation<help theme="outline" size="16" fill="#000000" :strokeWidth="4" strokeLinejoin="miter" strokeLinecap="butt"/></span>
        </el-tooltip>
        <canvas ref="canvas"></canvas>
      </div>
    </el-col>
    <el-col v-if="enableInfo" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
      <div class="array-info-frame">
        <el-tooltip content="信息展示区域" placement="top">
          <span>Info<help theme="outline" size="16" fill="#000000" :strokeWidth="4" strokeLinejoin="miter" strokeLinecap="butt"/></span>
        </el-tooltip>
        <div style="height: 255px">
          <el-scrollbar style="padding-top: 10px" ref="scrollbar" native @scroll="scroll">
            <div>
              <p v-for="(item,idx) in infos" :key="item" :class="{'list-item':true,'list-item-emphasized':nowPosition === idx}">
                {{ item }}
              </p>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="15" :align="'middle'">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="slider-block">
      <el-row :gutter="15" :align="'middle'">
        <el-col :xs="12" :sm="12" :md="2" :lg="2" :xl="2">
          <el-tooltip content="通过按钮进行逐帧移动、暂停/继续；通过调整进度条来指定动画位置" placement="top">
            <span>Control<help theme="outline" size="16" fill="#000000" :strokeWidth="4" strokeLinejoin="miter" strokeLinecap="butt"/></span>
          </el-tooltip>
        </el-col>
        <el-col :xs="12" :sm="12" :md="2" :lg="2" :xl="2">
          <el-button-group class="ml-4">
            <el-button type="primary" @click="pauseWrapper">
              <right v-if="paused" theme="outline" size="24" fill="#ffffff"/>
              <pause v-else theme="outline" size="24" fill="#ffffff"/>
            </el-button>
          </el-button-group>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <el-slider :disabled="false" v-model="nowPosition" :min="0" :max="max - 1"  show-stops :show-tooltip="false" @change="changePosition(nowPosition)"></el-slider>
        </el-col>
      </el-row>
    </div>
    </el-col>
  </el-row>
</template>

<script>
import {onMounted, onUnmounted, ref, watch} from "vue";
import {init,destroy,setPosition,pause} from 'algomotion/type/array'
import {Pause, Right, Help} from "@icon-park/vue-next";

export default {
  name: 'array-core',
  props: {
    mvs: Array,
    dta: Array,
    infos: Array,
    enableInfo: Boolean
  },
  components:{
    Pause,
    Right,
    Help
  },
  setup(props){
    let canvas = ref();
    let scrollbar = ref();
    let nowPosition = ref(0);
    let max = props.mvs.length;
    let paused = ref(true);
    let enableInfo = props.enableInfo;
    let infos = props.infos;
    onMounted(()=>{
      let set = {
        hidpi: true,
        height: 250,
        width: document.querySelector("canvas").offsetWidth,
        motion: true,
        emphasisColor: '#66b1ff',
        emphasisTextColor: "#fff",
        textColor: '#409eff',
        fillColor: '#b3d8ff',
        position: [nowPosition]
      }
      let info = {
        'dta': props.dta,
        'mvs': props.mvs
      }
      init(set, info, canvas.value)
      pause(true)
      if(enableInfo) {
        watch(nowPosition, (now, past) => {
          scrollbar.value.setScrollTop((now - 1) * 87)
        })
      }
    })
    onUnmounted(()=>{
      destroy()
    })

    const changePosition = ()=>{
      setPosition(nowPosition.value)
    }
    const pauseWrapper = ()=>{
      paused.value = ! paused.value
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
.array-core-frame{
  padding: 20px;
  border: 1px solid var(--el-border-color-base);
  box-shadow:var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin-top: 30px;
}
.array-info-frame{
  padding: 20px;
  border: 1px solid var(--el-border-color-base);
  box-shadow:var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin-top: 30px;
}
.slider-block{
  padding: 30px;
  border: 1px solid var(--el-border-color-base);
  box-shadow:var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin-top: 30px;
}
.el-button{
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
canvas{
  display: block;
  width: 100% !important;
}
</style>
