<template>
  <div v-loading.fullscreen.lock="isLoading">
    <navbar :key="store.state.isSignedIn"></navbar>
    <el-main>
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="el-fade-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </el-main>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import navbar from "./components/navbar.vue";

export default {
  setup() {
    const store = useStore();
    let isLoading = computed(() => {
      return store.state.isLoading;
    })

    const saveState = () => {
      sessionStorage.setItem('state', JSON.stringify(store.state))
    }
    onMounted(() => window.addEventListener('unload', saveState))
    return {
      store,
      status,
      isLoading,
    }
  },
  components: {
    navbar
  }
}
</script>
