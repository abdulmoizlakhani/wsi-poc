import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import AppHeader from "../Header.vue";
import CartModule from "../../store/modules/cart";
import DrawerModule from "../../store/modules/drawer";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("AppHeader.vue", () => {
  let store;
  let modules = {
    cart: {
      actions: undefined,
      state: undefined,
    },
    drawer: {
      actions: undefined,
      state: undefined,
    },
  };

  beforeEach(() => {
    modules.cart.state = {
      items: [],
    };
    modules.drawer.state = {
      drawerIsOpen: false,
    };

    modules.drawer.actions = {
      openDrawer: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        cart: {
          state: modules.cart.state,
          actions: modules.cart.actions,
          getters: CartModule.getters,
          namespaced: true,
        },
        drawer: {
          state: modules.drawer.state,
          actions: modules.drawer.actions,
          getters: DrawerModule.getters,
          namespaced: true,
        },
      },
    });
  });

  it("renders header correctly", () => {
    const wrapper = shallowMount(AppHeader, { store, localVue });
    expect(wrapper.find('[data-test="header"]').exists()).toBe(true);
  });

  it('calls store action "openDrawer" when cart icon is clicked', () => {
    const wrapper = shallowMount(AppHeader, { store, localVue });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(modules.drawer.actions.openDrawer).toHaveBeenCalled();
  });
});
