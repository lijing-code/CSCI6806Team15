<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Search Results</h4>
      </div>
    </div>
    <div class="row">
      <div v-if="searchResults.length">
        <div
          v-for="product in searchResults"
          :key="product.id"
          class="justify-content-around d-flex"
        >
          <ProductBox :product="product" />
        </div>
      </div>
      <div v-else>
        <p>No products found for "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
</template>
<script>
import ProductBox from '@/components/Product/ProductBox.vue';
import axios from 'axios';

export default {
  name: 'SearchResults',
  components: {
    ProductBox,
  },
  // props: ["products"],
  data() {
    return {
      searchResults: [],
    };
  },
  created() {
    this.fetchSearchResults();
  },
  watch: {
    // Watch the route query for changes (e.g., when the search query changes)
    '$route.query.q': 'fetchSearchResults',
  },
  methods: {
    fetchSearchResults() {
      const searchQuery = this.$route.query.q;
      if (searchQuery) {
        axios
          .get(`/api/search?q=${searchQuery}`)
          .then(response => {
            this.searchResults = response.data;
            console.log(response.data);
            this.$router.push({ path: this.$route.path, query: {} });
          })
          .catch(error => {
            console.error('Error fetching search results:', error);
          });
      }
    },
  },
};
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

</style>