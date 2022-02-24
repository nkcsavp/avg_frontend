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
                <el-col :lg="4" :md="4" :sm="12" :xl="4" :xs="12">
                  <el-button style="font-size: 16px" type="primary" @click="toggle">
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
        <sort-core :key="type" :dta="dta" :enable-info="true" :infos="infos" :mvs='mvs'></sort-core>
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
            <el-form ref="sampleFormRef" :hide-required-asterisk="true" :model="sampleForm" :rules="rules" label-position="right"
                     label-width="120px" status-icon>
              <el-form-item label="Sample" prop="sample" style="margin: 0">
                <el-input v-model="sampleForm.sample" autocomplete="false" placeholder="Sample" type="text">
                  <template #append>
                    <el-button style="font-size: 16px" type="primary" @click="toggle">
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
import sortCore from './animate/array-core.vue'
import {useRoute} from "vue-router";
import {inject, onMounted, ref} from 'vue'
import {DoubleDown, Help} from "@icon-park/vue-next";
import {useStore} from "vuex";
import {getFunctions} from "../generator/sort.js";

export default {
  name: "sort",
  data() {
    const route = useRoute();
    const store = useStore();
    const dict = inject("dict_sort")
    let type = ref(route.params.type)
    let dta = ref([])
    let mvs = ref([])
    let infos = ref([])
    let confirm = ref(false);
    let loaded = ref(false);
    const checkSample = (rule, value, callback) => {
      const samplePattern = /^([0-9],)*[0-9]$/;
      if (value === "") {
        return callback(new Error('Test case need to be like this: \"1,2,3,4,5\"'))
      }
      setTimeout(() => {
        if (!samplePattern.test(value)) {
          callback(new Error('Test case need to be like this: \"1,2,3,4,5\"'))
        } else {
          callback()
        }
      }, 100)
    }
    const sampleForm = {
      sample: "1,3,4,5,2"
    }
    const rules = {
      sample: [{required: true, validator: checkSample, trigger: 'blur'}],
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
            getFunctions()[type.value](dta.value.concat(),mvs,infos);
            confirm.value = !confirm.value;
          }
        })
      }
    }
    onMounted(() => {
      setTimeout(() => {
        loaded.value = true
        store.dispatch("Finished_frame")
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
      infos
    }
  },
  components: {
    sortCore,
    Help,
    DoubleDown
  },
  watch: {
    '$route.params'(newval) {
      this.type = newval.type;
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