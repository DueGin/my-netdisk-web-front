import {defineStore} from 'pinia'
import User from "@/model/user/User.ts";
import {getUserDetail} from "@/apis/user/userApi.ts";

// 为 store state 声明类型
export interface State {
  token: string | undefined,
  user?: User,
  sysRole?: string,
  groupRoleList?: Array<any>
}

// 定义 injection key
// export const key: InjectionKey<Store<State>> = Symbol()

export const useMainStore = defineStore('main', {
  state: (): State => ({
    token: <string>localStorage.getItem("token"),
    user: undefined,
    sysRole: undefined,
    groupRoleList: undefined
  }),
  getters: {},
  actions: {
    loadUser() {
      if(!this.user) {
        getUserDetail().then(res => {
          this.token = localStorage.getItem("token") as string;
          if (res.data) {
            this.user = res.data;
            this.sysRole = res.data.sysRole;
            this.groupRoleList = res.data.groupRoleList;
          }
        })
      }
    },
    clearAll(){
      this.$state = {
        token: undefined,
        user: undefined,
        sysRole: undefined,
        groupRoleList: undefined
      }
    }
  }
})
