<template>
  <div>
    <el-alert
        v-show="wrong"
        :description="description"
        show-icon
        title="Error"
        type="error"
    ></el-alert>
    <div id="icon" style="display: table;margin: 0 auto">
      <transaction :strokeWidth="3" fill="#000000" size="128" strokeLinecap="butt" strokeLinejoin="miter"
                   theme="outline"/>
    </div>
    <el-form ref="registerForm" :hide-required-asterisk="true" :label-position="'left'" :model="registerForm"
             :rules="rules"
             class="register-container" label-width="100px">
      <h3 class="register-title">Register</h3>
      <el-form-item label="Email" prop="mail">
        <el-input v-model="registerForm.mail" autocomplete="false" placeholder="学号@mail.nankai.edu.cn"
                  type="text">
          <template #append>
            <el-tooltip :content="verifyCountDown" placement="top">
              <el-button style="font-size: 14px;vertical-align: middle" type="primary" @click="sendVerify">
                <send :strokeWidth="3" fill="#000000" size="16" strokeLinecap="butt" strokeLinejoin="miter"
                      theme="outline"/>
              </el-button>
            </el-tooltip>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pwd">
        <el-input v-model="registerForm.pwd" autocomplete="false" placeholder="密码" show-password
                  type="password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input v-model="registerForm.checkPass" autocomplete="false" placeholder="确认密码" show-password
                  type="password"></el-input>
      </el-form-item>
      <el-form-item label="Verify" prop="verify">
        <el-input v-model="registerForm.verify" autocomplete="false" placeholder="邮箱验证码" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">Submit</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-link :underline="false" type="primary" @click="$router.push('/login')">Already have an account?</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {Send, Transaction} from "@icon-park/vue-next";
import axios from "axios"
import router from "../router";
import store from "../store";
import {ref} from "vue";
import sha1 from "sha1";
import {ElNotification} from "element-plus";

export default {
  name: "Register",
  components: {
    Transaction,
    Send
  },
  data() {
    let wrong = ref(false)
    let description = ref(null)
    let verifyCountDown = ref("发送邮箱验证码")
    let left = -1;

    const sendVerify = () => {
      this.$refs.registerForm.validateField("mail", (error) => {
        if (left !== -1) return;
        if (error === "") {
          left = 60;
          verifyCountDown.value = left + "s后可重新发送"
          let timer = setInterval(() => {
            left -= 1;
            verifyCountDown.value = left + "s后可重新发送"
            if (left === -1) {
              verifyCountDown.value = "发送邮箱验证码"
              clearInterval(timer)
            }
          }, 1000)
          axios({
            async: true,
            url: "/verify",
            params: {
              mail: this.registerForm.mail,
            }
          }).then((res) => {
            ElNotification({
              title: 'Success',
              message: '验证码已发往邮箱，请查收',
              type: 'success',
            })
          }).catch((err) => {
            ElNotification({
              title: 'Error',
              message: err.response.data['msg'],
              type: 'error',
            })
          })
        }
      })
    }
    const register = () => {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          store.dispatch("Load");
          axios({
            method: 'POST',
            async: false,
            url: "/register",
            params: {
              mail: this.registerForm.mail,
              pwd: sha1(this.registerForm.pwd),
              // pwd: this.registerForm.pwd,
              verify: this.registerForm.verify
            }
          }).then((res) => {
            ElNotification({
              title: 'Success',
              message: res.data['msg'],
              type: 'success',
            })
            router.push("/login")
          }).catch((err) => {
            wrong.value = true
            description.value = err.response.data['msg']
            store.dispatch("Finished");
          })
        } else {
          return false;
        }
      })
    }
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
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pwd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    const checkVerify = (rule, value, callback) => {
      const verifyPattern = /^[0-9]{6}$/;
      if (value === '') {
        callback(new Error('请输入邮箱验证码'))
      }
      setTimeout(() => {
        if (!verifyPattern.test(value)) {
          callback(new Error('邮箱验证码格式错误'))
        } else {
          callback()
        }
      }, 100)
    }


    store.dispatch("Finished");
    return {
      registerForm: {
        mail: '',
        pwd: '',
        checkPass: '',
        verify: ''
      },
      labelPosition: 'right',
      wrong,
      sendVerify,
      register,
      description,
      verifyCountDown,
      rules: {
        mail: [{required: true, validator: checkMail, trigger: 'blur'}],
        pwd: [{required: true, validator: checkPwd, trigger: 'blur'}],
        checkPass: [{required: true, validator: validatePwd, trigger: 'blur'}],
        verify: [{required: true, validator: checkVerify, trigger: 'blur'}],
      },
    }
  }
}
</script>

<style>
.register-container {
  margin: 0 auto;
  display: table;
}

#icon {
  padding: 50px;
}

.el-alert {
  width: 50%;
  margin: 0 auto;
}

.el-button {
  padding: 6px 12px;
}
</style>