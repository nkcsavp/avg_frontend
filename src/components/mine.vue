<template>
  <div>
    <transition mode="out-in" name="slide-fade">
      <div v-if="show">
        <el-card class="box-card">
          <el-row :align="'middle'" :gutter="15">
            <el-col :lg="5" :md="5" :sm="8" :xl="5" :xs="8">
              <el-select v-model="status" clearable placeholder="Status" style="width:100%">
                <el-option v-for="i in [0,1,2,3,4,5]" :label="nameMap[i][0]" :value="i">
                  <el-tag :type="nameMap[i][1]" size="large">{{ nameMap[i][0] }}</el-tag>
                </el-option>
              </el-select>
            </el-col>
            <el-col :lg="5" :md="5" :sm="8" :xl="5" :xs="8">
              <el-select v-model="lang" clearable placeholder="Lang" style="width:100%">
                <el-option v-for="i in ['java','python','cpp']" :label="nameMap[i][0]" :value="i">
                  <el-tag :type="nameMap[i][1]" size="large">{{ nameMap[i][0] }}</el-tag>
                </el-option>
              </el-select>
            </el-col>
            <el-col :lg="5" :md="5" :sm="8" :xl="5" :xs="8">
              <el-select v-model="mode" clearable placeholder="Mode" style="width:100%">
                <el-option v-for="i in ['array','tree','graph']" :label="nameMap[i][0]" :value="i">
                  <el-tag :type="nameMap[i][1]" size="large">{{ nameMap[i][0] }}</el-tag>
                </el-option>
              </el-select>
            </el-col>
            <el-col :lg="5" :md="5" :sm="8" :xl="5" :xs="8">
              <el-input v-model="tag" clearable placeholder="Tag" style="width:100%"/>
            </el-col>
            <el-col :lg="4" :md="4" :sm="8" :xl="4" :xs="8">
              <el-button style="width:100%" type="primary" @click="getData(1)">Search</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card v-for="(i,idx) in data" class="box-card">
          <el-descriptions
              :column="3"
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
              <el-tag :type="nameMap[Number(i['status'])][1]" size="large">{{
                  nameMap[Number(i['status'])][0]
                }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  Tag
                </div>
              </template>
              <div style="width: 200px;">
                {{ i['tag'] }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  Control
                </div>
              </template>
              <el-button type="primary" @click="copyCode(i['code'])">Copy Code</el-button>
              <el-button v-show="i['status'] === 1" type="success"
                         @click="showAnimation(i['sample'],i['animation'],i['mode'])">Active Animation
              </el-button>
              <el-button v-show="i['status'] !== 1" disabled type="warning">Empty Animation</el-button>
              <el-button type="danger" @click="removeTask(i['identifier'])">Remove</el-button>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-empty v-show="data.length === 0" description="No Task"></el-empty>
        <el-row :align="'middle'" :gutter="15" justify="space-around">
          <el-col :lg="4" :md="4" :sm="8" :xl="4" :xs="8">
            <el-button :disabled="page === 1" style="width:200px" type="primary" @click="getData(page - 1)">Prev
            </el-button>
          </el-col>
          <el-col :lg="4" :md="4" :sm="8" :xl="4" :xs="8">
            <div style="text-align: center">
              <el-tag size="large" type="success">{{ page }}</el-tag>
            </div>
          </el-col>
          <el-col :lg="4" :md="4" :sm="8" :xl="4" :xs="8">
            <el-button :disabled="data.length === 0" style="width:200px" type="primary" @click="getData(page + 1)">Next
            </el-button>
          </el-col>
        </el-row>
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
    let pageSize = 5
    let page = ref(1)
    let validMessageReg = /^(([\w]+\((([\d]+,)*[\d]+)*\)):)*[\w]+\((([\d]+,)*[\d]+)*\)$/

    let status = ref("")
    let tag = ref("")
    let mode = ref("")
    let lang = ref("")

    const nameMap = {
      'java': ["Java", undefined],
      'cpp': ["C++", "info"],
      'python': ["Python", "warning"],
      'array': ["数组(Array)", "info"],
      'tree': ["二叉树(Tree)", "warning"],
      'graph': ["图(Graph)", undefined],
      0: ["Pending", "info"],
      1: ["Success", "success"],
      2: ["TimeOut", "danger"],
      3: ["Error", "danger"],
      4: ["Empty", "warning"],
      5: ["Invalid Format", "warning"]

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
    const removeTask = (id) => {
      store.dispatch("Load")
      axios({
        url: "/info/tasks/remove",
        params: {
          identifier: id
        }
      }).then((res) => {
        getData(page.value)
        store.dispatch("Finished")
        ElNotification({
          title: 'Success',
          message: res.data['msg'],
          type: 'success',
        })
      }).catch((err) => {
        store.dispatch("Finished")
        ElNotification({
          title: 'Error',
          message: err.response.data['msg'],
          type: 'error',
        })
      })
    }
    const getData = (newPage) => {
      store.dispatch("Load")
      page.value = newPage;
      axios({
        url: "/info/tasks",
        params: {
          start: (page.value - 1) * pageSize,
          length: pageSize,
          tag: tag.value.length === 0 ? null : tag.value,
          status: status.value.length === 0 ? null : status.value,
          mode: mode.value.length === 0 ? null : mode.value,
          lang: lang.value.length === 0 ? null : lang.value
        }
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
    }
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
      mvs.value = animation.split(':')
      dta.value = sample.split(',')
      type.value = mode
      toggle()
    }
    getData(1);
    return {
      type,
      mvs,
      dta,
      show,
      data,
      nameMap,
      page,
      status,
      mode,
      lang,
      tag,
      copyCode,
      toggle,
      showAnimation,
      getData,
      removeTask
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

.el-select-dropdown__item {
  padding-left: 10px;
}

.slide-fade-enter-active {
  transition: all 0.5s cubic-bezier(0, .50, .50, 1);
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0, .50, .50, 1);
}


.slide-fade-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}

.slide-fade-enter-from {
  transform: translateX(-200px);
  opacity: 0;
}

</style>