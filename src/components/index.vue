<template>
  <div>

    <el-container>
      <el-menu router class="el-menu-vertical-demo">
        <el-sub-menu index="1">
          <template #title><i class="el-icon-sort">
          </i><span>排序算法</span></template>
          <el-menu-item index="/sort/interactive">自定义</el-menu-item>
          <el-menu-item v-for="(value,key) in allTypes" :index="'/sort/' + key">{{ value }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { provide,ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "Index",
  setup(){
    const store = useStore()
    store.dispatch("Finished")

    const allTypes = {
      "quick":"快速排序",
      "bubble":"冒泡排序",
      "radix":"基数排序",
      "selection":"选择排序",
      "insertion":"插入排序",
      "shell":"希尔排序",
      "merge":"归并排序",
      "heap":"堆排序",
      "counting":"计数排序",
      "bucket":"桶排序",
    }
    provide("dict",allTypes)

    return{
      allTypes,
    }

  }
}
</script>

<style scoped>
.title {
  align-items: center;
  margin: 10px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>