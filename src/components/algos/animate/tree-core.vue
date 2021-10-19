<script>
import $ from 'jquery'
import 'jquery-color'
import { reactive,ref } from 'vue'
import {ElRow, ElCol} from "element-plus";
import {ElCard} from "element-plus";
import {onMounted} from "vue";
export default {
  setup(){
    let data = reactive([7,4,3,2,1,32,'x',3,3,4,5,5,'x','x','x','x'])

    let nodeClasses = reactive(Array.apply(null, Array(32)).map((current,index) => {
      let hide = false;
      if ( index >= data.length || data[index] === 'x'){
        hide = true;
      }
      return {
        "active-node":true,
        "hide-node":hide
      }
    }))

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

    onMounted(()=>{
      draw()
    })

    const draw = function () {
      let nodes = [1,2,3,4,5,6,7]

      nodes.map((num)=>{
        let son1 = num * 2
        let son2 = num * 2 + 1
        drawLine(document.getElementById("node" + num),document.getElementById("node" + son1),document.getElementById("line-" + num + "-" + son1))
        if ( data[son1] === 'x' ) $("#line-" + num + "-" + son1).hide()
        drawLine(document.getElementById("node" + num),document.getElementById("node" + son2),document.getElementById("line-" + num + "-" + son2))
        if ( data[son2] === 'x' ) $("#line-" + num + "-" + son2).hide()
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

        nodeClasses[id1]["hide-node"] = true;
        nodeClasses[id2]["hide-node"] = true;

        node1.animate(pos2,'slow','swing');
        node2.animate(pos1,'slow','swing',function () {
          nodeClasses[id1]["hide-node"] = false;
          nodeClasses[id2]["hide-node"] = false;
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
        nodeClasses[id]['hide-node'] = false
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
        nodeClasses[id]['hide-node'] = true
        data[id] = 'x'
        animateNode.fadeOut(350)
        animateLine.fadeOut(350)
      })
      animateNode.offset(pos)

    }
    return{
      nodeClasses,
      data,
      swap,
      insert,
      remove
    }
  },
  components:{
    ElCard,
    ElRow,
    ElCol
  }
}
</script>

<template>
  <div>
    <button @click="swap(1,2)">SWAP-TEST</button>
    <button @click="insert(6,'NEW')">INSERT-TEST</button>
    <button @click="remove(6)">REMOVE-TEST</button>
    <el-card class="box-card">
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
    </el-card>
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
  background-color: #fff;
  margin: 0 auto;
  border: 3px solid red;
  line-height: 40px;
  float: left;
  color: red;
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


</style>
