<template>
  <el-card class="box-card">
    您已成功退出登录！3秒后将跳转到首页。
  </el-card>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "logout",
  setup(){
    const store = useStore()
    const router = useRouter()
    axios({
      async:false,
      url:"LogOutServlet",
    }).then(()=>{
      store.dispatch("LogOut")
      store.dispatch("Finished")
      setTimeout(()=>{
        router.push("/")
      },3000)
    })

  }
}
</script>

<style scoped>
</style>