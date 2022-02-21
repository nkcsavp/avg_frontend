<template>
  <div>
    <div class="tree-core-frame">
      <div class="display-frame">
        <canvas id="canvastree"></canvas>
      </div>
    </div>
    <div class="slider-block">
      <span class="demonstration">Animation</span>
      <el-slider :disabled="disable" v-model="nowIndex" :max="max"  show-stops :show-tooltip="false" @change="changeAnimation"></el-slider>
    </div>
  </div>
</template>

<script>
import { ref,onMounted} from 'vue'
import { init, setPosition } from 'algomotion/type/tree'
import store from "../../../store";

export default {
  setup(){
    const disable = ref(false)
    const nowIndex = ref(0)
    const max = ref(0)
    onMounted(()=>{
      setTimeout(function () {
        store.dispatch("Finished");
      },500);
    })

    // onBeforeRouteUpdate((to,from)=>{
    //   if(to.path.indexOf('tree') !== -1){
    //     destroy()
    //   }
    // })

    const run = function (mvs,dta) {
      max.value = mvs.length
      for(let i = 0;i < dta.length;i++){
        if(dta[i] === 'x'){
          dta[i] = undefined
        }
        else{
          dta[i] = parseInt(dta[i])
        }
      }
      console.log(mvs)
      console.log(dta)
      const canvas = document.getElementById("canvastree")
      const set = {
        hidpi: true,
        height: 250,
        width: 800,
        motion: true
      }
      const info = {
        'dta': dta,
        'mvs': mvs
      }
      init(set, info, canvas)
    }

    const changeAnimation = function (idx) {
      console.log(idx)
      setPosition(idx)
    }

    return{
      disable,
      run,
      changeAnimation,
      nowIndex,
      max
    }
  }
}
</script>

<style scoped>
.display-frame{
  float: left;
  width: 1000px;
  height: 350px;
  user-select: none;
}
.el-row{
  position: static;
}
.tree-core-frame{
  padding: 40px;
  border: 1px solid var(--el-border-color-base);
  box-shadow:var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin: 40px;
  height: 300px;
}
.slider-block{
  padding: 40px;
  border: 1px solid var(--el-border-color-base);
  box-shadow:var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin: 40px;
}
</style>
