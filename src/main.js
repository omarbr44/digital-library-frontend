import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

import { register } from 'swiper/element/bundle';
register();

import App from './App.vue'
import router from './router'

import './assets/base.css'

const app = createApp(App)


app.use(createPinia())
app.use(router)

app.mount('#app')
