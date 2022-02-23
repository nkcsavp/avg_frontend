<template>
  <div v-loading="load" class="code-frame">
    <el-alert
        v-show="wrong"
        :description="description"
        show-icon
        title="Error"
        type="error"
    ></el-alert>
    <el-form ref="codeForm" :hide-required-asterisk="true" :model="codeForm" :rules="rules" label-position="left" label-width="100px"
             status-icon>
      <el-tooltip content="选择运行模式" placement="left" trigger="hover">
        <el-form-item label="Mode" prop="mode">
          <el-select v-model="codeForm.mode" placeholder="Mode">
            <el-option label="Array" value="array"></el-option>
            <el-option label="Tree" value="tree"></el-option>
            <!--            <el-option label="Graph" value="graph"></el-option>-->
          </el-select>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="选择语言" placement="left" trigger="hover">
        <el-form-item label="Language" prop="lang">
          <el-select v-model="codeForm.lang" placeholder="Language:">
            <el-option label="Java" value="java"></el-option>
            <el-option label="Python" value="python"></el-option>
            <el-option label="C++" value="cpp"></el-option>
          </el-select>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="输入测试样例(改变Mode会清空)" placement="left" trigger="click">
        <el-form-item label="Sample" prop="sample">
          <el-input v-model="codeForm.sample"></el-input>
        </el-form-item>
      </el-tooltip>
      <el-tooltip content="输入代码(改变Mode或Language会清空)" placement="top" trigger="click">
        <el-form-item label="Code" prop="codes">
          <div class="editor" style="width: 100%">
            <v-ace-editor
                v-model:value="codeForm.codes"
                lang="java"
                style="height: 300px"
                theme="xcode"
            />
          </div>
        </el-form-item>
      </el-tooltip>
      <el-form-item>
        <el-button type="primary" @click="submit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios"
import {VAceEditor} from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-xcode'
import {useStore} from "vuex"
import {ref, watch} from "vue";
import router from "../router";
import {ElNotification} from "element-plus";

export default {
  name: "code-frame",
  emits: [
    'submitted'
  ],
  props: {
    'initCode': String
  },
  data() {
    const config = {
      'java': {
        'tree': "BinaryTree bt = new BinaryTree();\n" +
            "BinaryTreeNode root = bt.getRoot();\n",
        'array': "DataList data = new DataList();\n",
      },
      'cpp': {
        'array': "int main(){\n" +
            "\tDataList data;\n" +
            "}",
        'tree': "int main(){\n" +
            "\tBinaryTree binaryTree;\n" +
            "\tBinaryTreeNode* root = binaryTree.getRoot();\n" +
            "}"
      },
      'python': {
        'array': "data = DataList()\n",
        'tree': "bt = BinaryTree()\n" +
            "root = bt.root\n"
      },
      'array': {
        sample: '5,4,3,2,1',
        reg: /^([0-9],)*[0-9]$/
      },
      'tree': {
        sample: '1,2,3,4,x,6',
        reg: /^([0-9x],)*[0-9x]$/
      }
    }

    const store = useStore()
    let mode = ref('array')
    let lang = ref("java")
    let load = ref(false)
    let sample = ref(config[mode.value].sample)
    let codes = ref(config[lang.value][mode.value])
    if (this.initCode !== null) {
      codes.value = this.initCode
    }
    let wrong = ref(false);
    let description = ref(null);
    let validMessageReg = /^(([\w]+\((([\d]+,)*[\d]+)*\)):)*[\w]+\((([\d]+,)*[\d]+)*\)$/

    const submit = () => {
      this.$refs.codeForm.validate((valid) => {
        if (!valid) {
          return;
        }
        load.value = true
        axios({
          url: "submit?lang=" + this.codeForm.lang + "&mode=" + this.codeForm.mode + "&sample=" + this.codeForm.sample.replaceAll('x', '-1'),
          method: 'POST',
          headers: {'content-type': 'text/plain'},
          data: this.codeForm.codes
        }).then((res) => {
          load.value = false
          if (res.data['msg'] === "") {
            wrong.value = true
            description.value = "Code does not Produced Any Moves"
            return;
          } else if (!validMessageReg.test(res.data['msg'])) {
            wrong.value = true
            description.value = "Wrong Animation Format, Do not print to stdout."
            return;
          }
          const ret = [sample.value.split(','), res.data['msg'].split(':'), mode.value, codes.value]
          this.$emit('submitted', ret)
        }).catch((err) => {
          load.value = false
          if (err.response.status === 403) {
            ElNotification({
              title: 'Error',
              message: err.response.data['msg'],
              type: 'error',
            })
            store.dispatch("LogOut")
            router.push("/login")
          } else if (err.response.status === 400) {
            wrong.value = true
            description.value = err.response.data['msg']
          } else {
            wrong.value = true
            description.value = "Unknown Error"
          }
        })
      })
    }
    const checkSample = (rule, value, callback) => {
      let samplePattern = config[mode.value].reg;
      if (value === "") {
        return callback(new Error('请输入测试样例'))
      }
      setTimeout(() => {
        if (!samplePattern.test(value)) {
          callback(new Error('测试样例格式： \"' + config[mode.value].sample + '\"'))
        } else {
          callback()
        }
      }, 100)
    }

    watch(mode, (newMode, old) => {
      sample.value = config[mode.value].sample
      codes.value = config[lang.value][mode.value]
    })
    watch(lang, (newLang, old) => {
      codes.value = config[lang.value][mode.value]
    })
    return {
      submit,
      load,
      wrong,
      description,
      codeForm: {
        mode,
        lang,
        codes,
        sample
      },
      rules: {
        sample: [{required: true, validator: checkSample, trigger: 'blur'}],
        lang: [{required: true, trigger: 'blur'}],
        codes: [{required: true, trigger: 'blur'}],
        mode: [{required: true, trigger: 'blur'}],
      }
    }
  },
  components: {
    VAceEditor
  }
}
</script>

<style scoped>
.code-frame {
  padding: 30px;
  border: 1px solid var(--el-border-color-base);
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin-top: 30px;
}

.editor {
  border-radius: var(--el-border-radius-base);
  padding: 2px;
  border: 1px solid var(--el-border-color-base);
  box-shadow: var(--el-box-shadow-light);
}

.el-alert {
  margin-bottom: 15px;
}
</style>