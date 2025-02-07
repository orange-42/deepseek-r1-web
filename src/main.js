import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import './index.css'
import router from './router'

const pinia = createPinia()

createApp(App).use(Antd).use(pinia).use(router).mount('#app')
