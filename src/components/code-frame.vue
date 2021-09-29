<template>

  <div>
    <textarea name="code" id="" cols="30" rows="10" v-model="codes"></textarea>
    sample:<input v-model="sample">
    <br>
    type:sort
    <br>
    lang:
    <select id="lang-select" v-model="lang">
      <option disabled value="">Please select one</option>
      <option>java</option>
    </select>

    <br>
    <button type="button" @click="submitCode"> Submit</button>
  </div>

</template>

<script>

import axios from "axios";
import sortCore from './animate/sort-core.vue'
import {ref} from "vue";

export default {
  name: "code-frame",

  setup(){
    const type = ref("sort");
    let sample = ref("1,2,3,4,5")
    let lang = ref("java");
    let codes = ref("1231")
    const submitCode = function () {
      codes.value.replace("+","%2B");
      console.log(codes)
      axios({
        url:"submit",
        params:{
          code:codes.value,
          lang:lang.value,
          mode:type.value,
          sample:"{" + sample.value + "}"
        }
      }).then((res)=>{
        sortCore.methods.beginDisplay(res.data);
      })
    }
    return{
      submitCode,
      type,
      lang,
      codes,
      sample
    }
  }
}
</script>

<style scoped>
div{
  margin: 10px;
  border: 1px solid red;
}
*{
 display: inline-block;
}

</style>