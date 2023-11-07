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
        imgClass="h-[350px]"
        :cartItems="cartItems"
        @addItemToCart="addItemToCart"
        @removeItemFromCart="removeItemFromCart"
        @onClickProductTile="onClickProductTile"
      />
    </div>
    <p v-if="loading">Loading products...</p>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import SingleProduct from "wsi-poc-components/Product";

export default {
  name: "product-list",
  components: {
    SingleProduct,
  },
  methods: {
    ...mapActions("product", ["fetchProducts"]),
    ...mapActions("cart", ["addItemToCart", "removeItemFromCart"]),
    onClickProductTile(product) {
      this.$router.push(`/product-detail/${product.pid}`);
    },
  },
  computed: {
    ...mapGetters("cart", ["cartItems"]),
    ...mapState("product", ["products", "loading"]),
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
