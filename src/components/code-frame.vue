<template>

  <div class="code-frame" >
    <el-form ref="codeForm" :rules="rules" label-width="120px" :model="codeForm" label-position="right" status-icon>
      <el-form-item label="Sample" prop="sample">
        <el-input v-model="codeForm.sample"></el-input>
      </el-form-item>
      <el-form-item label="Mode" prop="mode">
        <el-select v-model="codeForm.mode" placeholder="Mode:">
          <el-option label="Sort" value="sort"></el-option>
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

import axios from "axios";
import sortCore from './algos/animate/sort-core.vue'
import {ref} from "vue";
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-xcode';


export default {
  name: "code-frame",

  data(){
    const mode = ref("sort");
    let sample = ref("1,2,3,4,5")
    let lang = ref("java");
    let codes = ref("public class Main {\n" +
        " public static void main(String[] args){\n" +
        "   ArrayList data = new ArrayList();\n" +
        "   data.swap(1,2);\n" +
        "   data.swap(3,4);\n" +
        " }\n" +
        "}\n")
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
        this.codeForm.codes.replace("+","%2B");
        axios({
          url:"submit",
          params:{
            code:this.codeForm.codes,
            lang:this.codeForm.lang,
            mode:this.codeForm.mode,
            sample:"{" + this.codeForm.sample + "}"
          }
        }).then((res)=>{
          console.log(res)
          if(res.data === "TLE"){
            alert("TLE")
          }
          else if (res.data === "TMR"){
            alert("TMR")
          }
          sortCore.methods.beginDisplay(res.data);
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
  margin: 10px;
}
.editor{
  border-radius: var(--el-border-radius-base);
  padding: 2px;
  border: 1px solid var(--el-border-color-base);
  box-shadow:var(--el-box-shadow-light);

}
</style>