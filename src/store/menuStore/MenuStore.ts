import {defineStore} from 'pinia'
import {getMenuMap} from "@/apis/menu/menuApi.ts";

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuMap: undefined
  }),
  getters: {},
  actions: {
    getMenuMap(): Promise<any> {
      if (!this.menuMap) {
        return getMenuMap().then(res => {
          if (res.code === 200 && res.data) {
            this.menuMap = res.data
          }
          return res.data
        })
      } else {
        return this.menuMap;
      }
    }
  }
})
