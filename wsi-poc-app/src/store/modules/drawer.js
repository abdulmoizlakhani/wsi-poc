const state = {
  drawerIsOpen: false,
};

const mutations = {
  setDrawerState(state, isOpen) {
    state.drawerIsOpen = isOpen;
  },
};

const actions = {
  openDrawer({ commit }) {
    commit("setDrawerState", true);
    document.body.classList.add('disable-scroll');
  },
  closeDrawer({ commit }) {
    commit("setDrawerState", false);
    document.body.classList.remove('disable-scroll');
  },
};

const getters = {
  isDrawerOpen: (state) => state.drawerIsOpen,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
