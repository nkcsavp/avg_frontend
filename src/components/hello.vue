<template>
  <div>
    欢迎来到 交互式算法可视化平台
  </div>

</template>

<script>
import { useStore } from "vuex";

export default {
  name: "hello",
  setup(){
    const store = useStore()
    store.dispatch("Finished")
  }
}
</script>

<style scoped>

</style>