import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { productList } from "../../assets/dummy-data";
import SideDrawer from "../SideDrawer.vue";
import CartModule from "../../store/modules/cart";
import DrawerModule from "../../store/modules/drawer";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("SideDrawer.vue", () => {
  const productArray = Object.values(productList).filter(
    (item, i) => typeof item === "object"
  );
  const containerClasses = "bg-black w-full h-full absolute top-0 opacity-60";

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
      items: [productArray[0], productArray[2], productArray[3]],
    };
    modules.drawer.state = {
      drawerIsOpen: false,
    };

    modules.cart.actions = {
      increaseQuantity: jest.fn(),
      decreaseQuantity: jest.fn(),
    };
    modules.drawer.actions = {
      closeDrawer: jest.fn(),
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

  it("renders SideDrawer correctly", () => {
    const wrapper = shallowMount(SideDrawer, {
      store,
      localVue,
      data: function () {
        return { containerClasses };
      },
    });
    expect(wrapper.find('[data-test="side-drawer-container"]').exists()).toBe(
      true
    );
  });

  it('calls store action "closeDrawer" when "Drawer Overlay" is clicked', () => {
    const wrapper = shallowMount(SideDrawer, {
      store,
      localVue,
      data: function () {
        return { containerClasses };
      },
    });
    const overlay = wrapper.find('[data-test="side-drawer-overlay"]');
    overlay.trigger("click");
    expect(modules.drawer.actions.closeDrawer).toHaveBeenCalled();
  });
});
