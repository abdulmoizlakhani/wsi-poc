import { shallowMount } from "@vue/test-utils";
import { productList } from "../../assets/dummy-data";
import SideDrawer from "../SideDrawer.vue";

describe("SideDrawer.vue", () => {
  const productArray = Object.values(productList).filter(
    (item, i) => typeof item === "object"
  );

  const propsData = {
    isDrawerOpen: true,
    cartItems: [productArray[0], productArray[2], productArray[3]],
    cartSubtotal: 0
  };

  const containerClasses = "bg-black w-full h-full absolute top-0 opacity-60";

  it("renders SideDrawer correctly", () => {
    const wrapper = shallowMount(SideDrawer, {
      propsData,
      data: function () {
        return { containerClasses };
      },
    });
    expect(wrapper.find('[data-test="side-drawer-container"]').exists()).toBe(
      true
    );
  });

  // it('calls store action "closeDrawer" when "Drawer Overlay" is clicked', () => {
  //   const wrapper = shallowMount(SideDrawer, {
  //     store,
  //     localVue,
  //     data: function () {
  //       return { containerClasses };
  //     },
  //   });
  //   const overlay = wrapper.find('[data-test="side-drawer-overlay"]');
  //   overlay.trigger("click");
  //   expect(modules.drawer.actions.closeDrawer).toHaveBeenCalled();
  // });
});
