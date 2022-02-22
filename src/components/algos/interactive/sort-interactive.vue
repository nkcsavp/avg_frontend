<template>
  <div>
    <h1>{{ type }}</h1>
    <sort-core :key="type"></sort-core>
    <code-frame :initial-code="initialCode" :key="type" initial-mode="Sort" initial-sample="5,4,3,2,1" :specific-sample-pattern="/^([0-9],)*$/" @submitted="run($event,data)"></code-frame>
  </div>


</template>

<script>
import sortCore from '../animate/array-core.vue'
import codeFrame from '../../code-frame.vue'
import { useRoute } from "vue-router";
import { ref } from 'vue'
import {ElNotification} from 'element-plus';

export default {
  name: "sort-interactive",
  setup(){
    const route = useRoute();
    let type = ref(route.params.type)
    let preventAnimation = ref(true)
    let initialCode = "public class Main {\n" +
        " public static void main(String[] args){\n" +
        "   ArrayList data = new ArrayList();\n" +
        "   data.swap(1,2);\n" +
        "   data.swap(3,4);\n" +
        " }\n" +
        "}\n";
    return{
      type,
      initialCode,
      preventAnimation
    }
  },
  components: {
    sortCore,
    codeFrame
  },
  methods:{
    run:function (data){
      if (this.preventAnimation === false){
        ElNotification({
          title: 'Notice',
          message: '重新播放动画或改变样例，请刷新页面！',
          type: 'error',
        })
        return
      }
      this.preventAnimation = false
      data.originData = data.originData.map(Number)
      console.log(data)
      sortCore.methods.beginDisplay(data)
    },
  }
}
</script>

<style scoped>

</style>