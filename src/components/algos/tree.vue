<template>
  <div>

    <div class="title">
      <h1>{{ dict[type] }}</h1>
    </div>

    <tree-core ref="core" :key="type"></tree-core>

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
import TreeCore from './animate/tree-core.vue'
import { useRoute } from "vue-router";
import {inject, ref} from 'vue'
import { treeFunction } from './tree-functions.js'


export default {
  name: "tree",
  data(){
    const route = useRoute()
    const dict = inject("dict_tree")
    let type = ref(route.params.type)

    const checkSample = (rule, value, callback) => {
      const samplePattern = /^([0-9x],)*$/;
      if (value === "") {
        return callback(new Error('Please input test sample'))
      }
      setTimeout(() => {
        if (!samplePattern.test(value + ",")) {
          callback(new Error('Test case need to be like this \"1,x,2,x,x,3,4\"'))
        } else {
          callback()
        }
      }, 300)
    }

    return{
      dict,
      type,
      rules:{
        sample:[{required:true,validator:checkSample,trigger:'blur'}],
      },
      sampleForm:{
        sample: "1,x,2,x,x,3,4"
      },
    }
  },
  components: {
    TreeCore
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
          this.$refs.core.setData(this.sampleForm.sample.split(','))
          this.$refs.core.run(treeFunction(this.type,this.sampleForm.sample.split(',')));
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