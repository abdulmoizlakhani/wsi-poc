<template>
  <header
    data-test="header"
    class="flex justify-between h-14 border-b border-gray-500 px-8"
  >
    <div
      class="flex-1 flex items-center max-w-fit cursor-pointer"
      @click="$emit('onClickLogo')"
    >
      <img
        class="w-10 rounded"
        :src="logoIcon"
        alt="William Sonoma Logo Icon"
      />
      <img class="ml-3" :src="logoImage" alt="William Sonoma Logo" />
    </div>
    <div class="flex-1 flex justify-end items-center">
      <button class="flex" @click="$emit('openDrawer')">
        <img class="w-6 mr-2" :src="cartIcon" alt="Cart Icon" />
        <span>({{ cartItems?.length || 0 }})</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "app-header",
  props: ["logoIcon", "logoImage", "cartIcon", "cartItems"],
};
</script>
