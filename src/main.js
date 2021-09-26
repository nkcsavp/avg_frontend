import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import ElementPlus from 'element-plus'
import axios from "axios"
import 'element-plus/dist/index.css'
import store from './store/vuex.js'

axios.defaults.baseURL = "http://localhost:8080/"

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
