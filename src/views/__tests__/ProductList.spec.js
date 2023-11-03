import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { productList } from "../../assets/dummy-data";
import ProductList from "../ProductList.vue";
import SingleProduct from "../../components/Product.vue";
import ProductModule from "../../store/modules/product";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("ProductList.vue", () => {
  let store;
  let modules = {
    product: {
      actions: undefined,
      state: undefined,
    },
  };

  beforeEach(() => {
    modules.product.state = {
      products: productList,
    };

    store = new Vuex.Store({
      modules: {
        product: {
          state: modules.product.state,
          actions: modules.product.actions,
          getters: ProductModule.getters,
          namespaced: true,
        },
      },
    });
  });

  it("renders ProductList correctly", () => {
    const wrapper = shallowMount(ProductList, {
      store,
      localVue,
    });
    expect(wrapper.find('[data-test="product-list"]').exists()).toBe(true);
  });

  it("renders ProductList with list of 41 Products", () => {
    const wrapper = shallowMount(ProductList, {
      store,
      localVue,
      components: { SingleProduct },
    });
    const SingleProducts = wrapper.findAll('[data-test="single-product"]');
    expect(SingleProducts).toHaveLength(41);
  });
});
