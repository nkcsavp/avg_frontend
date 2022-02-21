<template>
  <div class="sort-core-frame">
    <button disabled v-show="false" id="test-button" @click="JsonTest">Begin(Only for test)</button>
    <div class="display-area">
      <div>
        <canvas id="canvasarray"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted,onUnmounted } from "vue";
import {
  addBlock,
  emphasizeBlock,
  init,
  removeBlock,
  swapBlock
} from 'algomotion/type/array'

export default {
  name: 'sort-core',
  setup(context){
    const store = useStore();
    onMounted(()=>{
      document.getElementById('test-button').disabled = false;
      setTimeout(()=>{
        store.dispatch("Finished");
      },500)
    });
    onUnmounted(()=>{
      let styleSheets = document.getElementsByClassName("AnimationSheet");
      console.log(styleSheets)
      while(styleSheets.length !== 0){
        styleSheets[0].parentElement.removeChild(styleSheets[0]);
      }
    })
  },
  methods: {
    JsonTest() {
      let jsonObj = JSON.parse(`{"originData":[7,4,5,3,6,9,1,8],"operations":["get(0)","get(1)","swap(0,1)","get(1)","get(2)","swap(1,2)","get(2)","get(3)","swap(2,3)","get(3)","get(4)","swap(3,4)","get(4)","get(5)","get(5)","get(6)","swap(5,6)","get(6)","get(7)","swap(6,7)","get(0)","get(1)","get(1)","get(2)","swap(1,2)","get(2)","get(3)","get(3)","get(4)","get(4)","get(5)","swap(4,5)","get(5)","get(6)","get(0)","get(1)","swap(0,1)","get(1)","get(2)","get(2)","get(3)","get(3)","get(4)","swap(3,4)","get(4)","get(5)","get(0)","get(1)","get(1)","get(2)","get(2)","get(3)","swap(2,3)","get(3)","get(4)","get(0)","get(1)","get(1)","get(2)","swap(1,2)","get(2)","get(3)","get(0)","get(1)","swap(0,1)","get(1)","get(2)","get(0)","get(1)"]}
`);
      this.beginDisplay(jsonObj);
    },
    beginDisplay(obj) {
      let canvas = document.getElementById("canvasarray")
      let set = {
        hidpi: true,
        height: 250,
        width: 800,
        motion: true
      }
      let info = {
        'dta': obj.originData,
        'mvs': []
      }
      init(set, info, canvas)

      console.log(obj.operations)
      setTimeout(()=>{
        for (let i = 0; i < obj.operations.length; i++) {
          if(obj.operations[i].indexOf('get') === 0){
            let idx = parseInt(obj.operations[i].split('(')[1].split(')')[0]);
            console.log(idx)
            emphasizeBlock(idx,true)
            emphasizeBlock(idx,false)
          }else if(obj.operations[i].indexOf('swap') === 0){
            let idx1 = parseInt(obj.operations[i].split('(')[1].split(')')[0].split(',')[0])
            let idx2 = parseInt(obj.operations[i].split('(')[1].split(')')[0].split(',')[1])
            swapBlock(idx1,idx2)
          }else if(obj.operations[i].indexOf('remove') === 0){
            let idx = parseInt(obj.operations[i].split('(')[1].split(')')[0])
            removeBlock(idx)
          }else if(obj.operations[i].indexOf('add') === 0){
            let idx = parseInt(obj.operations[i].split('(')[1].split(')')[0].split(',')[0])
            let val = parseInt(obj.operations[i].split('(')[1].split(')')[0].split(',')[1])
            addBlock(idx,val)
          }
        }
      },1000)
    }
  }
}
</script>

<style>

.display-area {
  height: 200px;
  position: relative;
  margin: 10px;
  display: flex;
}
.sort-core-frame{
  padding: 40px;
  border: 1px solid var(--el-border-color-base);
  box-shadow:var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin: 40px;
}
</style>
