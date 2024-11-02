import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios';
import swal from 'sweetalert';
// import "bootstrap"
// import "bootstrap/dist/css/bootstrap.min.css"


window.axios = axios;

createApp(App).use(router).mount('#app');

window.axios.defaults.baseURL = 'http://localhost:8080';//加入链接前后端，AT




