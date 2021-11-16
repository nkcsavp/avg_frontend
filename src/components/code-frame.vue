<template>

  <div class="code-frame" >
    <el-form ref="codeForm" :rules="rules" label-width="120px" :model="codeForm" label-position="right" status-icon>
      <el-form-item label="Sample" prop="sample">
        <el-input v-model="codeForm.sample"></el-input>
      </el-form-item>
      <el-form-item label="Mode" prop="mode">
        <el-select v-model="codeForm.mode" placeholder="Mode">
          <el-option :label="codeForm.mode" :value="codeForm.mode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Language" prop="lang">
        <el-select v-model="codeForm.lang" placeholder="Language:">
          <el-option label="Java" value="java"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Code" prop="codes">
        <div class="editor">
          <v-ace-editor
            v-model:value="codeForm.codes"
            lang="java"
            theme="xcode"
            style="height: 300px" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitCode">Submit</el-button>
      </el-form-item>
    </el-form>

  </div>


</template>


<script>

import axios from "axios"
import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-xcode'
import {useStore} from "vuex"


export default {
  name: "code-frame",
  props:[
    'initialCode',
    'initialMode',
    'initialSample',
    'specificSamplePattern'
  ],
  emits:[
      'error',
      'submitted'
  ],
  data(){
    const store = useStore()
    const mode = this.initialMode
    let sample = this.initialSample
    let lang = "java"
    let codes = this.initialCode

    const checkSample = (rule, value, callback) => {
      let samplePattern = this.specificSamplePattern
      if (value === "") {
        return callback(new Error('Please input test sample!'))
      }
      setTimeout(() => {
        if (!samplePattern.test(value + ",")) {
          callback(new Error('Test case need to be like this \"' + this.initialSample + '\"!'))
        } else {
          callback()
        }
      }, 300)
    }
    return{
      store,
      codeForm:{
        mode,
        lang,
        codes,
        sample
      },
      rules:{
        sample:[{required:true,validator:checkSample,trigger:'blur'}],
        lang:[{required:true,trigger:'blur'}],
        codes:[{required:true,trigger:'blur'}],
        mode:[{required:true,trigger:'blur'}],
      }
    }
  },
  components: {
    VAceEditor
  },
  methods:{
    submitCode:function () {
      this.$refs.codeForm.validate((valid)=>{
        if(!valid){
          return;
        }
        this.store.dispatch("Load")
        this.codeForm.codes.replace("+","%2B")
        axios({
          url:"submit",
          params:{
            code:this.codeForm.codes,
            lang:this.codeForm.lang,
            mode:this.codeForm.mode.toLowerCase(),
            sample:"{" + this.codeForm.sample.replaceAll('x','-1') + "}"
          }
        }).then((res)=>{
          this.store.dispatch("Finished")
          if(res.data === "TLE"){
            this.$emit('error',"TLE")
          }
          else if (res.data === "TMR"){
            this.$emit('error',"TMR")
          }
          else{
            document.body.scrollTop = 0;
            res.data.originData = this.codeForm.sample.split(',');
            this.$emit('submitted', res.data)
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.code-frame{
  padding: 20px;
  border: 1px solid var(--el-border-color-base);
  box-shadow:var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin: 40px;
}
.editor{
  border-radius: var(--el-border-radius-base);
  padding: 2px;
  border: 1px solid var(--el-border-color-base);
  box-shadow:var(--el-box-shadow-light);

}
</style>