<template>
  <div
    data-test="product-container"
    :key="product.pid"
    class="cursor-pointer w-full"
  >
    <div class="w-full flex justify-center relative">
      <img
        :class="imgClass"
        :src="product.thumb_image"
        :alt="product.title"
        @click="$emit('onClickProductTile', product)"
      />
      <button
        class="w-full flex justify-center items-center py-3 bg-black/50 absolute bottom-0"
        @click="
          !isSelected
            ? $emit('addItemToCart', product)
            : $emit('removeItemFromCart', product)
        "
      >
        <span class="uppercase text-white">
          {{ isSelected ? "- Remove from" : "+ Add to" }} cart
        </span>
      </button>
    </div>
    <div class="py-2" @click="$emit('onClickProductTile', product)">
      <h3 class="font-bold text-xl mb-1">{{ product.title }}</h3>
      <p class="text-gray-900 mb-1 text-sm">{{ product.description }}</p>
      <p class="text-gray-900 font-bold text-base">${{ product.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "single-product",
  props: ["product", "cartItems", "imgClass"],
  computed: {
    isSelected() {
      return this.cartItems.find((item) => item.pid === this.product.pid);
    },
  },
};
</script>
