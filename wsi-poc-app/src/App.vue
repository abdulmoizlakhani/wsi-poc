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
  mounted() {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...arg) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(arg);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args) => target(prop, ...args);
        },
      });
    }
    const onLoad = function () {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = process.env.VUE_APP_CHATBOT_ID;
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
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
