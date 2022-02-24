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
      <update-rotation theme="outline" size="128" fill="#000000" :strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt"/>
    </div>
    <div class="update-container">
      <el-form ref="updateForm" :hide-required-asterisk="true" :label-position="'left'" :model="updateForm" :rules="rules"
               label-width="100px" status-icon style="width: 300px;">
        <h3 class="update-title">Update</h3>
        <el-form-item label="Password " prop="pwd">
          <el-input v-model="updateForm.pwd" autocomplete="false" placeholder="新密码" show-password
                    type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update">Update</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {UpdateRotation} from "@icon-park/vue-next";
import axios from "axios"
import router from "../router";
import {ref} from "vue";
import sha1 from "sha1";
import {ElNotification} from "element-plus";
import {useStore} from "vuex";


export default {
  name: "Update",
  components: {
    UpdateRotation,
  },
  data() {
    const store = useStore()
    let wrong = ref(false);
    let description = ref(null);
    const checkPwd = (rule, value, callback) => {
      const pwdPattern = /^[a-zA-Z0-9]{6,16}$/;
      setTimeout(() => {
        if (!pwdPattern.test(value)) {
          callback(new Error('[注意]密码为6-16位字母或数字'))
        } else {
          callback()
        }
      }, 100)
    }
    const update = () => {
      this.$refs.updateForm.validate((valid) => {
        if (valid) {
          store.dispatch("Load");
          axios({
            async: false,
            url: "/info/updatepwd",
            method: "POST",
            params: {
              pwd: sha1(this.updateForm.pwd)
              // pwd: this.updateForm.pwd
            }
          }).then((res) => {
            ElNotification({
              title: 'Success',
              message: res.data['msg'],
              type: 'success',
            })
            router.push("/")
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
    store.dispatch("Finished")

    return {
      update,
      wrong,
      description,
      updateForm: {
        pwd: '',
      },
      rules: {
        pwd: [{required: true, validator: checkPwd, trigger: 'blur'}],
      },
    };
  }
}
</script>

<style>
.update-container {
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
</style>