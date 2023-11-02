import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { productList } from "../../assets/dummy-data";
import Product from "../Product.vue";
import CartModule from "../../store/modules/cart";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Product.vue", () => {
  const productArray = Object.values(productList).filter(
    (item, i) => typeof item === "object"
  );

  const propsData = { product: productArray[1] };
  let store;
  let modules = {
    cart: {
      actions: undefined,
      state: undefined,
    },
  };

  beforeEach(() => {
    modules.cart.state = {
      items: [productArray[0], productArray[2], productArray[3]],
    };

    modules.cart.actions = {
      addItemToCart: jest.fn(),
      removeItemFromCart: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        cart: {
          state: modules.cart.state,
          actions: modules.cart.actions,
          getters: CartModule.getters,
          namespaced: true,
        },
      },
    });
  });

  it("renders product correctly", () => {
    const wrapper = shallowMount(Product, { store, localVue, propsData });
    expect(wrapper.find('[data-test="product-container"]').exists()).toBe(true);
  });

  it('calls store action "addItemToCart" when "Add to Cart" button is clicked', () => {
    const wrapper = shallowMount(Product, { store, localVue, propsData });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(modules.cart.actions.addItemToCart).toHaveBeenCalled();
  });

  it('calls store action "removeItemFromCart" when "Remove from Cart" button is clicked', () => {
    const wrapper = shallowMount(Product, {
      store,
      localVue,
      propsData: { product: productArray[2] },
    });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(modules.cart.actions.removeItemFromCart).toHaveBeenCalled();
  });
});
