import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/dashboard.vue")
            }, {
                path: "/eventLog",
                name: "eventLog",
                meta: {
                    title: '事件记录'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/eventLog.vue")
            },  {
                path: "/realtimeData",
                name: "realtimeData",
                meta: {
                    title: '实时数据'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/realtimeData.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/monitor',
                name: 'monitor',
                meta: {
                    title: '实时监控'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/monitor.vue')
            }, {
                path: '/device',
                name: 'device',
                meta: {
                    title: '站点结构'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/device.vue')
            }, 
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;