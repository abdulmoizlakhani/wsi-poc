<template>
  <div data-test="app">
    <app-header />
    <router-view></router-view>
    <side-drawer />
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import SideDrawer from "./components/SideDrawer.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    SideDrawer,
  },
};
</script>
