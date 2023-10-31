<template>
  <header class="flex justify-between h-14 border-b border-gray-500 px-8">
    <div class="flex-1 flex items-center">
      <img class="w-10 rounded" :src="icon" alt="William Sonoma Logo Icon" />
      <img class="ml-3" :src="logo" alt="William Sonoma Logo" />
    </div>
    <div class="flex-1 flex justify-end items-center">
      <button class="flex">
        <img class="w-6 mr-2" :src="cart" alt="Cart Icon" />
        <span>({{ items.length }})</span>
      </button>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app-header",
  data: function () {
    return {
      icon: require("./../assets/ws_logo_icon.png"),
      logo: require("./../assets/ws_horizontal.svg"),
      cart: require("./../assets/grocery-store.png"),
    };
  },
  computed: {
    ...mapState("cart", ["items"]),
  },
};
</script>
