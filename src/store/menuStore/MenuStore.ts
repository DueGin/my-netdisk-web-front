import {defineStore} from 'pinia'
import {getMenuFlatMap, getMenuMap} from "@/apis/menu/menuApi.ts";

interface MenuStore {
  menuMap: object | undefined,
  menuList: Array<any> | object,
  menuFlatMap: object
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuStore => ({
    menuMap: undefined,
    menuList: {},
    menuFlatMap: {}
  }),
  getters: {},
  actions: {
    getMenuMap(): Promise<any> {
      if (!this.menuMap) {
        return new Promise<object>(resolve => {
          getMenuMap().then(res => {
            if (res.code === 200 && res.data) {
              this.menuMap = res.data;
            } else {
              this.menuMap = {};
            }
            resolve(<object>this.menuMap);
          })
        })
      } else {
        return new Promise(resolve => resolve(this.menuMap));
      }
    },
    // handleMenuList() {
    //   let menuList: any[] = [];
    //   if (this.menuMap) {
    //     for (let menuMapKey in this.menuMap) {
    //       let menus = (this.menuMap as any)[menuMapKey];
    //       if (menus) {
    //         let flatMenuList = this.getFlatList(menus)
    //         menuList = [...menuList, ...flatMenuList];
    //       }
    //     }
    //
    //   }
    // },
    // getFlatList(list: any[]): any[] {
    //   let newMenuList: any[] = JSON.parse(JSON.stringify(list));
    //   return newMenuList.flatMap(item => [item, ...(item.children ? this.getFlatList(item.children) : [])]);
    // },
    getMenuFlatMap(): Promise<any> {
      if (this.menuFlatMap) {
        return new Promise<any>(resolve => {
          getMenuFlatMap().then(res => {
            if (res.data) {
              this.menuFlatMap = res.data
              resolve(this.menuFlatMap);
            } else {
              resolve(this.menuMap);
            }
          })
        })
      } else {
        return new Promise<any>(this.menuFlatMap);
      }
    }
  }
})
