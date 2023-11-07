<template>
  <div data-test="app">
    <app-header
      :logoIcon="icon"
      :logoImage="logo"
      :cartIcon="cart"
      :cartItems="cartItems"
      :cartSubtotal="cartSubtotal"
      @onClickLogo="onClickLogo"
      @openDrawer="openDrawer"
    />
    <main data-test="product-list" class="p-8 mx-auto">
      <div
        class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center gap-8"
      >
        <single-product
          data-test="single-product"
          v-for="product in products"
          :product="product"
          :key="product.pid"
          :cartItems="cartItems"
          @addItemToCart="addItemToCart"
          @removeItemFromCart="removeItemFromCart"
          @onClickProductTile="onClickProductTile"
        />
      </div>
    </main>
    <side-drawer
      :isDrawerOpen="drawerStatus"
      :cartItems="cartItems"
      :cartSubtotal="cartSubtotal"
      @closeDrawer="closeDrawer"
      @increaseQuantity="increaseQuantity"
      @decreaseQuantity="decreaseQuantity"
    />
  </div>
</template>

<script>
import { productList } from "./assets/dummy-data";

// Components
import AppHeader from "./components/Header.vue";
import SideDrawer from "./components/SideDrawer.vue";
import SingleProduct from "./components/Product.vue";

export default {
  name: "App",
  data: function () {
    return {
      icon: require("./assets/ws_logo_icon.png"),
      logo: require("./assets/ws_horizontal.svg"),
      cart: require("./assets/grocery-store.png"),
      drawerStatus: false,
      cartItems: [],
      products: Array.from(productList)
    };
  },
  methods: {
    onClickLogo() {
      console.log("Clicked on logo, route to home!");
    },
    openDrawer() {
      this.drawerStatus = true;
    },
    closeDrawer() {
      this.drawerStatus = false;
    },
    increaseQuantity(itemId) {
      const item = this.cartItems.find((i) => i.pid === itemId);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity(itemId) {
      const item = this.cartItems.find((i) => i.pid === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        this.cartItems = [...this.cartItems].filter((i) => i.pid !== itemId);
      }
    },
    addItemToCart(product) {
      this.cartItems.push({ ...product, quantity: 1 });
    },
    removeItemFromCart(product) {
      this.cartItems = [...this.cartItems].filter((i) => i.pid !== product.pid);
    },
    onClickProductTile(product) {
      console.log("Clicked on product tile, route to product detail!", product);
      // this.$router.push(`/product-detail/${this.product.pid}`);
    },
  },
  computed: {
    cartSubtotal() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  components: {
    AppHeader,
    SideDrawer,
    SingleProduct,
  },
};
</script>
