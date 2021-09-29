<template>

  <div>
    <textarea name="code" id="" cols="30" rows="10" v-model="code"></textarea>
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
    <button type="button"> Submit</button>
  </div>

</template>

<script>
// import {useRouter, useRoute} from "vue-router";

import axios from "axios";
import {inject} from "_vue@3.2.19@vue";

export default {
  name: "code",

  setup(){
    const type = "sort";
    let sample = "1,2,3,4,5"
    let lang = "java";
    let code = "1231"
    let fun = inject("sortAnimation");
    const submitCode = function () {
      code.replace("+","%2B");
      axios({
        url:"submit",
        params:{
          code:code,
          lang:lang,
          type:type,
          sample:"{" + sample + "}"
        }
      }).then((res)=>{
          fun(res);
      })
    }
    return{
      submitCode,
      type,
      lang,
      code,
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