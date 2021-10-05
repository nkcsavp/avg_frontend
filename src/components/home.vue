<template>
  <div>

    <el-container>
      <el-menu router class="el-menu-vertical-demo">
        <el-sub-menu index="1">
          <template #title><i class="el-icon-sort">
          </i><span>排序算法</span></template>
          <el-menu-item index="/sort/bubbling">冒泡排序</el-menu-item>
          <el-menu-item index="/sort/choose">选择排序</el-menu-item>
          <el-menu-item index="/sort/quick">快速排序</el-menu-item>
          <el-menu-item index="/sort/insert">插入排序</el-menu-item>
          <el-menu-item index="/sort/heap">堆排序</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title><i class="el-icon-trophy"></i><span>树</span></template>
          <el-menu-item index="/tree/bst">二叉搜索树(bst)</el-menu-item>
          <el-menu-item index="/tree/avl">平衡二叉树(avl)</el-menu-item>
          <el-menu-item index="/tree/rb">红黑树(rb)</el-menu-item>
          <el-menu-item index="/tree/b">B树</el-menu-item>
        </el-sub-menu>


      </el-menu>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "Home",
  setup(){
    const store = useStore()
    store.dispatch("Finished")
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