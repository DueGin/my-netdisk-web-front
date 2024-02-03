import {createApp} from 'vue'
import './style.css'
import App from './App.vue';
import router from '@/router';
import {Icon} from '@iconify/vue';

import {createPinia} from "pinia";
import NProTable from "@/components/n-pro-table/NProTable.vue";
import NProForm from "@/components/n-pro-table/form/NProForm.vue";
// import '@/mock/index.ts'

const app = createApp(App);

app
  .use(createPinia())
  .use(router)

app.component('Icon', Icon)
  .component('n-pro-table', NProTable)
  .component('n-pro-form', NProForm)

app.mount('#app')
