// store.js
import Vue from "vue";
import Vuex from "vuex";

// Store Modules
import cart from "./modules/cart";
import product from "./modules/product";
import drawer from "./modules/drawer";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    cart,
    product,
    drawer,
  },
});

export default store;