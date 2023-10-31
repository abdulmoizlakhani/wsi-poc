<template>
  <div
    class="max-w-[250px] rounded overflow-hidden shadow-lg"
    key="{product.id}"
  >
    <img
      class="w-full"
      width="250"
      height="250"
      objectFit="cover"
      v-bind:src="product.image"
      v-bind:alt="product.name"
    />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ product.name }}</div>
      <p class="text-gray-700 text-base">{{ product.description }}</p>
      <p class="text-gray-900 text-xl">${{ product.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "single-product",
  props: ["product"],
};
</script>
