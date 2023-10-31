<template>
  <div>
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";

export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>