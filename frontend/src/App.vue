<template>
  <Navbar :cartCount="cartCount" @resetCartCount="resetCartCount" v-if="!['Signup', 'Signin'].includes($route.name)" />
  <div style="min-height: 60vh">
    <router-view v-if="products && categories" :baseURL="baseURL" :products="products" :categories="categories" @fetchData="fetchData" />
  </div>
  <Footer v-if="!['Signup', 'Signin'].includes($route.name)" />
  <div id="app">
    <Chatbox /> <!-- Show Chatbox --- Jiawen Li 111124 -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Chatbox from './components/Chatbox.vue'; // Import Chatbox component --- Jiawen Li 111124
import axios from 'axios';

export default {
  data() {
    return {
      baseURL: "http://localhost:8080/",
      products: null,
      categories: null,
      cartCount: 0,
    };
  },

  components: {
    Navbar, // Properly register Navbar --- Jiawen Li 111124
    Footer, // Properly register Footer --- Jiawen Li 111124
    Chatbox // Properly register Chatbox --- Jiawen Li 111124
  },

  methods: {
    async fetchData() {
        try {
            // 请求产品数据
            const productResponse = await axios.get(`${this.baseURL}product/`);
            this.products = productResponse.data;

            // 请求类别数据
            const categoryResponse = await axios.get(`${this.baseURL}category/`);
            this.categories = categoryResponse.data;

            // 请求购物车数据，如果用户已登录
            const token = localStorage.getItem("token");
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const cartResponse = await axios.get(`${this.baseURL}cart/`);
                this.cartCount = Object.keys(cartResponse.data.cartItems).length;
            } else {
                console.log("User not logged in, skipping cart fetch.");
            }
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    },

    resetCartCount() {
        this.cartCount = 0;
    }
  },

  mounted() {
    // 页面加载时，检查 token 并设置 axios headers
    const token = localStorage.getItem("token");
    if (token) {
      console.log('Token exists in localStorage:', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('Token not found in localStorage');
    }
    this.fetchData();
  }
};
</script>

<style>
html {
  overflow-y: scroll;
}
</style>