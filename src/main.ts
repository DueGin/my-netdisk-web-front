import {createApp} from 'vue'
import './style.css'
import App from './App.vue';
import router from '@/router';
import {Icon} from '@iconify/vue';
import {key, store} from "@/store/store.ts";
// import '@/mock/index.ts'

const app = createApp(App);

app.use(router)
  .use(store, key)

app.component('Icon', Icon)


app.mount('#app')
