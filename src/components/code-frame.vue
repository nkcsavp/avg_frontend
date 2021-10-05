<template>

  <div class="code-frame" >
    <el-form ref="form"  label-width="120px">
      <el-form-item label="Sample">
        <el-input v-model="sample"></el-input>
      </el-form-item>
      <el-form-item label="Mode">
        <el-select v-model="mode" placeholder="Mode:">
          <el-option label="Sort" value="sort"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Language">
        <el-select v-model="lang" placeholder="Language:">
          <el-option label="Java" value="java"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Code">
        <div class="editor">
          <v-ace-editor
            v-model:value="codes"
            lang="java"
            theme="chrome"
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
import sortCore from './animate/sort-core.vue'
import {ref} from "vue";
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-chrome';

export default {
  name: "code-frame",

  setup(){
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
    const submitCode = function () {
      codes.value.replace("+","%2B");
      axios({
        url:"submit",
        params:{
          code:codes.value,
          lang:lang.value,
          mode:mode.value,
          sample:"{" + sample.value + "}"
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
    }
    return{
      submitCode,
      mode,
      lang,
      codes,
      sample,
    }
  },
  components: {
    VAceEditor
  },
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