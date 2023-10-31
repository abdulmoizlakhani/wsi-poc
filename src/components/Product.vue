<template>
  <div :key="product.pid" class="cursor-pointer">
    <div class="w-full relative">
      <img
        class="w-full"
        width="250"
        height="250"
        objectFit="cover"
        :src="product.thumb_image"
        :alt="product.title"
      />
      <div
        class="w-full flex justify-center items-center py-3 bg-white/50 absolute bottom-0"
      >
        <p class="uppercase text-gray-500">+ Add to cart</p>
      </div>
    </div>
    <div class="py-2">
      <div class="font-bold text-xl mb-1 text-lg">{{ product.title }}</div>
      <p class="text-gray-900 text-base">${{ product.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "single-product",
  props: ["product"],
};
</script>
