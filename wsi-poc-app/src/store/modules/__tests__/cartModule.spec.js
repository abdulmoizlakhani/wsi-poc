import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import cartModule from "../cart";

const localVue = createLocalVue();
localVue.use(Vuex);

const createItem = (pid, title, price) => ({ pid, title, price, quantity: 0 });

describe("Cart Module", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        cart: cartModule,
      },
    });
  });

  it("correctly adds an item to the cart", () => {
    const item = createItem("product-a", "Product A", 10);
    store.dispatch("cart/addItemToCart", item);
    expect(store.getters["cart/cartItems"]).toHaveLength(1);
  });

  it("correctly removes an item from the cart", () => {
    const item = createItem("product-a", "Product A", 10);
    store.dispatch("cart/addItemToCart", item);
    store.dispatch("cart/removeItemFromCart", item);
    expect(store.getters["cart/cartItems"]).toHaveLength(0);
  });

  it("correctly increments the quantity of an item in the cart", () => {
    const item = createItem("product-a", "Product A", 10);
    store.dispatch("cart/addItemToCart", item);
    store.dispatch("cart/increaseQuantity", item.pid);
    const cartItems = store.getters["cart/cartItems"];
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].quantity).toBe(2);
  });

  it("correctly decrements the quantity of an item in the cart", () => {
    const item = createItem("product-a", "Product A", 10);
    store.dispatch("cart/addItemToCart", item);
    store.dispatch("cart/increaseQuantity", item.pid);
    store.dispatch("cart/decreaseQuantity", item.pid);
    const cartItems = store.getters["cart/cartItems"];
    expect(cartItems.length).toBe(2); // - 1
    expect(cartItems[0].quantity).toBe(2); // - 1
  });

  it("correctly removes an item quantity is 1 in the cart if decrease it's quantity", () => {
    const item = createItem("product-a", "Product A", 10);
    store.dispatch("cart/decreaseQuantity", item.pid);
    const cartItems = store.getters["cart/cartItems"];
    expect(cartItems.length).toBe(2); // - 0
  });

  it("correctly removes an item when decreasing its quantity to 0", () => {
    const item = createItem("product-a", "Product A", 10);
    store.dispatch("cart/addItemToCart", item);
    store.dispatch("cart/decreaseQuantity", item.pid);
    expect(store.getters["cart/cartItems"]).toHaveLength(0);
  });

  it("calculates the cart subtotal correctly", () => {
    const item1 = createItem("product-a", "Product A", 10);
    const item2 = createItem("product-b", "Product B", 20);
    store.dispatch("cart/addItemToCart", item1);
    store.dispatch("cart/addItemToCart", item2);
    store.dispatch("cart/increaseQuantity", item2.pid);
    const subtotal = store.getters["cart/cartSubtotal"];
    expect(subtotal).toBe(10 + (20 * 2));
  });
});