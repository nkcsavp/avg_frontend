<template>
  <div v-show="loaded">
    <el-row :align="'middle'" :gutter="15">
      <el-col :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
        <div class="title-frame">
          <el-row :align="'middle'" :gutter="15">
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <h1>{{ dict[type] }}</h1>
            </el-col>
            <transition mode="out-in" name="el-fade-in">
              <div v-show="confirm">
                <el-col :lg="2" :md="2" :sm="12" :xl="2" :xs="12">
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
      <div v-if="confirm">
        <graph-core :key="type" :dta="dta" :enable-info="true" :infos="infos" :mvs='mvs' :rel="rel"></graph-core>
      </div>
      <div v-else class="sample-frame">
        <el-row :align="'middle'" :gutter="15">
          <el-col :lg="2" :md="2" :sm="12" :xl="2" :xs="12">
            <el-tooltip content="在此输入测试样例，点击右侧按钮确认" placement="top">
            <span>Data<help :strokeWidth="4" fill="#000000" size="16" strokeLinecap="butt" strokeLinejoin="miter"
                            theme="outline"/></span>
            </el-tooltip>
          </el-col>
          <el-col :lg="22" :md="22" :sm="24" :xl="22" :xs="24">
            <el-form ref="sampleFormRef" :hide-required-asterisk="true" :model="sampleForm" :rules="rules" :rel="rel" label-position="right"
                     label-width="120px" status-icon>
              <el-form-item label="Sample" prop="sample">
                <el-input v-model="sampleForm.sample" autocomplete="false" placeholder="Sample" type="text">
                </el-input>
              </el-form-item>
              <el-form-item label="Start" prop="start">
                <el-input v-model="sampleForm.start" autocomplete="false" placeholder="Start" type="text">
                </el-input>
              </el-form-item>
              <el-form-item label="Relation" prop="relation" style="margin-bottom: 0px;">
                <el-input v-model="sampleForm.relation" autocomplete="false" placeholder="Relation" type="text">
                  <template #append>
                    <el-button style="font-size: 16px;vertical-align: middle" type="primary" @click="toggle">
                      <double-down :strokeWidth="3" fill="#000000" size="16" strokeLinecap="butt" strokeLinejoin="miter"
                                   theme="outline"/>
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </transition>
  </div>
</template>

<script>
import GraphCore from './animate/graph-core.vue'
import {useRoute} from "vue-router";
import {inject, onBeforeUpdate, onMounted, ref} from 'vue'
import {DoubleDown, Help} from "@icon-park/vue-next";
import {useStore} from "vuex";
import {getFunctions} from "../generator/graph.js";

export default {
  name: "graph",
  data() {
    const route = useRoute()
    const store = useStore()
    const dict = inject("dict_graph")
    let type = ref(route.params.type)
    let dta = ref([])
    let mvs = ref([])
    let infos = ref([])
    let rel = ref([])
    let confirm = ref(false);
    let loaded = ref(false)
    const checkSample = (rule, value, callback) => {
      const samplePattern = /^([0-9]+,)*([0-9]+)$/;
      setTimeout(() => {
        if (!samplePattern.test(value)) {
          callback(new Error('[注意]测试样例格式: \"1,2,3,4\"'))
        } else {
          callback()
        }
      }, 100)
    }
    const checkRelation = (rule, value, callback) => {
      const relationPattern = /^([0-9]+:[0-9]+,)*$/;
      setTimeout(() => {
        if (!relationPattern.test(value + ',') && value.length !== 0) {
          callback(new Error('[注意]测试样例格式: \"0:1,1:2\"'))
        } else {
          callback()
        }
      }, 100)
    }
    const checkStart = (rule, value, callback) => {
      const startPattern = /^([0-9]+)$/;
      setTimeout(() => {
        if (!startPattern.test(value)) {
          callback(new Error('[注意]测试样例格式: \"0\"'))
        } else {
          callback()
        }
      }, 100)
    }
    const sampleForm = {
      sample: "1,2,3,4",
      relation: "0:1,1:2",
      start: "0"
    }
    const rules = {
      sample: [{required: true, validator: checkSample, trigger: 'blur'}],
      relation: [{required: true, validator: checkRelation, trigger: 'blur'}],
      start: [{required: true, validator: checkStart, trigger: 'blur'}],
    }
    const toggle = () => {
      if (confirm.value) {
        confirm.value = !confirm.value;
      } else {
        this.$refs.sampleFormRef.validate((valid) => {
          if (valid) {
            mvs.value = []
            infos.value = []
            dta.value = sampleForm.sample.split(",").map(Number)
            rel.value = new Array(dta.value.length)
            for(let i = 0; i < dta.value.length; i++){
              rel.value[i] = new Array(dta.value.length).fill(0)
            }
            const start = Number(sampleForm.start)
            if(start >= dta.value.length){
              return;
            }
            let tempRelation = sampleForm.relation.split(",")
            tempRelation.forEach((e)=>{
              let edge = e.split(":")
              rel.value[Number(edge[0])][Number(edge[1])] = 1
            })
            getFunctions()[type.value](dta.value.concat(),rel.value,mvs,infos,start);
            confirm.value = !confirm.value;
          }
        })
      }
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
        type.value = route.params.type
        store.dispatch("Finished_frame")
        store.dispatch("Finished")
      }, 500)
    })
    return {
      confirm,
      loaded,
      dict,
      type,
      sampleForm,
      rules,
      toggle,
      dta,
      mvs,
      infos,
      rel
    }
  },
  components: {
    GraphCore,
    Help,
    DoubleDown
  },
  watch: {
    '$route.params'(newval) {
      this.loaded = false
    }
  },
}
</script>

<style scoped>
.sample-frame {
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

.el-button {
  padding: 6px 12px;
}
</style>