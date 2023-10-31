<template>
  <main class="p-8 mx-auto">
    <div
      class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center gap-5"
    >
      <single-product
        v-for="product in products"
        :product="product"
        :key="product.pid"
      />
    </div>
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
  computed: {
    ...mapState("product", ["products"]),
  },
  methods: {
    ...mapActions("product", ["selectProduct"]),
  },
};
</script>