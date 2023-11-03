import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import productsModule from "../product";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Product Module", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        product: productsModule,
      },
    });
  });

  it("correctly retrieves products", () => {
    const products = store.getters["product/products"];
    expect(products).toEqual(productsModule.state.products);
  });

  it("correctly retrieves a product by ID", () => {
    const productId = "pillivuyt-coupe-porcelain-soup-and-pasta-plate";
    const product = store.getters["product/getProductById"](productId);

    expect(product).toEqual(
      expect.objectContaining({
        pid: productId,
      })
    );
  });
});
