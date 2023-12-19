import {createRouter, createWebHistory, Router, RouteRecordRaw, RouterOptions} from 'vue-router'
import MediaRouter from "@/router/components/MediaRouter.ts";
import HeaderLayout from "@/components/layout/headerLayout/HeaderLayout.vue";
import {h} from "vue";
import GroupRouter from "@/router/components/GroupRouter.ts";
//由于router的API默认使用了类型进行初始化，内部包含类型定义，所以本文内部代码中的所有数据类型是可以省略的
//RouterRecordRaw是路由组件对象

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    component: () => h(HeaderLayout, {isUseRouter: true}),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index.vue'),
      }
    ],
  }, {
    path: '/layout',
    name: 'Layout',
    component: () => import('@/components/layout/headerLayout/HeaderLayout.vue'),
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
  }, {
    path: '/',
    name: 'Manager',
    component: () => h(HeaderLayout, {isUseRouter: true}),
    children: [
      {
        path: 'user/manager',
        name: 'UserManager',
        component: () => import('@/views/user/userManage.vue'),
      },
      {
        path: 'group/manager',
        name: 'GroupManager',
        component: () => import('@/views/group/GroupManager.vue'),
      },
    ]
  }, {
    path: '/siderMenu',
    name: 'SiderMenu',
    component: () => import('@/components/layout/siderLayout/SiderLayout.vue'),
  }, {
    path: '/startMenu',
    name: 'StartMenu',
    component: () => import('@/components/startMenu/StartMenu.vue'),
  },
  {
    path: '/group',
    redirect: '/group/home',
    component: ()=> h(HeaderLayout, {isUseRouter: true}),
    children:[
      {
        path: 'home',
        name: 'GroupHome',
        component: ()=>import('@/views/group/Group.vue')
      }
    ]
  },
  MediaRouter,
  GroupRouter

]

// RouterOptions是路由选项类型
const options: RouterOptions = {
  history: createWebHistory(),
  routes,
}

// Router是路由对象类型
const router: Router = createRouter(options)

export default router
