import { createApp } from 'vue/dist/vue.esm-bundler';
import './style.css'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueApexCharts from "vue3-apexcharts";
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './pages/Dashboard.vue'

// base url if production or development
const baseUrl = import.meta.env.PROD ? 'https://telkom-cms-website.test' : 'http://localhost:5174/src'

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// create router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/dashboard/e49a81c9-f561-490a-9812-b007ecfcf3d2'},
        { path: '/dashboard', component: Dashboard},
        { path: '/dashboard/:id', component: Dashboard},
        { path: '/home', component: Home },
        { path: '/about', component: About }
    ],
})

const app = createApp(App)
app.config.globalProperties = {
    baseUrl: (path) => `${baseUrl}${path}`
}
app.use(router)
app.use(autoAnimatePlugin)
app.use(VueApexCharts);
app.mount('#app')
