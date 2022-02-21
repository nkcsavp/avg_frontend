<template>
  <!-- mode="horizontal"垂直模式 ,:default-active 处于活动的选项, router 启用该模式会在激活导航时以 index
   作为 path 进行路由跳转-->
  <el-menu mode="horizontal" :default-active="this.$route.path" router>
    <!-- 项目logo  -->
    <el-menu-item index="/"><img src="/logo.svg"  alt="logo">&nbsp;&nbsp; Algorithm Visualization Platform</el-menu-item>
    <!--  上层导航栏  -->
    <el-menu-item v-for="i in navbarItems" :index="i.idx">{{ i.name }}</el-menu-item>
  </el-menu>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "navbar",
  setup(){
    const store = useStore();
    //计算属性判断是否登录，根据情况修改导航栏信息
    const navbarItems = computed(()=> !store.state.isSignedIn ? [{name:"Log In",idx:"/login"}, {name:"Register",idx:"/register"}]:[{name:"Mine",idx:"/mine"}, {name:"Log Out",idx:"/logout"}]);

    return{
      navbarItems
    }
  }
}
</script>

<style scoped>

</style>