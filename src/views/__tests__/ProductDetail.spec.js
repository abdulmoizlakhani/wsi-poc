import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { productList } from "../../assets/dummy-data";
import ProductDetail from "../ProductDetail.vue";
import ProductModule from "../../store/modules/product";
import CartModule from "../../store/modules/cart";

const localVue = createLocalVue();

localVue.use(Vuex);

const $route = {
  params: {
    productId: "apilco-porcelain-ramekin",
  },
};

describe("ProductDetail.vue", () => {
  const productArray = Object.values(productList).filter(
    (item) => typeof item === "object"
  );

  let store;
  let modules = {
    cart: {
      actions: undefined,
      state: undefined,
    },
    product: {
      actions: undefined,
      state: undefined,
    },
  };

  beforeEach(() => {
    modules.cart.state = {
      items: [{ ...productArray[0], quantity: 1 }],
    };
    modules.product.state = {
      products: productList,
    };

    modules.cart.actions = {
      increaseQuantity: jest.fn(),
      decreaseQuantity: jest.fn(),
      addItemToCart: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        cart: {
          state: modules.cart.state,
          actions: modules.cart.actions,
          getters: CartModule.getters,
          namespaced: true,
        },
        product: {
          state: modules.product.state,
          actions: modules.product.actions,
          getters: ProductModule.getters,
          namespaced: true,
        },
      },
    });
  });

  it("renders ProductDetail correctly", () => {
    const wrapper = shallowMount(ProductDetail, {
      store,
      localVue,
      mocks: {
        $route,
      },
    });
    expect(wrapper.find('[data-test="product-detail"]').exists()).toBe(true);
  });

  it('calls store action "increaseQuantity" when "+" button is clicked', () => {
    const wrapper = shallowMount(ProductDetail, {
      store,
      localVue,
      mocks: {
        $route,
      },
    });
    const button = wrapper.find('[data-test="pd-inc-qty-btn"]');
    button.trigger("click");
    expect(modules.cart.actions.increaseQuantity).toHaveBeenCalled();
  });

  it('calls store action "decreaseQuantity" when "-" button is clicked', () => {
    const wrapper = shallowMount(ProductDetail, {
      store,
      localVue,
      mocks: {
        $route,
      },
    });
    const button = wrapper.find('[data-test="pd-dec-qty-btn"]');
    button.trigger("click");
    expect(modules.cart.actions.decreaseQuantity).toHaveBeenCalled();
  });

  it('calls store action "addItemToCart" when "Add to Cart" button is clicked', () => {
    const wrapper = shallowMount(ProductDetail, {
      store,
      localVue,
      mocks: {
        $route: {
          params: {
            productId: "apilco-porcelain-oval-au-gratin-baker",
          },
        },
      },
    });
    const button = wrapper.find('[data-test="pd-atc-btn"]');
    button.trigger("click");
    expect(modules.cart.actions.addItemToCart).toHaveBeenCalled();
  });
});
