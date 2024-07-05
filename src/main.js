import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Chart, registerables } from 'chart.js'

import App from './App.vue'

Chart.defaults.color = '#000000'
Chart.defaults.font.size = 15
Chart.register(...registerables)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
