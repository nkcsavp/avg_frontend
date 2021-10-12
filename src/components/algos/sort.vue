<template>
  <div>

  <div class="title">
    <h1>{{ dict[type] }}</h1>
  </div>

  <sort-core :key="type"></sort-core>

  <div class="sample-frame">
    <el-form :rules="rules" :model="sampleForm" ref="sampleForm" label-position="right" label-width="120px" status-icon>
      <el-form-item label="Sample" prop="sample">
        <el-input type="text" autocomplete="false" v-model="sampleForm.sample" placeholder="Sample"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="animate" >Animate</el-button>
      </el-form-item>
    </el-form>
  </div>

  </div>
</template>

<script>
import sortCore from './animate/sort-core.vue'
import { useRoute } from "vue-router";
import { inject,ref } from 'vue'
import { sortFunction } from "./sort-functions.js"
import {ElNotification} from "element-plus";



export default {
  name: "sort",
  data(){
    const route = useRoute();
    const dict = inject("dict")
    let type = ref(route.params.type)
    let preventAnimation = ref(true)

    const checkSample = (rule, value, callback) => {
      const samplePattern = /^([0-9],)*$/;
      if (value === "") {
        return callback(new Error('Please input test sample'))
      }
      setTimeout(() => {
        if (!samplePattern.test(value + ",")) {
          console.log(value)
          callback(new Error('Test case need to be like this \"1,2,3,4,5\"'))
        } else {
          callback()
        }
      }, 300)
    }
    return{
      dict,
      type,
      preventAnimation,
      rules:{
        sample:[{required:true,validator:checkSample,trigger:'blur'}],
      },
      sampleForm:{
        sample: "1,3,4,5,2"
      },
    }
  },
  components: {
    sortCore
  },
  watch:{
    '$route.params'(newval) {
      this.type = newval.type;
    }
  },
  methods:{
    animate:function () {
      this.$refs.sampleForm.validate((valid)=>{
        if(valid){
          if (this.preventAnimation === false){
            ElNotification({
              title: 'Notice',
              message: '重新播放动画或改变样例，请刷新页面！',
              type: 'error',
            })
            return
          }
          let arr = this.sampleForm.sample.split(",").map(Number)
          this.preventAnimation = false
          sortCore.methods.beginDisplay(JSON.parse(sortFunction(this.type,arr)))
        }
      })
    }
  }
}
</script>

<style scoped>
.sample-frame{
  padding: 40px;
  border: 1px solid var(--el-border-color-base);
  box-shadow:var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin: 40px;
}
.title{
  padding: 20px;
}
</style>