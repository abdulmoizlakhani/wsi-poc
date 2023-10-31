<template>
  <main class="p-10 mx-auto max-w-7xl">
    <div
      class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center gap-4"
    >
      <single-product
        v-for="product in products"
        v-bind:product="product"
        v-bind:key="product.id"
      />
    </div>
  </main>
</template>

<script>
import SingleProduct from "./Product.vue";
import { productList } from "./../data/productList.js";

export default {
  name: "product-list",
  components: {
    SingleProduct,
  },
  data: function () {
    return { products: productList };
  },
};
</script>
