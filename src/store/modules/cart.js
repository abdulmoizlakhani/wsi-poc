const state = {
  items: [],
};

const mutations = {
  addItem(state, item) {
    state.items.push(item);
  },
};

const actions = {
  addItemToCart({ commit }, item) {
    commit("addItem", item);
  },
};

const getters = {
  cartItems: (state) => state.items,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};