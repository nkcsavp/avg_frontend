<script>
import $ from 'jquery'
import 'jquery-color'
import { reactive,ref } from 'vue'
import {ElRow, ElCol} from "element-plus";
import {ElCard} from "element-plus";
import {onMounted} from "vue";
import store from "../../../store";
export default {
  setup(){
    let keyframes = []
    let save = null
    let stop = false
    let len = 0;
    let disable = ref(true)
    let data = reactive(['x','1','x','2','x','x','3','4','x','x','x','x','x','x','x','x'])

    let nowIndex = ref(0)
    let max = ref(100)

    let nodeClasses = reactive(["hide-node","hide-node","hide-node","hide-node","hide-node","hide-node","hide-node","hide-node","hide-node","hide-node","hide-node","hide-node","hide-node","hide-node","hide-node","hide-node"])



    onMounted(()=>{
      setTimeout(function () {
        store.dispatch("Finished");
      },500);

      setTimeout(()=>{
        draw();
      },1000)
    })


    const run = function (animation,startIndex = 0) {
      setTimeout(()=>{
        disable.value = false;
        save = animation
        max.value = animation.length
        console.log(data)
        processKeyFrames(animation, data.map((item)=>item))
        draw()
        animate(animation,startIndex)
      },500)

    }

    const setData = function (originData) {
      for(let i = 0; i < data.length; i++){
        data[i] = 'x';
      }
      for(let i = 1; i <= originData.length; i++){
          data[i] = originData[i - 1]
      }
    }

    const changeAnimation = function (idx) {
      len++
      for(let i = 0; i < data.length; i++){
        data[i] = keyframes[idx]['now'][i]
      }
      draw()
      animate(save,idx,len)
    }

    const processKeyFrames = function (animation, status) {
      keyframes.push({
        now:status.map((item)=>item),
        nextOP:0
      })
      for(let i = 0; i < animation.length; i++){
        let op = animation[i].match(/([a-z]+)\(([\d,]+)\)/)
        let argu = op[2].split(',')
        if(op[1] === "swap"){
          let mid = status[Number(argu[0])];
          status[Number(argu[0])] = status[Number(argu[1])];
          status[Number(argu[1])] = mid;
        }
        else if(op[1] === "insert"){
          status[Number(argu[0])] = argu[1];
        }
        else if(op[1] === "remove"){
          status[Number(argu[0])] = 'x'
        }
        else if(op[1] === "get") {}
        keyframes.push({
          now:status.map((item)=>item),
          nextOP:i+1
        })
      }
    }

    const animate = function(animation, startIndex, pid = -1){
      let interval = 0
      if(!stop) {
        stop = true
        interval = 2000
      }
      setTimeout(function (){
        if(pid !== -1 && len !== pid){
          return;
        }
        stop = false
        let idx = startIndex
        const id = setInterval(function () {
          if(idx === animation.length || stop){
            clearInterval(id)
            stop = false
            return
          }
          nowIndex.value = idx
          let op = animation[idx].match(/([a-z]+)\(([\d,]+)\)/)
          let argu = op[2].split(',').map(Number)
          if(op[1] === "swap"){
            swap(Number(argu[0]),Number(argu[1]))
          }
          else if(op[1] === "insert"){
            insert(Number(argu[0]),Number(argu[1]))
          }
          else if(op[1] === "remove"){
            remove(Number(argu[0]))
          }
          else if(op[1] === "get"){
            get(Number(argu[0]))
          }
          idx = idx + 1

        },1500)
      },interval)
    }

    const drawLine = function (from, to, line){
      let fT = from.offsetTop  + from.offsetHeight/2
      let tT = to.offsetTop    + to.offsetHeight/2
      let fL = from.offsetLeft + from.offsetWidth/2
      let tL = to.offsetLeft   + to.offsetWidth/2

      let CA   = Math.abs(tT - fT)
      let CO   = Math.abs(tL - fL)
      let H    = Math.sqrt(CA*CA + CO*CO)
      let ANG  = 180 / Math.PI * Math.acos( CA/H )

      let top = 0
      let left = 0

      if(tT > fT){
        top  = (tT-fT)/2 + fT
      }else{
        top  = (fT-tT)/2 + tT
      }
      if(tL > fL){
        left = (tL-fL)/2 + fL
      }else{
        left = (fL-tL)/2 + tL
      }

      if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
        ANG *= -1
      }
      top -= H / 2

      line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)'
      line.style["-moz-transform"] = 'rotate('+ ANG +'deg)'
      line.style["-ms-transform"] = 'rotate('+ ANG +'deg)'
      line.style["-o-transform"] = 'rotate('+ ANG +'deg)'
      line.style["-transform"] = 'rotate('+ ANG +'deg)'
      line.style.top    = top+'px'
      line.style.left   = left+'px'
      line.style.height = H + 'px'
    }

    const draw = function () {
      for(let i = 1; i < data.length; i++){
        if(data[i] === 'x'){
          nodeClasses[i] = "hide-node";
        }
        else{
          nodeClasses[i] = "active-node";
        }
      }
      let nodes = [1,2,3,4,5,6,7]
      nodes.map((num)=>{
        let son1 = num * 2
        let son2 = num * 2 + 1
        drawLine(document.getElementById("node" + num),document.getElementById("node" + son1),document.getElementById("line-" + num + "-" + son1))
        if ( data[son1] === 'x' || son1 >= data.length ) $("#line-" + num + "-" + son1).hide()
        else $("#line-" + num + "-" + son1).show()
        drawLine(document.getElementById("node" + num),document.getElementById("node" + son2),document.getElementById("line-" + num + "-" + son2))
        if ( data[son2] === 'x' || son2 >= data.length) $("#line-" + num + "-" + son2).hide()
        else $("#line-" + num + "-" + son2).show()
      })
    }

    const swap = function (id1,id2) {
      if(id1 > id2){
        let mid = id1;
        id1 = id2;
        id2 = mid;
      }

      let node1 = $("#ID1");
      let node2 = $("#ID2");
      let pos1 = $("#node" + id1).offset();
      let pos2 = $("#node" + id2).offset();
      let line = $("#line-" + id1 + '-' + id2);

      node1.text(data[id1])
      node2.text(data[id2])

      node1.fadeIn(350);
      node2.fadeIn(350);

      node1.offset(pos1);
      node2.offset(pos2);

      line.animate({
        width:'6px',
        backgroundColor:'red',
      },350,function () {

        let mid = data[id1];
        data[id1] = data[id2];
        data[id2] = mid;

        nodeClasses[id1] = "hide-node";
        nodeClasses[id2] = "hide-node";

        node1.animate(pos2,'slow','swing');
        node2.animate(pos1,'slow','swing',function () {
          nodeClasses[id1] = "active-node";
          nodeClasses[id2] = "active-node";
          node1.fadeOut(350);
          node2.fadeOut(350);
          line.animate({
            width:'4px',
            backgroundColor:'black'
          },350)
        })
      })

    }

    const insert = function (id, value) {
      let pos = $("#node" + id).offset()
      let animateNode = $("#ID1")
      let fid = Math.floor(id/2)
      let animateLine = $("#line-" + fid + "-" + id)

      animateNode.text(value)

      animateLine.css('background-color','red')
      animateLine.css('width','6px')

      animateLine.fadeIn(350)
      animateNode.fadeIn(350,function () {
        nodeClasses[id] = "active-node"
        data[id] = value
        animateNode.fadeOut(350)
        animateLine.animate({
          width:'4px',
          backgroundColor:'black'
        },350)
      })
      animateNode.offset(pos)

    }

    const remove = function (id) {
      let pos = $("#node" + id).offset()
      let animateNode = $("#ID1")
      let fid = Math.floor(id/2);
      let animateLine = $("#line-" + fid + "-" + id)

      animateNode.text(data[id])

      animateLine.animate({
        width:'6px',
        backgroundColor:'red'
      },350)
      animateNode.fadeIn(350,function () {
        nodeClasses[id] = "hide-node"
        data[id] = 'x'
        animateNode.fadeOut(350)
        animateLine.fadeOut(350)
      })
      animateNode.offset(pos)

    }

    const get = function (id) {
      let pos = $("#node" + id).offset()
      let animateNode = $("#ID1")

      animateNode.text(data[id])

      animateNode.fadeIn(650,function () {
        nodeClasses[id] = "active-node"
        animateNode.fadeOut(650)
      })
      animateNode.offset(pos)
    }

    return{
      nodeClasses,
      data,
      disable,
      swap,
      insert,
      remove,
      run,
      setData,
      changeAnimation,
      nowIndex,
      max
    }
  },
  components:{
    ElCard,
    ElRow,
    ElCol
  },
  methods:{

  }
}
</script>

