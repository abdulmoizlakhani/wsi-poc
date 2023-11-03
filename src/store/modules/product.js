import axios from "axios";

const state = {
  products: [],
  loading: true,
};

const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setLoading(state, status) {
    state.loading = status;
  },
};

const actions = {
  async fetchProducts({ commit }) {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const products = response.data.map((product) => ({
        pid: `${product.title.toLowerCase().replace(/ /g, "_")}_${product.id}`,
        title: product.title,
        description: product.description,
        price: product.price,
        thumb_image: product.image,
      }));
      commit("setProducts", products);
      commit("setLoading", false);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  },
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
  mutations,
  actions,
  getters,
};
