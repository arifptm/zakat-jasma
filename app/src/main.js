/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'


const axiosInstance = axios.create({
  // baseURL: process.env.VUE_APP_API_URL,
  baseURL: "http://localhost:3001",
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
const app = createApp(App)
app.provide('axios', axiosInstance)

registerPlugins(app)

app.mount('#app')
