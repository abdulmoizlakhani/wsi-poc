import { shallowMount } from "@vue/test-utils";
import { productList } from "../../assets/dummy-data";
import Product from "../Product.vue";

describe("Product.vue", () => {
  const productArray = Object.values(productList).filter(
    (item) => typeof item === "object"
  );

  const propsData = {
    product: productArray[1],
    cartItems: [productArray[0], productArray[2], productArray[3]],
  };

  it("renders product correctly", () => {
    const wrapper = shallowMount(Product, {
      propsData,
      listeners: {
        onClickProductTile: jest.fn(),
        addItemToCart: jest.fn(),
        removeItemFromCart: jest.fn(),
        onClickProductTile: jest.fn(),
      }
    });
    expect(wrapper.find('[data-test="product-container"]').exists()).toBe(true);
  });

  // it('calls store action "addItemToCart" when "Add to Cart" button is clicked', () => {
  //   const wrapper = shallowMount(Product, { propsData });
  //   const button = wrapper.find("button");
  //   button.trigger("click");
  //   expect(modules.cart.actions.addItemToCart).toHaveBeenCalled();
  // });

  // it('calls store action "removeItemFromCart" when "Remove from Cart" button is clicked', () => {
  //   const wrapper = shallowMount(Product, {
  //     propsData: { product: productArray[2] },
  //   });
  //   const button = wrapper.find("button");
  //   button.trigger("click");
  //   expect(modules.cart.actions.removeItemFromCart).toHaveBeenCalled();
  // });
});
