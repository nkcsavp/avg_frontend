import {createRouter, createWebHashHistory} from 'vue-router';
import store from "../store";

const Index = () => import("../components/index.vue")
const Mine = () => import("../components/mine.vue")
const Update = () => import("../components/update.vue")
const Login = () => import("../components/login.vue")
const Register = () => import("../components/register.vue")
const Forget = () => import("../components/forget.vue")
const Sort = () => import("../components/algos/sort.vue")
const Tree = () => import("../components/algos/tree.vue")
const Graph = () => import("../components/algos/graph.vue")
const Interactive = () => import("../components/interactive.vue")
const Hello = () => import("../components/hello.vue")


const routes = [
    {
        path: '/',
        component: Index,
        children: [
            {
                path: '/',
                component: Hello
            },
            {
                path: '/interactive',
                component: Interactive,
            },
            {
                path: '/sort/:type',
                component: Sort,
            },
            {
                path: '/graph/:type',
                component: Graph,
            },
            {
                path: '/tree/:type',
                component: Tree,
            }
        ]
    },
    {
        path: '/mine',
        component: Mine
    },
    {
        path: '/update',
        component: Update
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/login/:info',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/forget',
        component: Forget,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {

    if (to.fullPath.search("sort|tree|graph|interactive") !== -1) {
        store.dispatch("Load_frame")
    } else {
        store.dispatch("Load")
    }
    if (to.fullPath.search("register|login|forget") !== -1) {
        if (!store.state.isSignedIn) {
            next();
        } else {
            router.push("/");
            next();
        }
    } else if (to.fullPath.search("mine|interactive|update") !== -1) {
        if (store.state.isSignedIn) {
            next();
        } else {
            router.push("/login?prompt=true");
            next();
        }
    } else {
        next();
    }
})
export default router