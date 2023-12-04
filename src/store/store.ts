import {InjectionKey} from 'vue'
import {createStore, Store} from 'vuex'

// 为 store state 声明类型
export interface State {
  token: string
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    token: localStorage.getItem("token"),
  },
  getters: {
    token: (state: State) => state.token
  },
  mutations: {
    SET_TOKEN(state: State, value: string) {
      state.token = value;
      localStorage.setItem("token", value);
    }
  }
})
