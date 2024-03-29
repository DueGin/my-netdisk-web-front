import {RouteRecordRaw} from "vue-router";
import router from "@/router";
import {useMenuStore} from "@/store/menuStore/MenuStore.ts";
import {getLayoutComponentMap} from "@/apis/layoutComponent/layoutComponentApi.ts";
import {defineAsyncComponent, h} from "vue";

const viewModules = import.meta.glob("@/views/**/*.vue");
const layoutModules = import.meta.glob("@/components/layout/**/*.vue");
console.log(viewModules, layoutModules)


/**
 * 处理注册路由
 */
export async function addDynamicMenuAndRoutes() {
  const menuStore = useMenuStore();
  let layoutComponentMap: any;
  await getLayoutComponentMap().then(res => {
    if (res.data) {
      layoutComponentMap = res.data;
    }
  })
  await menuStore.getMenuFlatMap().then(menuMap => {
    console.log("router init")

    for (let layoutComponentId in menuMap) {
      let menuList: any[] = menuMap[layoutComponentId];
      let layoutComponent = layoutComponentMap[layoutComponentId];


      // 处理布局
      let rootMenu: RouteRecordRaw = {
        path: '/',
        name: menuList[0].layoutComponent.name,
        children: [],
      }

      console.log("router layout==>")
      if (layoutComponent.hasSlot === 0 && layoutComponent.hasRouter === 1) {
        console.log(layoutModules[`/src/components/layout${layoutComponent.path}.vue`])
        rootMenu.component = layoutModules[`/src/components/layout${layoutComponent.path}.vue`];
      } else if (layoutComponent.hasSlot === 1 && layoutComponent.hasRouter === 1) {
        console.log(layoutModules[`/src/components/layout${layoutComponent.path}.vue`])
        // @ts-ignore
        rootMenu.component = h(defineAsyncComponent(layoutModules[`/src/components/layout${layoutComponent.path}.vue`]), {isUseRouter: true})
      }

      router.addRoute(rootMenu);

      // 处理子路由
      menuList.forEach(m => {
        let menu: RouteRecordRaw = {
          path: m.path,
          name: m.componentName,
          component: viewModules[`/src/views${m.componentPath}.vue`]
        }

        router.addRoute(m.layoutComponent.name, menu as unknown as RouteRecordRaw);

      })
    }
  })

}
