<template>
  <el-menu mode="horizontal" :default-active="this.$route.path" router>
    <el-menu-item index="/"><img src="/logo.svg"  alt="logo">&nbsp;&nbsp;Algorithm Visualization Platform</el-menu-item>
    <el-menu-item v-for="i in navbarItems" :index="i.idx">{{ i.name }}</el-menu-item>
    <el-menu-item v-if="signedIn" @click="signOut" :index="'/logout'">Log Out</el-menu-item>
  </el-menu>
</template>

<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed} from "vue";
import axios from "axios";
import {ElNotification} from "_element-plus@2.0.2@element-plus";

export default {
  name: "navbar",
  setup(){
    const store = useStore();
    const router = useRouter();
    let signedIn = computed(()=> store.state.isSignedIn)
    const navbarItems = computed(()=> !store.state.isSignedIn ? [{name:"Log In",idx:"/login"}, {name:"Register",idx:"/register"}]:[{name:"Mine",idx:"/mine"}]);
    const signOut = ()=>{
      store.dispatch("Load")
      axios({
        async:false,
        url:"/logout",
      }).then((res)=>{
        store.dispatch("LogOut")
        store.dispatch("Finished")
        ElNotification({
          title: 'Success',
          message: res.data['msg'],
          type: 'success',
        })
        router.push("/")
      })
    }
    return{
      navbarItems,
      signedIn,
      signOut
    }
  }
}
</script>

<style scoped>

</style>