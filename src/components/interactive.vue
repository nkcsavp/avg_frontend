<template>
  <div v-show="loaded">
    <el-row :align="'middle'" :gutter="15">
      <el-col :lg="8" :md="8" :sm="12" :xl="8" :xs="12">
        <div class="title-frame">
          <el-row :align="'middle'" :gutter="15">
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <h1>
                <api :strokeWidth="3" fill="#000000" size="24" strokeLinecap="butt" strokeLinejoin="miter"
                     theme="outline"/>
                自定义
              </h1>
            </el-col>
            <transition mode="out-in" name="el-fade-in">
              <div v-show="confirm">
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
      <div v-if="confirm">
        <array-core v-if="confirm && type === 'array'" :key="type" :dta="dta" :enable-info="false" :infos="infos"
                    :mvs='mvs'></array-core>
        <tree-core v-if="confirm && type === 'tree'" :key="type" :dta="dta" :enable-info="false" :infos="infos"
                   :mvs='mvs'></tree-core>
      </div>
      <code-frame v-else :init-code="codeSave" :init-lang="langSave" :init-mode="type" :init-sample="sampleSave"
                  :init-tag="tagSave" @submitted="submitted($event,data)"></code-frame>
    </transition>
  </div>
</template>

<script>
import ArrayCore from './algos/animate/array-core.vue'
import TreeCore from './algos/animate/tree-core.vue'
import CodeFrame from './code-frame.vue'
import {onMounted, ref} from 'vue'
import {Api, DoubleDown, Help} from "@icon-park/vue-next";
import {useStore} from "vuex";
import {ElNotification} from "element-plus";

export default {
  name: "interactive",
  data() {
    const store = useStore();
    let dta = ref([])
    let mvs = ref([])
    let infos = ref([])
    let type = ref('')
    let codeSave = ref(null)
    let langSave = ref(null)
    let sampleSave = ref(null)
    let tagSave = ref(null)
    let confirm = ref(false)
    let loaded = ref(false)
    const toggle = () => {
      confirm.value = !confirm.value
    }
    const submitted = (data) => {
      dta.value = data[0]
      mvs.value = data[1]
      type.value = data[2]
      codeSave.value = data[3]
      langSave.value = data[4]
      sampleSave.value = data[5]
      tagSave.value = data[6]
      toggle()
    }
    onMounted(() => {
      setTimeout(() => {
        loaded.value = true
        store.dispatch("Finished_frame")
        ElNotification({
          title: 'Info',
          dangerouslyUseHTMLString: true,
          message: "使用自定义功能前，建议<a class='.el-link' target='_blank' href=\"https://nkcsavp.github.io/User/\">阅读文档</a>",
          type: 'info',
          duration: 20*1000
        })
      }, 500)
    })
    return {
      confirm,
      loaded,
      codeSave,
      langSave,
      sampleSave,
      tagSave,
      type,
      toggle,
      submitted,
      dta,
      mvs,
      infos,
    }
  },
  components: {
    TreeCore,
    ArrayCore,
    CodeFrame,
    Help,
    DoubleDown,
    Api
  }
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