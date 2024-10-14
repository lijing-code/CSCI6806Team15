<template>
  <div id="home">
    <!-- Page Wrapper -->
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <!-- Adding Car information Http to the picture --- Jiawen Li 141024 -->
          <a href="https://en.wikipedia.org/wiki/Toyota_RAV4" target="_blank">
          <img class="d-block w-100" height="650" src="../assets/rav4.png" alt="First slide">
          </a>
        </div>
        <div class="carousel-item">
          <!-- Adding Car information Http to the picture --- Jiawen Li 141024 -->
          <a href="https://en.wikipedia.org/wiki/Honda_Civic" target="_blank">
          <img class="d-block w-100" height="650" src="../assets/civic.png" alt="First slide">
          </a>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <div id="start-shopping" class="container">
      <div class="row">
        <div class="col-12 text-left text-center">
          <h2 class="pt-3">Top Categories</h2>
        </div>
      </div>
      <div class="row">
        <div v-for="index in this.category_size" :key="index"
          class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
          <CategoryBox :category="categories[index - 1]">
          </CategoryBox>
        </div>
      </div>
    </div>

    <hr>
    <div class="container">
      <div class="row">
        <div class="col-12 text-left text-center">
          <h2 class="pt-3">Top Products</h2>
        </div>
      </div>
      <div class="row">
        <div v-for="index in this.product_size" :key="index"
          class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
          <ProductBox :product="products[index - 1]">
          </ProductBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from "../components/Product/ProductBox";
import CategoryBox from "../components/Category/CategoryBox";
export default {
  name: 'Home',
  components: { ProductBox, CategoryBox },
  props: ["baseURL", "products", "categories"],
  data() {
    return {
      category_size: 0,
      product_size: 0
    }
  },
  mounted() {
    this.category_size = this.categories.length;
    this.category_size = Math.min(6, this.category_size);

    this.product_size = this.products.length;
    this.product_size = Math.min(8, this.product_size);
  }
}
</script>

<style>
/* Add style to home page --- Jiawen Li 141024 */
#home {
  background-color: transparent;
  min-height: 100vh;
}

.carousel-inner img {
  border-radius: 20px;
  width: 80%;
  /* height: auto; */
  object-fit: cover;
}

.page-holder {
  min-height: 100vh;
}

.bg-cover {
  background-size: cover !important;
}

h2 {
  font-family: 'Josefin Sans', sans-serif;
}

/* For the image in the carousel */
.custom-carousel-img {
  max-width: 85%; /* Set max-width to limit image size */
  height: auto; /* Maintain aspect ratio */
  margin: 0 auto; /* Center the image horizontally */
  display: block;
}

/* Add margin to the sides of the carousel */
.carousel-inner {
  padding: 0 300px;
}

/* Adjust the arrows */
.custom-arrow {
  width: 80px; /* Make the arrow bigger */
  height: 80px;
  top: 50%; /* Center the arrow vertically */
  transform: translateY(-50%); /* Align it vertically */
  margin-left: -50px;
  margin-right: -50px;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: rgb(42, 149, 165); /* Change arrow color */
  background-size: 100%; /* Adjust the size */
  border-radius: 50%; /* Make the arrows circular */
}
</style>