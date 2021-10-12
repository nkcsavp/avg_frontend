<template>
  <el-menu
      mode="horizontal"
      :default-active="this.$route.path"
      router
  >
    <el-menu-item index="/"><img src="\logo.svg" >&nbsp;&nbsp; Algorithm Visualization Platform</el-menu-item>

    <el-menu-item v-for="i in navbarItems" :index="i.idx">{{ i.name }}</el-menu-item>

  </el-menu>
</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";

export default {
  name: "navbar",
  setup(){
    const store = useStore();
    let navbarItems;
    if(!store.state.isSignedIn){
      navbarItems = [
        {name:"Log In",idx:"/login"},
        {name:"Register",idx:"/register"}
      ]
    }
    else{
      navbarItems = [
        {name:"Mine",idx:"/mine"},
        {name:"Log Out",idx:"/logout"}
      ]
    }
    return{
      navbarItems
    }
  },
  "$store.state.isSignedIn"(newVal,oldVal){
    if(newVal === oldVal){}
    else if(newVal){
      this.navbarItems = ref([
        {name:"Log In",idx:"/login"},
        {name:"Register",idx:"/register"}
      ])
    }else{
      this.navbarItems = ref([
        {name:"Mine",idx:"/mine"},
        {name:"Log Out",idx:"/logout"}
      ])
    }
  }
}
</script>

<style scoped>

</style>