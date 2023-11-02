<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/2">
        <img
          :src="product.thumb_image"
          :alt="product.title"
          class="w-full rounded-lg"
        />
      </div>
      <div class="md:w-1/2 mt-4 md:mt-0 md:ml-4">
        <h1 class="text-2xl font-semibold">{{ product.title }}</h1>
        <p class="text-gray-600 text-lg mt-2">{{ product.description }}</p>
        <p class="text-2xl font-semibold text-primary mt-4">
          {{ formatCurrency(product.price) }}
        </p>
        <div class="mt-4">
          <div class="flex items-center">
            <button
              @click="decreaseQuantity(product.pid)"
              class="px-4 py-2 rounded bg-zinc-950 text-white"
            >
              -
            </button>
            <span class="px-4 py-2">{{ productCartQty }}</span>
            <button
              @click="!!productCartQty ? increaseQuantity(product.pid) : addItemToCart(product)"
              class="px-4 py-2 rounded bg-zinc-950 text-white"
            >
              +
            </button>
          </div>
          <button
            v-if="productCartQty === 0"
            @click="addItemToCart(product)"
            class="px-4 py-2 rounded bg-zinc-950 text-white mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "product-detail",
  methods: {
    ...mapActions("cart", [
      "increaseQuantity",
      "decreaseQuantity",
      "addItemToCart",
    ]),
    formatCurrency(amount) {
      return `$${amount.toFixed(2)}`;
    },
  },
  computed: {
    ...mapGetters("product", ["getProductById"]),
    ...mapGetters("cart", ["cartItems"]),
    product() {
      return this.getProductById(this.$route.params.productId);
    },
    productCartQty() {
      const product = this.cartItems.find(
        (item) => item.pid === this.$route.params.productId
      );
      return product ? product.quantity : 0;
    },
  },
};
</script>
