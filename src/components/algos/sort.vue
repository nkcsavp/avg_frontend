<template>

  <h1>{{ $route.params.type }}</h1>
  <sort-core></sort-core>
  <code-area></code-area>
</template>

<script>
// import {useRouter, useRoute} from "vue-router";
import {inject, provide} from "vue";
import sortCore from '../animate/sort-core.vue'
import code from '../code.vue'
export default {
  name: "sort",
  components: {
    sortCore,
    'code-area':code
  },


  // setup(){
  //   const route = useRoute();
  //   const type = route.params.type;
  //   return{
  //     type
  //   }
  // }
}
</script>

<style scoped>

</style>