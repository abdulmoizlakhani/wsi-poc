import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

// Stylesheet
import "wsi-poc-components/styles";
import "./assets/scss/tailwind.scss";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
