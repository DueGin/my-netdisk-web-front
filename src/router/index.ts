import {createRouter, createWebHistory, Router, RouteRecordRaw, RouterOptions} from 'vue-router'
import HeaderLayout from "@/components/layout/headerLayout/HeaderLayout.vue";
import {h} from "vue";
import {addDynamicMenuAndRoutes} from "@/utils/router/RouterUtil.ts";
import {useMenuStore} from "@/store/menuStore/MenuStore.ts";
import {useMainStore} from "@/store/store.ts";
//由于router的API默认使用了类型进行初始化，内部包含类型定义，所以本文内部代码中的所有数据类型是可以省略的
//RouterRecordRaw是路由组件对象

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   component: () => h(HeaderLayout, {isUseRouter: true}),
  //   // component: () => h(defineAsyncComponent(() => import('@/components/layout/headerLayout/HeaderLayout.vue'))
  //   //   , {isUseRouter: true}),
  //   redirect: '/index',
  //   children: [
  //     {
  //       path: '/index',
  //       name: 'Index',
  //       component: () => import('@/views/index.vue'),
  //     }
  //   ],
  // },
  // {
  //   path: '/layout',
  //   name: 'Layout',
  //   component: () => import('@/components/layout/headerLayout/HeaderLayout.vue'),
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/sys',
    component: () => h(HeaderLayout, {isUseRouter: true}),
    children: [
      // {
      //   path: 'user/manager',
      //   name: 'UserManager',
      //   component: () => import('@/views/sys/user/userManage.vue'),
      // },
      // {
      //   path: 'group/manager',
      //   name: 'GroupManager',
      //   component: () => import('@/views/sys/group/GroupManager.vue'),
      // },
      {
        path: 'dictType',
        name: 'DictType',
        component: () => import('@/views/sys/DictType/index.vue')
      },
      {
        path: 'dict',
        name: 'SySDict',
        component: () => import('@/views/sys/dict/index.vue')
      },
      {
        path: 'menu',
        name: 'SysMenu',
        component: () => import('@/views/sys/menu/index.vue')
      },
      {
        path: 'layoutComponent',
        name: 'LayoutComponent',
        component: () => import('@/views/sys/layoutComponent/index.vue')
      }
    ]
  },
  {
    path: '/test',
    component: h(HeaderLayout, {isUseRouter: true}),
    children: [
      {
        path: 'exifr',
        name: 'exifrTest',
        component: () => import('@/views/test/exifrTest.vue')
      }
    ]
  },
  // MediaRouter,
  // GroupRouter
]


// RouterOptions是路由选项类型
const options: RouterOptions = {
  history: createWebHistory(),
  routes,
}

// Router是路由对象类型
const router: Router = createRouter(options)

// @ts-ignore
router.beforeEach(async (to, from, next) => {
  // 登录的时候不load路由
  if (to.path === '/login') {
    console.log('login')
    next()
    return;
  }
  let menuStore = useMenuStore();
  if (!menuStore.$state.menuMap) {
    // 加载菜单并存入store
    await menuStore.getMenuMap().then(async () => {
      await addDynamicMenuAndRoutes();
      console.log('已注册路由', router.getRoutes())
    });
    useMainStore().loadUser();
    console.log("==")
    next({...to, replace: true})
    return;
  }

  next();
})


export default router
