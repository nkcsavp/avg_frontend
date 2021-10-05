<template>
  <div>
    <el-menu
        mode="horizontal"
        default-active="/"
        router
    >
      <el-menu-item index="/"><img src="logo.svg" >&nbsp;&nbsp; Algorithm Visualization Platform</el-menu-item>

      <el-menu-item index="/login">Log In</el-menu-item>
      <el-menu-item index="/register">Register</el-menu-item>
    </el-menu>
    <el-main v-loading="isLoading">
      <router-view></router-view>
    </el-main>
  </div>

</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  setup() {
    const store = useStore();
    let isLoading = computed(() => {
      return store.state.isLoading;
    })
    // const saveState = () => {
    //   sessionStorage.setItem('state', JSON.stringify(store.state))
    // }
    // onMounted(() => window.addEventListener('unload', saveState))
    return {
      status,
      isLoading
    }
  },
}
</script>
