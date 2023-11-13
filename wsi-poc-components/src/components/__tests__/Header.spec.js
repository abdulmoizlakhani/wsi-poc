import { shallowMount } from "@vue/test-utils";
import { productList } from "../../assets/dummy-data";
import AppHeader from "../Header.vue";

describe("AppHeader.vue", () => {
  const productArray = Object.values(productList).filter(
    (item) => typeof item === "object"
  );

  const propsData = {
    logoIcon: require("../../assets/ws_logo_icon.png"),
    logoImage: require("../../assets/ws_horizontal.svg"),
    cartIcon: require("../../assets/grocery-store.png"),
    cartItems: [productArray[0], productArray[2], productArray[3]],
  };

  const listeners = {
    onClickLogo: jest.fn(),
    openDrawer: jest.fn(),
  };

  it("renders header correctly", () => {
    const wrapper = shallowMount(AppHeader, { propsData, listeners });
    expect(wrapper.find('[data-test="header"]').exists()).toBe(true);
  });

  it('calls store action "openDrawer" when cart icon is clicked', () => {
    const wrapper = shallowMount(AppHeader, { propsData, listeners });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(listeners.openDrawer).toHaveBeenCalled();
  });
});
