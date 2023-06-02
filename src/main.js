import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import './assets/base.css'
import { register } from 'swiper/element/bundle';
register();
import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(createPersistedState())
const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')
