<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>交互式算法可视化平台</h1>
          <h2>Interactive Algorithm Visualization Platform</h2>
          <el-link href="https://nkcsavp.github.io/"><home theme="outline" size="22" fill="#000000" :strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt"/>&nbsp;Home Page</el-link>
          <br>
          <el-link href="https://github.com/nkcsavp"><github theme="outline" size="22" fill="#000000" :strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt"/>&nbsp;Github Link</el-link>
        </div>
      </template>
      <h4>作者：</h4>
      <div class="author-box">
        <el-link href="https://github.com/lihangyu1913092"><right theme="outline" size="14" fill="#000000" :strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt"/>李航宇 @lihangyu1913092</el-link>
        <br>
        <el-link href="https://github.com/NicerWang"><right theme="outline" size="14" fill="#000000" :strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt"/>王浩伟 @NicerWang</el-link>
        <br>
        <el-link href="https://github.com/TumbledoreAlalalala"><right theme="outline" size="14" fill="#000000" :strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt"/>陶稳冲 @TumbledoreAlalalala<i class="el-icon-arrow-right el-icon--right"></i> </el-link>
        <br>
        <el-link href="https://github.com/lmj2001"><right theme="outline" size="14" fill="#000000" :strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt"/>黎明杰 @lmj2001<i class="el-icon-arrow-right el-icon--right"></i> </el-link>
        <br>
        <el-link href="https://github.com/orgs/nkcsavp/people/lvyou2000"><right theme="outline" size="14" fill="#000000" :strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt"/>吕尤 @lvyou2000<i class="el-icon-arrow-right el-icon--right"></i> </el-link>
      </div>
    </el-card>
  </div>

</template>

<script>
import { useStore } from "vuex";
import {Github,Home,Right} from "@icon-park/vue-next";

export default {
  name: "hello",
  components:{
    Github,
    Home,
    Right
  },
  setup(){
    const store = useStore()
    store.dispatch("Finished_frame")
  },
}
</script>

<style scoped>
h1 h2{
  display: inline;
}
.card-header {
  justify-content: space-between;
  align-items: center;
}
.author-box{
  padding: 10px;
}
.author-box div{
  padding: 5px;
}
.box-card {
  width: 80%;
  padding: 20px;
  margin: 40px;
}
</style>