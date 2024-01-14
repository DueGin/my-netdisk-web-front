import { defineStore } from 'pinia'
import User from "@/model/user/User.ts";

// 为 store state 声明类型
export interface State {
  token: string,
  user?: User
}

// 定义 injection key
// export const key: InjectionKey<Store<State>> = Symbol()

export const useMainStore = defineStore('main',{
  state: ()=>({
    token: <string>localStorage.getItem("token"),
    user: undefined
  }),
  getters: {

  },
  actions: {

  }
})
