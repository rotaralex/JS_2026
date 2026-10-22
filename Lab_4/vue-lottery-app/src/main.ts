import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './app/providers/router'
import { registerServices } from './app/providers/services'

// Реєструємо сервіси у ServiceProvider
registerServices()

const app = createApp(App)
const pinia = createPinia()

// Підключаємо плагін збереження стану
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
