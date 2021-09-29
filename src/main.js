import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import ElementPlus from 'element-plus'
import axios from "axios"
import 'element-plus/dist/index.css'
import store from './store/vuex.js'

axios.defaults.withCredentials=true;
// 部署时使用以下代码
axios.defaults.baseURL = "/api/";
//本地调试时使用以下代码[注意，提交时不要泄露服务器IP]
// axios.defaults.baseURL = "http://localhost:8080/api/";

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
