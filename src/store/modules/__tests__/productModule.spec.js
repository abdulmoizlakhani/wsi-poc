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
    data: [productList[0], productList[2]].map((p) => ({
      ...p,
      id: p.pid,
      image: p.thumb_image,
      description: "lorem ipsum",
    })),
  };

  let store;
  let commit;

  beforeEach(() => {
    commit = jest.fn();

    store = new Vuex.Store({
      modules: {
        product: {
          namespaced: true,
          state: {
            products: mockedResponse.data,
          },
          actions: productsModule.actions,
          mutations: productsModule.mutations,
          getters: productsModule.getters,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly retrieves products", async () => {
    axios.get.mockResolvedValue(mockedResponse);

    const expectedProductList = [
      {
        pid: "apilco_porcelain_ramekins_apilco-porcelain-ramekin",
        title: "Apilco Porcelain Ramekins",
        description: "lorem ipsum",
        price: 59.95,
        thumb_image:
          "https://assets.wsimgs.com/wsimgs/rk/images/dp/wcm/202322/0051/img76c.jpg",
      },
      {
        pid: "pillivuyt_coupe_porcelain_soup/pasta_plates_pillivuyt-coupe-porcelain-soup-and-pasta-plate",
        title: "Pillivuyt Coupe Porcelain Soup/Pasta Plates",
        description: "lorem ipsum",
        price: 119.95,
        thumb_image:
          "https://assets.wsimgs.com/wsimgs/rk/images/dp/wcm/202322/0007/img1c.jpg",
      },
    ];

    await store.dispatch("product/fetchProducts", { commit });
    await flushPromises();

    expect(axios.get).toHaveBeenCalledWith("https://fakestoreapi.com/products");

    const products = store.getters["product/products"];
    expect(products).toEqual(expectedProductList);
  });

  it("should fetchProducts action handles error", async () => {
    console.log = jest.fn();

    axios.get.mockRejectedValue(new Error("Request failed"));

    await store.dispatch("product/fetchProducts", { commit });
    await flushPromises();

    expect(console.log).toHaveBeenCalledWith("Error: ", "Request failed");
  });

  it("should correctly retrieves a product by ID", async () => {
    const productId = "pillivuyt-coupe-porcelain-soup-and-pasta-plate";
    const product = store.getters["product/getProductById"](productId);
    expect(product).toEqual(
      expect.objectContaining({
        pid: productId,
      })
    );
  });
});
