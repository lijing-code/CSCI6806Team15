<template>
  <div class="container">
    <!-- Logo Div -->
    <div class="row">
      <div class="col-12 text-center mt-3">
        <router-link :to="{ name: 'Home' }">
          <img id="logo" src="../assets/icon.png" />
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row pt-5 mt-2">
        <div id="signin-div" class="flex-item content-box">
          <!-- 用 flexbox 将 "Sign In" 和 QR Code 放在一行 -->
          <div class="d-flex align-items-center justify-content-center">
            <h2 class="text-center">Sign In</h2>
            <img src="../assets/front-end-link.png" alt="description of the image" class="qr-code ml-3">
          </div>
          <form @submit="signin" class="text-center pl-4 pr-4">
            <div class="form-group">
              <label class="label-text">E-Mail:</label>
              <input type="email" class="form-control" v-model="email" required />
            </div>
            <div class="form-group">
              <label class="label-text">Password:</label>
              <input type="password" class="form-control" v-model="password" required />
            </div>
            <button type="submit" class="btn-continue btn btn-primary mt-2 py-0">
              Continue
              <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </form>

          <!-- Google Sign In Button -->
          <div class="text-center my-3">
            <button @click="signInWithGoogle" class="btn google-signin-btn">
              <img src="../assets/GoogleSign.png" alt="Google logo" />
              Sign in with Google
            </button>
          </div>

          <hr />
          <small class="form-text text-muted pt-2 pl-4 text-center">New to Automobile Trading Center Group 15?</small>
          <p class="text-center">
            <router-link class="btn btn-dark text-center mx-auto px-5 py-1 mb-2" :to="{ name: 'Signup' }">Create Your Automobile Trading Account</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  name: "Signin",
  data() {
    return {
      email: null,
      password: null,
      loading: null,
    };
  },
  methods: {
    async signin(e) {
      e.preventDefault();
      this.loading = true;

      const user = {
        email: this.email,
        password: this.password,
      };

      try {
        const res = await axios.post(`/users/signin`, user);
        localStorage.setItem("token", res.data.token);
        this.$emit("fetchData");
        this.$router.push({ name: "Home" });
      } catch (err) {
        swal({
          text: "Unable to log you in!",
          icon: "error",
          closeOnClickOutside: false,
        });
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    signInWithGoogle() {
      // Redirect to the backend endpoint for Google OAuth2
      window.location.href = `/oauth2/authorization/google`;
    },

    checkOAuthRedirect() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.$root.fetchData(); // 调用根实例的 fetchData 方法更新数据
        this.$router.push({ name: "Home" });
      }
    }
  },

  mounted() {
    // this.loading = false;
    // console.log("Mounted lifecycle executed"); // For debugging
    // this.checkOAuthRedirect(); // Check for OAuth token in the URL
    this.checkOAuthRedirect();
  },
};
</script>

<style scoped>
.qr-code {
  width: 50px; /* 调整 QR Code 的大小 */
  height: auto; /* 保持宽高比例 */
  margin-left: 50px; /* 和 "Sign In" 保持间距 */
}

h2.text-center {
  margin: 0; /* 移除多余的顶部和底部间距 */
}
/* Styling for buttons and layout */
.google-signin-btn {
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 auto; /* 添加这行实现水平居中 */
}
.google-signin-btn img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.btn-dark {
  background-color: #e7e9ec;
  color: #000;
  font-size: smaller;
  border-radius: 0;
  border-color: #adb1b8 #a2a6ac #a2a6ac;
}

.btn-primary {
  background-color: #0c7fbb;
  color: white;
  border-color: #2cd3dc #0e5988 #1d6053;
  border-radius: 0;
}

#logo {
  width: 150px;
}

@media only screen and (min-width: 992px) {
  #signin-div {
    width: 40%;
  }
}

.content-box{ 
  padding: 20px 25px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.label-text{
  display: flex;
  justify-content: flex-start;
  color: #989494;
  margin-bottom: 10px;
  margin-top: 15px;
}
.ty-text{
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}
.btn-continue{
  border-radius: 5px;
  height: 35px;
  margin-top: 20px !important;
}
.create-btn{
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
  width: 320px;
  text-align: left;
  border-radius: 5px;
}
</style>