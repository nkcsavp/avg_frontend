<template>
  <div>
    <el-container>
      <el-menu class="vertical-menu" router unique-opened>
        <el-menu-item index="/interactive">
          <api :strokeWidth="3" fill="#000000" size="24" strokeLinecap="butt" strokeLinejoin="miter" theme="outline"/>
          自定义
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <sort-two :strokeWidth="3" fill="#000000" size="24" strokeLinecap="butt" strokeLinejoin="miter"
                      theme="outline"/>
            <span>排序算法</span></template>
          <el-menu-item v-for="(value,key) in allSortTypes" :index="'/sort/' + key">{{ value }}</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <christmas-tree :strokeWidth="3" fill="#000000" size="24" strokeLinecap="butt" strokeLinejoin="miter"
                            theme="outline"/>
            <span> 树算法</span></template>
          <el-menu-item v-for="(value,key) in allTreeTypes" :index="'/tree/' + key">{{ value }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <el-main v-loading="store.state.isFrameLoading" style="padding-top: 0">
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade">
            <component :is="Component" :load="false"/>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {provide} from "vue";
import {Api, ChristmasTree, SortTwo} from "@icon-park/vue-next";
import {getSortTypes} from "./generator/sort.js";
import {getTreeTypes} from "./generator/tree.js";

export default {
  name: "Index",
  setup() {
    const store = useStore()
    store.dispatch("Finished")
    let allSortTypes = getSortTypes()
    let allTreeTypes = getTreeTypes()

    provide("dict_sort", allSortTypes)
    provide("dict_tree", allTreeTypes)
    return {
      store,
      allSortTypes,
      allTreeTypes
    }
  },
  components: {
    Api,
    ChristmasTree,
    SortTwo
  }
}
</script>

<style scoped>
.vertical-menu{
  width: 200px;
  min-height: 600px;
}

.el-menu-item{
  width: 200px;
}
</style>