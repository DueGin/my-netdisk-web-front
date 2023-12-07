import {InjectionKey} from 'vue'
import {createStore, Store} from 'vuex'
import User from "@/model/user/User.ts";

// 为 store state 声明类型
export interface State {
  token: string,
  user?: User
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    token: <string>localStorage.getItem("token"),
    user: undefined
  },
  getters: {
    token: (state: State) => state.token,
    user: (state: State) => state.user,
  },
  mutations: {
    SET_TOKEN(state: State, value: string) {
      state.token = value;
      localStorage.setItem("token", value);
    },
    SET_USER(state: State, value:any) {
      state.user = value;
    }
  }
})
