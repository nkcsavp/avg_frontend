import { createRouter, createWebHashHistory} from 'vue-router';

import Home from '../components/home.vue';
import Mine from '../components/mine.vue';
import Login from "../components/login.vue";
import Register from "../components/register.vue";
import SortCore from "../components/animate/sort-core.vue";
import Sort from "../components/algos/sort.vue"
import Tree from "../components/algos/tree.vue"

import store from "../store";


const routes=[
  {
    path: '/',
    component: Home,
    children:[
      {
        path: '/sort/:type',
        component:Sort,
      },
      {
        path: '/tree/:type',
        component:Tree,
      }
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
router.beforeEach((to,from,next)=>{

  store.dispatch("Load");
  if(to.fullPath.search("register|login") !== -1){
    if(!store.state.isSignedIn){
      next();
    }
    else{
      router.push("/");
    }
  }
  else if(to.fullPath.search("mine") !== -1){
    if(store.state.isSignedIn){
      next();
    }
    else{
      router.push("/");
    }
  }
  else{
    next();
  }
})
export default router