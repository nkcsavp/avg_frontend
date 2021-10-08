import { createRouter, createWebHashHistory} from 'vue-router';

import Index from '../components/index.vue';
import Mine from '../components/mine.vue';
import Login from "../components/login.vue";
import Register from "../components/register.vue";
import SortCore from "../components/algos/animate/sort-core.vue";
import Sort from "../components/algos/sort.vue"
import SortInteractive from "../components/algos/interactive/sort-interactive.vue"
import Hello from "../components/hello.vue"

import store from "../store";


const routes=[
  {
    path: '/',
    component: Index,
    children:[
      {
        path: '/',
        component: Hello
      },
      {
        path: '/sort/interactive',
        component:SortInteractive,
      },
      {
        path: '/sort/:type',
        component:Sort,
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