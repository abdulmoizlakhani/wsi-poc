import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import drawerModule from "../drawer";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Drawer Module", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        drawer: drawerModule,
      },
    });
  });

  it("correctly opens the drawer", () => {
    store.dispatch("drawer/openDrawer");
    expect(store.getters["drawer/isDrawerOpen"]).toBe(true);
    expect(document.body.classList.contains("disable-scroll")).toBe(true);
  });

  it("correctly closes the drawer", () => {
    store.dispatch("drawer/openDrawer");
    store.dispatch("drawer/closeDrawer");
    expect(store.getters["drawer/isDrawerOpen"]).toBe(false);
    expect(document.body.classList.contains("disable-scroll")).toBe(false);
  });

  it("correctly sets drawer state with mutations", () => {
    store.commit("drawer/setDrawerState", true);
    expect(store.getters["drawer/isDrawerOpen"]).toBe(true);
  });
});
