<template>
  <div>
    <app-header />
    <product-list />
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import ProductList from "./views/ProductList.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    ProductList,
  },
};
</script>