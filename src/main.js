import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import '../src/assets/styles/main.sass'; // No necesitas importar los otros archivos sass aquí
import '@fortawesome/fontawesome-free/css/all.css';

import store from './store/store.js'

createApp(App).use(store).use(router).mount('#app')
