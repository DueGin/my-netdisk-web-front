import {createApp} from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue';
import router from '@/router'


const app = createApp(App);

app.use(router)
    .mount('#app')
