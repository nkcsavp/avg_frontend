<template>

  <div class="login-container">
    <el-form  :rules="rules" ref="loginForm" :model="loginForm" :label-position="labelPosition"
              label-width="120px"  status-icon>
      <h3 class="login-title">Log In</h3>
      <el-form-item label="Username" prop="name">
        <el-input type="text" autocomplete="false" v-model="loginForm.name"  placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="Password " prop="pwd">
        <el-input type="password" autocomplete="false" v-model="loginForm.pwd" placeholder="Password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="submitLogin">Submit</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-link :underline="false" type="primary" @click="$router.push('/register')">Didn't have an account?</el-link>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import axios from "axios"
import router from "../router";
import store from "../store";
import md5 from "md5"
export default {
  name: "Login",
  data(){
    const checkUserName = (rule, value, callback) => {
      const userNamePattern = /^[a-zA-Z0-9]{4,16}$/;
      if (value === "") {
        return callback(new Error('Please input your username'))
      }
      setTimeout(() => {
        if (!userNamePattern.test(value)) {
          callback(new Error('Need 4~16 Characters or Digits.'))
        } else {
          callback()
        }
      }, 300)
    }
    const checkPwd = (rule, value, callback) => {
      const pwdPattern = /^[a-zA-Z0-9]{8,}$/;
      if (value === "") {
        return callback(new Error('Please input your username'))
      }
      setTimeout(() => {
        if (!pwdPattern.test(value)) {
          callback(new Error('Need At Least 8 Characters or Digits.'))
        } else {
          callback()
        }
      }, 300)
    }
    store.dispatch("Finished")
    return{
      labelPosition:'right',
      loginForm:{
        name:'',
        pwd:'',
      },
      checkUserName,
      checkPwd,
      rules:{
        name:[{required:true,validator:checkUserName,trigger:'blur'}],
        pwd:[{required:true,validator:checkPwd,trigger:'blur'}],
      }
    };
  },
  methods:{
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        store.dispatch("Load");
        if (valid) {
          axios({
            async:false,
            url:"LogInServlet",
            params:{
              name:this.loginForm.name,
              pwd:md5(this.loginForm.pwd)
            }
          }).then((res)=> {
            if(res.data === true){
              router.replace("/")
            }else{
              this.message.error('Wrong UserName or Password');
            }
            store.dispatch("Finished");
          })
        }else {
          return false;
        }
      })
    },
  }
}
</script>

<style >
.login-container{
  box-shadow:var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  background-clip: padding-box;
  margin:180px auto;
  width:400px;
  padding: 15px 35px 15px 35px;
}
.login-title{
  margin: 0px auto 20px auto;
  text-align: center;
}
</style>