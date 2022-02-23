<template>
  <div>
    <el-alert
        title="Error"
        type="error"
        :description="description"
        show-icon
        v-show="wrong"
    ></el-alert>
    <div id="icon" style="display: table;margin: 0 auto">
        <arithmetic-one :strokeWidth="3" fill="#000000" size="128" strokeLinecap="butt" strokeLinejoin="miter"
                        theme="outline"/>
    </div>
    <div class="login-container">
      <el-form ref="loginForm" :label-position="'left'" :model="loginForm" :rules="rules" label-width="100px"
               status-icon :hide-required-asterisk="true">
        <h3 class="login-title">Log In</h3>
        <el-form-item label="Email" prop="mail">
          <el-input v-model="loginForm.mail" autocomplete="false" placeholder="学号@mail.nankai.edu.cn" type="text"></el-input>
        </el-form-item>
        <el-form-item  label="Password " prop="pwd">
          <el-input v-model="loginForm.pwd" autocomplete="false" placeholder="密码" show-password
                    type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Submit</el-button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-link :underline="false" type="primary" @click="$router.push('/register')">Didn't have an account?
          </el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {ArithmeticOne} from "@icon-park/vue-next";
import axios from "axios"
import router from "../router";
import {useRoute} from "vue-router";
import {ref} from "vue";
import sha1 from "sha1";
import {ElNotification} from "_element-plus@2.0.2@element-plus";
import {useStore} from "vuex";


export default {
  name: "Login",
  components: {
    ArithmeticOne,
  },
  data() {
    const store = useStore()
    const route = useRoute()
    let wrong = ref(false);
    let description = ref(null);
    const checkMail = (rule, value, callback) => {
      const mailPattern1 = /^\w+([-+.]\w+)*@mail.nankai.edu.cn$/;
      const mailPattern2 = /^\w+([-+.]\w+)*@nankai.edu.cn$/;
      setTimeout(() => {
        if (mailPattern1.test(value) || mailPattern2.test(value)) {
          callback()
        } else {
          callback(new Error('请输入您的邮箱'))
        }
      }, 100)
    }
    const checkPwd = (rule, value, callback) => {
      const pwdPattern = /^[a-zA-Z0-9]{6,16}$/;
      setTimeout(() => {
        if (!pwdPattern.test(value)) {
          callback(new Error('密码为6-16位字母或数字'))
        } else {
          callback()
        }
      }, 100)
    }
    const login = ()=>{
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          store.dispatch("Load");
          axios({
            async: false,
            url: "/login",
            params: {
              mail: this.loginForm.mail,
              pwd: sha1(this.loginForm.pwd)
              // pwd: this.loginForm.pwd
            }
          }).then((res) => {
            ElNotification({
              title: 'Success',
              message: res.data['msg'],
              type: 'success',
            })
            store.dispatch("SignIn")
            router.push("/")
          }).catch((err)=>{
            wrong.value = true
            description.value = err.response.data['msg']
            console.log(err.response.data)
            store.dispatch("Finished");
          })
        } else {
          return false;
        }
      })
    }
    store.dispatch("Finished")
    if(route.query.prompt !== undefined){
      ElNotification({
        title: 'Info',
        message: 'You need to Log In Before using DIY mode',
        type: 'info',
      })
    }

    return {
      login,
      wrong,
      description,
      loginForm: {
        mail: '',
        pwd: '',
      },
      rules: {
        mail: [{required: true, validator: checkMail, trigger: 'blur'}],
        pwd: [{required: true, validator: checkPwd, trigger: 'blur'}],
      },
    };
  }
}
</script>

<style>
.login-container {
  margin: 0 auto;
  display: table;
}
#icon{
  padding: 50px;
}
.el-alert{
  width: 50%;
  margin: 0 auto;
}
</style>