<template>
  <div>
    <transition mode="out-in" name="slide-fade">
      <div v-if="show">
        <el-card v-for="(i,idx) in data" class="box-card">
          <el-descriptions
              :column="3"
              :size="'48'"
              border
              class="margin-top"
          >
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  Language&Mode
                </div>
              </template>
              <el-tag :type="nameMap[i['lang']][1]" size="large">{{ nameMap[i['lang']][0] }}</el-tag>
              &nbsp;
              <el-tag :type="nameMap[i['mode']][1]" size="large">{{ nameMap[i['mode']][0] }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  Sample
                </div>
              </template>
              {{ i['sample'] }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  Time
                </div>
              </template>
              {{ new Date(i['time']).format("yyyy年MM月dd日 hh:mm:ss") }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  Status
                </div>
              </template>
              <el-tag :type="nameMap[i['status']][1]" size="large">{{ nameMap[i['status']][0] }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  Control
                </div>
              </template>
              <el-button type="primary" @click="copyCode(i['code'])">Copy Code</el-button>
              <el-button type="success" @click="showAnimation(i['sample'],i['animation'],i['mode'])">Show Animation
              </el-button>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
      <div v-else>
        <el-button type="success" @click="toggle">
          <left :strokeWidth="3" fill="#fff" size="16" strokeLinecap="butt" strokeLinejoin="miter" theme="outline"/>
          Back
        </el-button>
        <array-core v-if="!show && type === 'array'" :key="type" :dta="dta" :enable-info="false" :infos="[]"
                    :mvs='mvs'></array-core>
        <tree-core v-if="!show && type === 'tree'" :key="type" :dta="dta" :enable-info="false" :infos="[]"
                   :mvs='mvs'></tree-core>
      </div>
    </transition>
  </div>
</template>

<script>
import {useStore} from "vuex";
import axios from "axios";
import {ElNotification} from "element-plus";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {Left} from "@icon-park/vue-next";
import ArrayCore from './algos/animate/array-core.vue'
import TreeCore from './algos/animate/tree-core.vue'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    let data = ref([])
    let show = ref(true)
    let type = ref(null)
    let mvs = ref(null)
    let dta = ref(null)
    let validMessageReg = /^(([\w]+\((([\d]+,)*[\d]+)*\)):)*[\w]+\((([\d]+,)*[\d]+)*\)$/
    const nameMap = {
      'java': ["Java", undefined],
      'cpp': ["C++", "info"],
      'python': ["Python", "warning"],
      'array': ["数组(Array)", "info"],
      'tree': ["二叉树(Tree)", "warning"],
      'graph': ["图(Graph)", undefined],
      0: ["Pending", "info"],
      1: ["Success", "success"],
      2: ["Failure", "error"]
    }
    Date.prototype.format = function (fmt) {
      let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
      return fmt;
    }
    axios({
      url: "/info/tasks",
    }).then((res) => {
      store.dispatch("Finished")
      data.value = res.data
    }).catch((err) => {
      ElNotification({
        title: 'Error',
        message: err.response.data['msg'],
        type: 'error',
      })
      router.push("/")
    })
    const copyCode = (content) => {
      let txa = document.createElement('textarea')
      txa.value = content
      document.body.appendChild(txa)
      txa.select()
      document.execCommand('copy')
      document.body.removeChild(txa)
      ElNotification({
        title: 'Success',
        message: "Code Copy Successful",
        type: 'success',
      })
    }
    const toggle = function () {
      show.value = !show.value
    }
    const showAnimation = function (sample, animation, mode) {
      if (!validMessageReg.test(animation)) {
        ElNotification({
          title: 'Error',
          message: "Wrong Animation or No Output",
          type: 'error',
        })
        return
      }
      mvs.value = animation.split(':')
      dta.value = sample.split(',')
      type.value = mode
      toggle()
    }
    return {
      type,
      mvs,
      dta,
      show,
      data,
      nameMap,
      copyCode,
      toggle,
      showAnimation
    }
  },
  components: {
    ArrayCore,
    TreeCore,
    Left
  }
}
</script>
<style scoped>
.box-card {
  margin-bottom: 20px;
}

.slide-fade-enter-active {
  transition: all 0.5s cubic-bezier(0, .50, .50, 1);
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0, .50, .50, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(200px);
  opacity: 0;
}

</style>