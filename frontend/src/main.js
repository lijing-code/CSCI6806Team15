// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import axios from 'axios';
import swal from 'sweetalert';

// 设置 axios 的基础 URL
axios.defaults.baseURL = 'http://localhost:8080';

// 创建应用实例
const app = createApp(App);

// 全局请求拦截器：为每个请求自动添加 JWT Token 到 Authorization 头
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 从 localStorage 中获取 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 将 token 添加到请求头
      console.log('Request token:', token); // 打印 token
    } else {
        console.warn('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 全局响应拦截器：处理 401 错误并提示用户重新登录
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Error Response:', error.response);
    if (error.response && error.response.status === 401) {
        console.error('Authentication failed. Invalid token.');
      swal({
        text: "Session expired, please log in again.",
        icon: "warning",
        closeOnClickOutside: false,
      }).then(() => {
        localStorage.removeItem("token"); // 清除 token
        router.push({ name: "Signin" }); // 跳转到登录页面
      });
    } else {
        console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

// 将 axios 设置为全局变量，以便在应用的其他组件中可以直接使用 window.axios
window.axios = axios;

// 挂载应用并使用路由
app.use(router);
app.mount('#app');