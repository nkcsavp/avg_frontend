<template>
  <div>
    <el-form  :rules="rules" ref="registerForm" :model="registerForm" :label-position="labelPosition"
              label-width="80px" class="register-container">
      <h3 class="register-title">注册</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" autocomplete="false" v-model="registerForm.username"  placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input
                type="password"
                v-model="registerForm.pass"
                autocomplete="false"
                show-password
                placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
                type="password"
                v-model="registerForm.checkPass"
                autocomplete="off"
                show-password
                placeholder="确认你输入的密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width: 200px" @click="submitRegister">注册</el-button>
        <el-link :underline="false" type="primary" style="margin-top:10px;margin-left:140px;"
                 @click="$router.push('/login')">已有账号？直接登录</el-link>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import axios from "axios"
  import router from "../router";
  import store from "../store/vuex";
  export default {
    name: "Register",
    data() {
      var validatePwd2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        registerForm: {
          username:'',
          pass: '',
          checkPass: '',
        },
        labelPosition:'right',
        rules: {
          username: [{ required:true,message:"请输入用户名", trigger: 'blur' }],
          pass: [{ required:true,message:"请输入密码", trigger: 'blur' }],
          checkPass: [{ required:true,validator: validatePwd2, trigger: 'blur' }],
        },
      }
    },
    methods: {
      submitRegister() {
        this.$refs.registerForm.validate((valid) => {
          store.dispatch("Load")
          if (valid) {
            axios({
              async:false,
              url:"RegisterServlet",
              params:this.registerForm
            }).then((res)=>{
              if(res.data['status'] === true){
                router.replace("/login")
              }else{
                this.message.error('错误')
              }
              store.dispatch("Finished");
            })
          } else {
            this.message.error('未输入所有信息！');
            return false
          }
        })
      },
    }
  }
</script>

<style >
  .register-container{
    border-radius: 15px;
    background-clip: padding-box;
    margin:140px auto;
    width:350px;
    padding: 15px 35px 15px 35px;
    background: white;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .register-title{
    margin: 0px auto 20px auto;
    text-align: center;
  }
</style>