import {createApp} from 'vue'
import './style.css'
import App from './App.vue';
import router from '@/router';
import {Icon} from '@iconify/vue';
import '@/mock/index.ts'

const app = createApp(App);

app.use(router)

app.component('Icon', Icon)


app.mount('#app')
