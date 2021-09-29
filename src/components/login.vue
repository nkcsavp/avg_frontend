<template>

  <div>
    <el-form :rules="rules" ref="loginForm" :model="loginForm" :label-position="labelPosition"
              label-width="80px" class="login-container">
      <h3 class="login-title">登陆</h3>
      <el-form-item label="用户名" prop="name">
        <el-input type="text" autocomplete="false" v-model="loginForm.name"  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" autocomplete="false" v-model="loginForm.pwd" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <br>
      <el-button type="primary" style="width: 200px" @click="submitLogin">登陆</el-button>
      <el-link :underline="false" type="primary" style="margin-top:10px;margin-left:140px;"
               @click="$router.push('/register')">没有账号？前往注册</el-link>
    </el-form>
  </div>
</template>

<script>
import axios from "axios"
import router from "../router";
import store from "../store/vuex";

export default {
    name: "Login",
    setup(){
      return{
        submitLogin() {
          this.$refs.loginForm.validate((valid) => {
            store.dispatch("Load");
            if (valid) {
              axios({
                async:false,
                params:
                this.loginForm,
                url:"LogInServlet",
              }).then((res)=> {
                if(res.data === true){
                  router.replace("/")
                }else{
                  this.message.error('用户名或密码错误');
                }
                store.dispatch("Finished");
              })
            }else {
              this.message.error('未输入所有信息！');
              return false;
            }
          })
        },
        labelPosition:'right',
        loginForm:{
          name:'',
          pwd:'',
        },
        rules:{
          username:[{required:true,message:'请输入用户名',trigger:'blur'}],
          password:[{required:true,message:'请输入密码',trigger:'blur'}],
        }
      };
    },
  }
</script>

<style scoped>
  .login-container{
    border-radius: 15px;
    background-clip: padding-box;
    margin:180px auto;
    width:350px;
    padding: 15px 35px 15px 35px;
    background: white;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-title{
    margin: 0px auto 20px auto;
    text-align: center;
  }
</style>