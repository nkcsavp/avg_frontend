<template>
  <div>
    <el-container>
      <el-menu router class="el-menu-vertical-demo">
        <el-sub-menu index="1">
          <template #title><i class="el-icon-sort">
          </i><span>排序算法</span></template>
          <el-menu-item index="/sort/interactive">自定义</el-menu-item>
          <el-menu-item v-for="(value,key) in allSortTypes" :index="'/sort/' + key">{{ value }}</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title><i class="el-icon-umbrella">
          </i><span> 树算法</span></template>
          <el-menu-item index="/tree/interactive">自定义</el-menu-item>
          <el-menu-item v-for="(value,key) in allTreeTypes" :index="'/tree/' + key">{{ value }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <el-main style="padding-top: 0">
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
import {onMounted, provide} from "vue";

export default {
  name: "Index",
  setup(){
    const store = useStore()
    store.dispatch("Finished")

    const allSortTypes = {
      // "quick":"快速排序",
      "bubble":"冒泡排序",
      // "radix":"基数排序",
      // "selection":"选择排序",
      // "insertion":"插入排序",
      // "shell":"希尔排序",
      // "merge":"归并排序",
      // "heap":"堆排序",
      // "counting":"计数排序",
      // "bucket":"桶排序",
    }
    const allTreeTypes = {
      "preorder":"前序遍历",
      // "inorder":"中序遍历",
      // "postorder":"后序遍历"
    }
    provide("dict",allSortTypes)
    provide("dict_tree",allTreeTypes)

    return{
      allSortTypes,
      allTreeTypes
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
  width: 200px;
  min-height: 600px;
}
</style>