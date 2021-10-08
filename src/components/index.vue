<template>
  <div>

    <el-container>
      <el-menu router class="el-menu-vertical-demo">
        <el-sub-menu index="1">
          <template #title><i class="el-icon-sort">
          </i><span>排序算法</span></template>
          <el-menu-item index="/sort/interactive">自定义</el-menu-item>
          <el-menu-item index="/sort/bubbling">冒泡排序</el-menu-item>
          <el-menu-item index="/sort/choose">选择排序</el-menu-item>
          <el-menu-item index="/sort/quick">快速排序</el-menu-item>
          <el-menu-item index="/sort/insert">插入排序</el-menu-item>
          <el-menu-item index="/sort/heap">堆排序</el-menu-item>
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

export default {
  name: "Index",
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