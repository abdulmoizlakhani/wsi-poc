import { shallowMount } from "@vue/test-utils";
import App from "../App.vue";
import AppHeader from "../components/Header.vue";
import SideDrawer from "../components/SideDrawer.vue";

describe("App.vue", () => {
  it("renders app correctly", () => {
    const wrapper = shallowMount(App, {
      components: { AppHeader, SideDrawer },
      stubs: ["router-view"],
    });
    expect(wrapper.find('[data-test="app"]').exists()).toBe(true);
  });
});