<template>
  <div>
    <div class="tree-core-frame">
      <!--    <button @click="swap(1,2)">SWAP-TEST</button>-->
      <!--    <button @click="insert(6,'NEW')">INSERT-TEST</button>-->
      <!--    <button @click="remove(6)">REMOVE-TEST</button>-->
      <!--    <button @click="build(1,2)">JSON-TEST</button>-->
      <div class="display-frame">
        <div v-for="i in [1,2,3,4,5,6,7]" :id=" 'line-' + i + '-' + (2 * i)" class="active-lines"></div>
        <div v-for="i in [1,2,3,4,5,6,7]" :id=" 'line-' + i + '-' + (2 * i + 1)" class="active-lines"></div>
        <div id="ID1" class="emphasize-node"> ID1 </div>
        <div id="ID2" class="emphasize-node"> ID2 </div>
        <el-row>
          <el-col :span="24"><div id="node1" :class="nodeClasses[1]">{{ data[1] }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div id="node2" :class="nodeClasses[2]">{{ data[2] }}</div></el-col>
          <el-col :span="12"><div id="node3" :class="nodeClasses[3]">{{ data[3] }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div id="node4" :class="nodeClasses[4]">{{ data[4] }}</div></el-col>
          <el-col :span="6"><div id="node5" :class="nodeClasses[5]">{{ data[5] }}</div></el-col>
          <el-col :span="6"><div id="node6" :class="nodeClasses[6]">{{ data[6] }}</div></el-col>
          <el-col :span="6"><div id="node7" :class="nodeClasses[7]">{{ data[7] }}</div></el-col>

        </el-row>
        <el-row>
          <el-col :span="3"><div id="node8" :class="nodeClasses[8]">{{ data[8] }}</div></el-col>
          <el-col :span="3"><div id="node9" :class="nodeClasses[9]">{{ data[9] }}</div></el-col>
          <el-col :span="3"><div id="node10" :class="nodeClasses[10]">{{ data[10] }}</div></el-col>
          <el-col :span="3"><div id="node11" :class="nodeClasses[11]">{{ data[11] }}</div></el-col>
          <el-col :span="3"><div id="node12" :class="nodeClasses[12]">{{ data[12] }}</div></el-col>
          <el-col :span="3"><div id="node13" :class="nodeClasses[13]">{{ data[13] }}</div></el-col>
          <el-col :span="3"><div id="node14" :class="nodeClasses[14]">{{ data[14] }}</div></el-col>
          <el-col :span="3"><div id="node15" :class="nodeClasses[15]">{{ data[15] }}</div></el-col>
        </el-row>
      </div>

    </div>
    <div class="slider-block">
      <span class="demonstration">Animation</span>
      <el-slider :disabled="disable" v-model="nowIndex" :min="0" :max="max - 1"  show-stops :show-tooltip="false" @change="changeAnimation(nowIndex)"></el-slider>
    </div>
  </div>
</template>

<style scoped>
.display-frame{
  float: left;
  width: 1000px;
  height: 350px;
  user-select: none;
}
.hide-node{
  width: 40px;
  height: 40px;
  border-radius: 23px;
  background-color: #fff;
  margin: 0 auto;
  border: 3px solid white !important;
  line-height: 40px;
  position: relative;
  color: white !important;
  text-align: center;
}
.active-node{
  width: 40px;
  height: 40px;
  border-radius: 23px;
  background-color: #fff;
  margin: 0 auto;
  border: 3px solid black;
  line-height: 40px;
  position: relative;
  text-align: center;
}
.emphasize-node{
  width: 40px;
  height: 40px;
  border-radius: 23px;
  background-color: cyan;
  margin: 0 auto;
  border: 3px solid blue;
  line-height: 40px;
  float: left;
  color: blue;
  position:absolute;
  z-index: 999;
  display: none;
  text-align: center;
}
.active-lines{
  position:absolute;
  float: left;
  width:4px;
  background-color:black;
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
