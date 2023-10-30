import {createRouter, createWebHistory, Router, RouteRecordRaw, RouterOptions} from 'vue-router'
//由于router的API默认使用了类型进行初始化，内部包含类型定义，所以本文内部代码中的所有数据类型是可以省略的
//RouterRecordRaw是路由组件对象
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'HelloWorld',
        component:()=>import('@/components/HelloWorld.vue'),
    },{
        path: '/layout',
        name: 'Layout',
        component:()=>import('@/components/layout/index.vue'),
    },{
        path: '/login',
        name: 'Login',
        component:()=>import('@/views/login/login.vue'),
    },{
        path: '/user_manage',
        name: 'UserManage',
        component:()=>import('@/views/user_manage/userManage.vue'),
    }
]

// RouterOptions是路由选项类型
const options: RouterOptions = {
    history: createWebHistory(),
    routes,
}

// Router是路由对象类型
const router: Router = createRouter(options)

export default router
