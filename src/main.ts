import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SvgIcon from './components/SvgIcon/SvgIcon.vue'
import './assets/iconfont/iconfont.js'
const app = createApp(App)

app.use(router)
app.component('SvgIcon', SvgIcon);
app.mount('#app')
