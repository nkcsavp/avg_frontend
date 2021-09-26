import { createRouter, createWebHashHistory} from 'vue-router';

import Home from '../components/home.vue';
import Mine from '../components/mine.vue';
import Index from "../components/index.vue";
import Login from "../components/login.vue";
import Register from "../components/register.vue";
import SortCore from "../components/animate/sort-core.vue";
import Sort from "../components/algos/sort.vue"
import Tree from "../components/algos/tree.vue"


const routes=[
  {
    path: '/',
    component: Index
  },
  {
    path:'/home',
    component:Home,
    children:[
      {
        path: '/sort/:type',
        component:Sort,
      },
      {
        path: '/tree/:type',
        component:Tree,
      },
    ]
  },
  {
    path: '/mine',
    component: Mine
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/debug/s',
    component: SortCore,
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router