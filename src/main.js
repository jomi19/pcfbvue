import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTippy from 'vue-tippy'

import 'tippy.js/dist/tippy.css'
import "@/style/button.scss"

createApp(App).use(store).use(router).use(VueTippy).mount('#app');
