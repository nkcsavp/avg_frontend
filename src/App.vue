<template>
  <div>
    <navbar :key="store.state.isSignedIn"></navbar>

    <el-main v-loading="isLoading">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </el-main>
  </div>

</template>

<script>
import {useStore} from "vuex";
import {computed, onMounted, reactive, ref} from "vue";
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
  components:{
    navbar
  }

}
</script>
