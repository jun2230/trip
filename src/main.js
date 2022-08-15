import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

import './assets/css/index.css'
import "normalize.css"

createApp(App).use(router).use(pinia).mount('#app')
