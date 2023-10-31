const state = {
  items: [],
};

const mutations = {
  addItem(state, item) {
    state.items.push(item);
  },
  removeItem(state, item) {
    state.items = [...state.items].filter((i) => i.pid !== item.pid);
  },
};

const actions = {
  addItemToCart({ commit }, item) {
    commit("addItem", item);
  },
  removeItemFromCart({ commit }, item) {
    commit("removeItem", item);
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
