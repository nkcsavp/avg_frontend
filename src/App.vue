<template>
  <div>
    <el-menu
        mode="horizontal"
        default-active="/"
        router
    >
      <el-menu-item index="/"><img src="\logo.svg" >&nbsp;&nbsp; Algorithm Visualization Platform</el-menu-item>

      <el-menu-item v-for="i in unsignedItems" :index="i.idx">{{ i.name }}</el-menu-item>

    </el-menu>
    <el-main v-loading="isLoading">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>

    </el-main>
  </div>

</template>

<script>
import {useStore} from "vuex";
import {computed,onMounted} from "vue";

export default {
  setup() {
    const store = useStore();
    let isLoading = computed(() => {
      return store.state.isLoading;
    })
    let unsignedItems;
    if(!store.state.isSignedIn){
      unsignedItems = [
        {name:"Log In",idx:"/login"},
        {name:"Register",idx:"/register"}
      ]
    }
    else{
      unsignedItems = [
        {name:"Mine",idx:"/mine"},
        {name:"Log Out",idx:"/logout"}
      ]
    }
    const saveState = () => {
      sessionStorage.setItem('state', JSON.stringify(store.state))
    }
    onMounted(() => window.addEventListener('unload', saveState))
    return {
      status,
      isLoading,
      unsignedItems
    }
  },
}
</script>
