<template>
  <main data-test="product-list" class="p-8 mx-auto">
    <div
      v-if="!loading"
      class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center gap-8"
    >
      <single-product
        data-test="single-product"
        v-for="product in products"
        :product="product"
        :key="product.pid"
      />
    </div>
    <p v-if="loading">Loading products...</p>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SingleProduct from "../components/Product";

export default {
  name: "product-list",
  components: {
    SingleProduct,
  },
  methods: {
    ...mapActions("product", ["fetchProducts"]),
  },
  computed: {
    ...mapState("product", ["products", "loading"]),
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
