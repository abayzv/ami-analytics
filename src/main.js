import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueApexCharts from "vue3-apexcharts";

// base url if production or development
const baseUrl = import.meta.env.PROD ? 'https://telkom-cms-website.test' : 'http://localhost:5174/src'

const app = createApp(App)
app.config.globalProperties = {
    baseUrl: (path) => `${baseUrl}${path}`
}
app.use(autoAnimatePlugin)
app.use(VueApexCharts);
app.mount('#app')
