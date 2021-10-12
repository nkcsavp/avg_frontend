<template>
  <div>
    <h1>{{ type }}</h1>
    <sort-core :key="type"></sort-core>
    <code-frame :key="type"></code-frame>

  </div>


</template>

<script>
import sortCore from '../animate/sort-core.vue'
import codeFrame from '../../code-frame.vue'
import { useRoute } from "vue-router";
import { ref } from 'vue'

export default {
  name: "sort-interactive",
  setup(){
    const route = useRoute();
    let type = ref(route.params.type)
    return{
      type
    }
  },
  components: {
    sortCore,
    codeFrame
  },
  watch:{
    '$route.params'(newval) {
      this.type = newval.type;
    }
  }
}
</script>

<style scoped>

</style>