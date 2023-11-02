import { productList } from "../../assets/dummy-data";

const state = {
  products: productList,
};

const getters = {
  products: (state) => state.products,
  getProductById: (state) => (pid) => {
    const productArray = Object.values(state.products).filter(item => typeof item === 'object');
    return productArray.find(product => product.pid === pid);
  },
};

export default {
  namespaced: true,
  state,
  getters,
};