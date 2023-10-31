<template>
  <main class="p-8 mx-auto">
    <div
      class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center gap-5"
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
import SingleProduct from "../components/Product";
import { productList } from "./../assets/dummy-data";

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
