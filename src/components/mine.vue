<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>个人信息</span>
      </div>
    </template>
    <div v-for="(value,key) in inform" class="text item">{{key}}&emsp;&emsp;{{value}}</div>
  </el-card>
</template>

<script>
  import {useStore} from "vuex";
  import {provide} from "vue";
  import axios from "axios";

  export default {
    mounted() {
      this.userInfo()
    },
    setup(){
      const store= useStore()
      const inform=[]
      store.dispatch("Load")
      function userInfo(){
        axios({
          async:false,
          url:"/json",//从后端调用的json文件
        }).then((res)=>{
          this.inform=res[0].data
        })
      }
      store.dispatch("Finished")

      provide("dict",inform)
      return{
        inform,
        userInfo
      }
    },


  }
</script>
<style>
  .box-card{
    background-clip: padding-box;
    margin: 100px auto;
    width: 500px;
    padding: 15px 35px 15px 35px;
  }
  .text{
    font-size: 14px;
    margin-bottom: 18px;;
  }
</style>