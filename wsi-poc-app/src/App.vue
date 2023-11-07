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
    <router-view></router-view>
    <side-drawer
      :isDrawerOpen="isDrawerOpen"
      :cartItems="cartItems"
      :cartSubtotal="cartSubtotal"
      @closeDrawer="closeDrawer"
      @increaseQuantity="increaseQuantity"
      @decreaseQuantity="decreaseQuantity"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

// Components
import AppHeader from "wsi-poc-components/Header";
import SideDrawer from "wsi-poc-components/SideDrawer";

export default {
  name: "App",
  components: {
    AppHeader,
    SideDrawer,
  },
  data: function () {
    return {
      icon: require("./assets/ws_logo_icon.png"),
      logo: require("./assets/ws_horizontal.svg"),
      cart: require("./assets/grocery-store.png"),
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItems", "cartSubtotal"]),
    ...mapGetters("drawer", ["isDrawerOpen"]),
  },
  methods: {
    ...mapActions("drawer", ["openDrawer", "closeDrawer"]),
    ...mapActions("cart", ["increaseQuantity", "decreaseQuantity"]),
    onClickLogo() {
      this.$router.push("/");
    },
  },
};
</script>
