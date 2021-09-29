<template>

  <h1>{{ $route.params.type }}</h1>
  <sort-core></sort-core>
  <code-frame></code-frame>
</template>

<script>
// import {useRouter, useRoute} from "vue-router";
import {inject, provide} from "vue";
import sortCore from '../animate/sort-core.vue'
import codeFrame from '../code-frame.vue'

export default {
  name: "sort",
  components: {
    sortCore,
    codeFrame
  },


  setup(){
    let fun = inject("sortAnimation");
    console.log(fun)
    return{
      fun
    }
  }
}
</script>

<style scoped>

</style>