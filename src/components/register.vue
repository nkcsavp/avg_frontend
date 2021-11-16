<template>
  <div>
    <el-alert title="用户名已经存在。" type="warning" v-show="wrong"/>
    <el-form :rules="rules" ref="registerForm" :model="registerForm" :label-position="labelPosition"
             label-width="150px" class="register-container">
      <h3 class="register-title">Register</h3>
      <el-form-item label="Username" prop="username">
        <el-input type="text" autocomplete="false" v-model="registerForm.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pwd">
        <el-input type="password" v-model="registerForm.pwd" autocomplete="false" show-password
                  placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="checkPass">
        <el-input
            type="password"
            v-model="registerForm.checkPass"
            autocomplete="off"
            show-password
            placeholder="Confirm Password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitRegister">Submit</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-link :underline="false" type="primary" @click="$router.push('/login')">Already have an account?</el-link>
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
  name: "Register",
  data() {
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
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please re-input password'))
      } else if (value !== this.registerForm.pwd) {
        callback(new Error('Error! Two passwords are not the same.'))
      } else {
        callback()
      }
    }
    store.dispatch("Finished");
    return {
      registerForm: {
        username: '',
        pwd: '',
        checkPass: '',
      },
      labelPosition: 'right',
      wrong: false,
      rules: {
        username: [{required: true, validator: checkUserName, trigger: 'blur'}],
        pwd: [{required: true, validator: checkPwd, trigger: 'blur'}],
        checkPass: [{required: true, validator: validatePwd, trigger: 'blur'}],
      },
    }
  },
  methods: {
    submitRegister() {
      this.$refs.registerForm.validate((valid) => {
        store.dispatch("Load")
        if (valid) {
          axios({
            async: false,
            url: "RegisterServlet",
            params: {
              name: this.registerForm.username,
              pwd: md5(this.registerForm.pwd)
            }
          }).then((res) => {
            if (res.data === true) {
              router.replace("/login")
            } else {
              this.wrong = true
            }
            store.dispatch("Finished")
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style>
.register-container {
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  background-clip: padding-box;
  margin: 180px auto;
  width: 500px;
  padding: 15px 35px 15px 35px;
}

.register-title {
  margin: 0px auto 20px auto;
  text-align: center;
}
</style>