import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
// import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


const app = createApp(App)
app.use(ElementPlus)
app.use(VueAxios, axios)

app.mount('#app')

// import { createApp } from 'vue'
// import App from './App.vue'
//
// createApp(App).mount('#app')
