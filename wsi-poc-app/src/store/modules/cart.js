const state = {
  items: [],
};

const mutations = {
  addItem(state, item) {
    state.items.push({ ...item, quantity: 1 });
  },
  removeItem(state, item) {
    state.items = [...state.items].filter((i) => i.pid !== item.pid);
  },
  incrementQuantity(state, itemId) {
    const item = state.items.find((i) => i.pid === itemId);
    if (item) {
      item.quantity++;
    }
  },
  decrementQuantity(state, itemId) {
    const item = state.items.find((i) => i.pid === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      state.items = [...state.items].filter((i) => i.pid !== itemId);
    }
  },
};

const actions = {
  addItemToCart({ commit }, item) {
    commit("addItem", item);
  },
  removeItemFromCart({ commit }, item) {
    commit("removeItem", item);
  },
  increaseQuantity({ commit }, itemId) {
    commit("incrementQuantity", itemId);
  },
  decreaseQuantity({ commit }, itemId) {
    commit("decrementQuantity", itemId);
  },
};

const getters = {
  cartItems: (state) => state.items,
  cartSubtotal: (state) => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
