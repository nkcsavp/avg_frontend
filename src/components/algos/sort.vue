<template>

  <h1>{{ $route.params.type }}</h1>
  <sort-core></sort-core>
  <code-frame></code-frame>
</template>

<script>
import sortCore from '../animate/sort-core.vue'
import codeFrame from '../code-frame.vue'

export default {
  name: "sort",
  components: {
    sortCore,
    codeFrame
  },
}
</script>

<style scoped>

</style>