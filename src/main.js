import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Chart, registerables } from 'chart.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import App from './App.vue'

library.add(faCaretUp, faCaretDown)

Chart.defaults.color = '#000000'
Chart.defaults.font.size = 15
Chart.register(...registerables)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
