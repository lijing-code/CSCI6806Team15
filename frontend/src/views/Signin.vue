<template>
  <div class="container">
    <!--    Logo Div-->
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
          <h2 class="text-center pt-4 pl-4">Sign In</h2>
          <form @submit="signin" class="text-center pl-4 pr-4">
            <div class="form-group">
              <label class="label-text">E-Mail:</label>
              <input type="email" class="form-control" v-model="email" required />
            </div>
            <div class="form-group">
              <label class="label-text">Password:</label>
              <input type="password" class="form-control" v-model="password" required />
            </div>
            <!-- <small class="form-text text-muted ty-text">Automobile  Trading Center Group 15</small> -->
            <button type="submit" class="btn-continue btn btn-primary mt-2 py-0">
              Continue
              <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </form>
          <hr />
          <!-- <small class="form-text text-muted pt-2 pl-4 text-center">New to Automobile Trading Center Group 15?</small> -->
          <p class="text-center">
            <!-- <router-link :to="{ name: 'Signup' }" class="create-btn btn btn-dark text-center px-5 py-1 mb-2">Create Your
              Automobile Trading
              <br/>
              Center Group 15 Account</router-link> -->
              <router-link :to="{ name: 'Signup' }" class="create-btn btn btn-dark text-center px-5 py-1 mb-2">Create Your
              Automobile Trading</router-link>

              <!-- wt edit 14-42 line -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signin",
  props: ["baseURL"],
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

      await axios
        .post(`${this.baseURL}users/signin`, user)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.$emit("fetchData");
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          swal({
            text: "Unable to Log you in!",
            icon: "error",
            closeOnClickOutside: false,
          });
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.loading = false;
  },
};
</script>

<style scoped>
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

/* wt add 125-156 */
.content-box{ 
  padding: 20px 25px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.label-text{
  /* text-align: left !important; */
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
