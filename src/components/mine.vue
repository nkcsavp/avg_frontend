<template>
  <el-card class="box-card">
    本页面暂未完成。
  </el-card>
</template>

<script>
  import {useStore} from "vuex";

  export default {
    setup(){
      useStore().dispatch("Finished")
    }
  }
</script>
<style>
</style>