import { productList } from "../../assets/dummy-data";

const state = {
  products: productList,
  selectedProduct: null,
};

const mutations = {
  setSelectedProduct(state, product) {
    state.selectedProduct = product;
  },
};

const actions = {
  selectProduct({ commit }, product) {
    commit("setSelectedProduct", product);
  },
};

const getters = {
  products: (state) => state.products,
  selectedProduct: (state) => state.selectedProduct,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};