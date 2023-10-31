import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

// Stylesheet
import "./assets/scss/style.scss";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
