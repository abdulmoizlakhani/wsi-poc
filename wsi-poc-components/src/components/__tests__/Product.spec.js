import { shallowMount } from "@vue/test-utils";
import { productList } from "../../assets/dummy-data";
import Product from "../Product.vue";

describe("Product.vue", () => {
  const productArray = Object.values(productList).filter(
    (item) => typeof item === "object"
  );

  const propsData = {
    product: productArray[0],
    cartItems: [productArray[0], productArray[2], productArray[3]],
  };

  const listeners = {
    onClickProductTile: jest.fn(),
    addItemToCart: jest.fn(),
    removeItemFromCart: jest.fn(),
    onClickProductTile: jest.fn(),
  };

  it("renders product correctly", () => {
    const wrapper = shallowMount(Product, {
      propsData,
      listeners,
      computed: {
        isSelected: jest.fn().mockReturnValue(true),
      },
    });
    expect(wrapper.find('[data-test="product-container"]').exists()).toBe(true);
  });

  it("renders product correctly", () => {
    const wrapper = shallowMount(Product, {
      propsData: { ...propsData, cartItems: [] },
      listeners,
      computed: {
        isSelected: jest.fn().mockReturnValue(false),
      },
    });
    expect(wrapper.find('[data-test="product-container"]').exists()).toBe(true);
  });

  it('calls store action "removeItemFromCart" when "Remove from Cart" button is clicked', () => {
    const wrapper = shallowMount(Product, {
      propsData,
      listeners,
      computed: {
        isSelected: jest.fn().mockReturnValue(true),
      },
    });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(listeners.removeItemFromCart).toHaveBeenCalled();
  });

  it('calls store action "addItemToCart" when "Add to Cart" button is clicked', () => {
    const wrapper = shallowMount(Product, {
      propsData: { ...propsData, cartItems: [] },
      listeners,
      computed: {
        isSelected: jest.fn().mockReturnValue(false),
      },
    });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(listeners.addItemToCart).toHaveBeenCalled();
  });
});
