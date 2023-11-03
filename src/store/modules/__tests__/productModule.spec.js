import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import { productList } from "../../../assets/dummy-data";
import productsModule from "../product";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("axios");

describe("Product Module", () => {
  const mockedResponse = {
    data: [productList[0], productList[2]],
  };

  let store;
  let actions;

  beforeEach(() => {
    actions = {
      fetchProducts: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        product: {
          namespaced: true,
          state: {
            products: mockedResponse.data,
          },
          actions,
          mutations: productsModule.mutations,
          getters: productsModule.getters,
        },
      },
    });
  });

  it("correctly retrieves products", async () => {
    axios.get.mockResolvedValue(mockedResponse);

    await store.dispatch("product/fetchProducts");
    await flushPromises();

    expect(actions.fetchProducts).toHaveBeenCalled();

    const products = store.getters["product/products"];
    expect(products).toEqual(mockedResponse.data);
  });

  it("correctly retrieves a product by ID", async () => {
    const productId = "pillivuyt-coupe-porcelain-soup-and-pasta-plate";
    const product = store.getters["product/getProductById"](productId);
    expect(product).toEqual(
      expect.objectContaining({
        pid: productId,
      })
    );
  });
});
