import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import '../src/assets/styles/main.sass'; // No necesitas importar los otros archivos sass aquí
import '@fortawesome/fontawesome-free/css/all.css';
import CanvasJSChart from '@canvasjs/vue-charts';

// install the CanvasJS Vuejs Chart Plugin

import store from './store/store.js'

createApp(App).use(store).use(router).use(CanvasJSChart).mount('#app')
