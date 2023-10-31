import Vue from "vue";
import VueRouter from "vue-router";
import ProductList from "../views/ProductList.vue";
import ProductDetail from "../views/ProductDetail.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: ProductList },
  { path: "/product-detail/:id", component: ProductDetail },
  // Add more routes as needed
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;