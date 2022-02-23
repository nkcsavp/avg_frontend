<template>
  <div>
    <el-container>
      <el-menu router unique-opened class="vertical-menu">
        <el-menu-item index="/interactive"><api theme="outline" size="24" fill="#000000" :strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt"/>自定义</el-menu-item>

        <el-sub-menu index="1">
          <template #title><sort-two theme="outline" size="24" fill="#000000" :strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt"/><span>排序算法</span></template>
          <el-menu-item v-for="(value,key) in allSortTypes" :index="'/sort/' + key">{{ value }}</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title><christmas-tree theme="outline" size="24" fill="#000000" :strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt"/><span> 树算法</span></template>
          <el-menu-item v-for="(value,key) in allTreeTypes" :index="'/tree/' + key">{{ value }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <el-main style="padding-top: 0" v-loading="store.state.isFrameLoading">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :load="false"/>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { provide} from "vue";
import {Api,ChristmasTree,SortTwo} from "@icon-park/vue-next";

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
      store,
      allSortTypes,
      allTreeTypes
    }
  },
  components:{
    Api,
    ChristmasTree,
    SortTwo
  }
}
</script>

<style>
.vertical-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 600px;
}

.el-sub-menu__title .i-icon svg,.el-menu-item .i-icon svg{
  vertical-align: middle !important;
}
</style>