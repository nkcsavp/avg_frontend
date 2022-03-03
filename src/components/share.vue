<template>
  <div v-show="loaded">
    <el-row :align="'middle'" :gutter="15">
      <el-col :lg="8" :md="8" :sm="12" :xl="8" :xs="12">
        <div class="title-frame">
          <el-row :align="'middle'" :gutter="15">
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <h1>
                <airplay :strokeWidth="3" fill="#000000" size="24" strokeLinecap="butt" strokeLinejoin="miter"
                         theme="outline"/>
                ShareKey
              </h1>
            </el-col>
            <transition mode="out-in" name="el-fade-in">
              <div v-show="show">
                <el-col :lg="4" :md="4" :sm="12" :xl="4" :xs="12">
                  <el-button style="font-size: 16px;vertical-align: middle" type="primary" @click="toggle">
                    <double-down :strokeWidth="3" fill="#fff" size="16" strokeLinecap="butt" strokeLinejoin="miter"
                                 theme="outline"/>
                  </el-button>
                </el-col>
              </div>
            </transition>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <transition mode="out-in" name="slide-fade">
      <div v-if="show">
        <array-core v-if="type === 'array'" :key="type" :dta="dta" :enable-info="false" :infos="[]"
                    :mvs='mvs'></array-core>
        <tree-core v-if="type === 'tree'" :key="type" :dta="dta" :enable-info="false" :infos="[]"
                   :mvs='mvs'></tree-core>
        <graph-core v-if="type === 'graph'" :key="type" :dta="dta" :enable-info="false" :infos="[]"
                    :mvs='mvs' :rel="rel"></graph-core>

      </div>
      <div v-else>
        <div class="share-frame">
          <el-row :align="'middle'" :gutter="15">
            <el-col :lg="2" :md="2" :sm="12" :xl="2" :xs="12">
              <el-tooltip content="在此输入其他人分享的ShareKey，点击右侧按钮确认" placement="top">
            <span>Key<help :strokeWidth="4" fill="#000000" size="16" strokeLinecap="butt" strokeLinejoin="miter"
                            theme="outline"/></span>
              </el-tooltip>
            </el-col>
            <el-col :lg="22" :md="22" :sm="24" :xl="22" :xs="24">
              <el-form ref="sampleFormRef" :hide-required-asterisk="true" :model="shareForm" :rules="rules" label-position="right"
                       label-width="120px" status-icon>
                <el-input v-model="shareForm.key" autocomplete="false" placeholder="Key" type="text">
                  <template #append>
                    <el-button style="font-size: 16px;vertical-align: middle" type="primary" @click="findTask(shareForm.key)">
                      <double-down :strokeWidth="3" fill="#000000" size="16" strokeLinecap="butt" strokeLinejoin="miter"
                                   theme="outline"/>
                    </el-button>
                  </template>
                </el-input>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <transition mode="out-in" name="slide-fade">
        <div v-if="showTask">
          <el-card class="box-card">
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
                <el-tag :type="nameMap[task['lang']][1]" size="large">{{ nameMap[task['lang']][0] }}</el-tag>
                &nbsp;
                <el-tag :type="nameMap[task['mode']][1]" size="large">{{ nameMap[task['mode']][0] }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    Sample
                  </div>
                </template>
                {{ getSample(task) }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    Time
                  </div>
                </template>
                {{ new Date(task['time']).format("yyyy年MM月dd日 hh:mm:ss") }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    Status
                  </div>
                </template>
                <el-tag :type="nameMap[Number(task['status'])][1]" size="large">{{
                    nameMap[Number(task['status'])][0]
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
                  {{ task['tag'] }}
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    Control
                  </div>
                </template>
                <el-button type="primary" @click="copyCode(task['code'])">Copy Code</el-button>
                <el-button v-show="task['status'] === 1" type="success"
                           @click="showAnimation(task['sample'],task['animation'],task['mode'])">Active Animation
                </el-button>
                <el-button v-show="task['status'] !== 1" disabled type="warning">Empty Animation</el-button>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import {useStore} from "vuex";
import axios from "axios";
import {ElNotification} from "element-plus";
import {ref, onBeforeUpdate, onMounted} from "vue";
import {DoubleDown, Help, Airplay} from "@icon-park/vue-next";
import ArrayCore from './algos/animate/array-core.vue'
import TreeCore from './algos/animate/tree-core.vue'
import GraphCore from './algos/animate/graph-core.vue'


export default {
  data() {
    const store = useStore()
    let task = ref({})
    let loaded = ref(false)
    let type = ref()

    let mvs = ref(null)
    let dta = ref(null)
    let rel = ref(null)

    let show = ref(false)
    let showTask = ref(false)


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
    const copyCode = (content) => {
      let txa = document.createElement('textarea')
      txa.value = content
      document.body.appendChild(txa)
      txa.select()
      document.execCommand('copy')
      document.body.removeChild(txa)
      ElNotification({
        title: 'Success',
        message: "代码复制成功",
        type: 'success',
      })
    }
    const findTask = function (identifier) {
      store.dispatch("Load")
      axios({
        url: "/share",
        params: {
          identifier: identifier
        }
      }).then((res) => {
        store.dispatch("Finished")
        if(res.data.length === 0){
          showTask.value = false
          ElNotification({
            title: 'Error',
            message: "错误的ShareKey，或对方取消了分享",
            type: 'error',
          })
        }
        else{
          task.value = res.data
          showTask.value = true
        }
      }).catch((err) => {
        store.dispatch("Finished")
        showTask.value = false
        ElNotification({
          title: 'Error',
          message: err.response.data['msg'],
          type: 'error',
        })
      })
    }
    const toggle = function () {
      show.value = !show.value
    }
    const showAnimation = function (sample, animation, mode) {
      mvs.value = animation.split(':')
      if(mode === "graph"){
        dta.value = sample.split('&')[0].split(',')
        rel.value = sample.split('&')[1].split(',')
      }
      else if(mode === "tree"){
        dta.value = sample.split(',').map((val)=>val === '0'?undefined:Number(val))
      }
      else{
        dta.value = sample.split(',')
      }
      type.value = mode
      toggle()
    }
    const getSample = (item) => {
      let needSep = false
      if(item.mode === "graph"){
        let raw = item.sample
        let splits = raw.split("&")
        let matrix = splits[1].split(",")
        const len = (splits[0].length + 1) / 2
        let result = splits[0] + "&"

        for(let i = 0; i < matrix.length; i++){
          if(Number(matrix[i]) === 1){
            let first = Math.floor(i / len)
            let second = i % len
            if(!needSep){
              needSep = true
            }
            else{
              result += ","
            }
            result += ( first + ":" + second )
          }
        }
        return result
      }
      return item.sample

    }
    const shareForm = {
      key: "",
    }
    const rules = {
      sample: [{required: true, trigger: 'blur'}],
    }
    onMounted(() => {
      setTimeout(() => {
        loaded.value = true
        store.dispatch("Finished_frame")
        store.dispatch("Finished")
      }, 500)
    })
    onBeforeUpdate(()=>{
      setTimeout(() => {
        loaded.value = true
        store.dispatch("Finished_frame")
        store.dispatch("Finished")
      }, 500)
    })
    return {
      mvs,
      dta,
      nameMap,
      rel,
      show,
      showTask,
      type,
      task,
      loaded,
      copyCode,
      toggle,
      showAnimation,
      getSample,
      findTask,
      shareForm,
      rules
    }
  },
  components: {
    ArrayCore,
    TreeCore,
    GraphCore,
    DoubleDown,
    Help,
    Airplay
  }
}
</script>
<style scoped>
.box-card {
  margin-top: 30px;
}

.share-frame {
  padding: 30px;
  border: 1px solid var(--el-border-color-base);
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  margin-top: 30px;
}

.title-frame {
  padding-left: 30px;
  border: 1px solid var(--el-border-color-base);
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
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


.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(150px);
  opacity: 0;
}


</style>