<template>
  <transition name="slide" mode="out-in">
    <div
      data-test="side-drawer-container"
      :class="isDrawerOpen ? 'block' : 'hidden'"
    >
      <div
        data-test="side-drawer-overlay"
        :class="isDrawerOpen ? containerClasses : 'w-0'"
        @click="closeDrawer()"
      ></div>
      <div class="w-1/3 h-full absolute top-0 right-0">
        <div class="bg-white h-screen p-4">
          <h2 class="font-bold text-2xl mb-4">Your Cart</h2>
          <ul>
            <li
              v-for="item in cartItems"
              :key="item.pid"
              class="flex items-center justify-between p-2 border-b border-gray-300"
            >
              <div class="flex items-center">
                <span class="text-base font-medium">{{ item.title }}</span>
                <span class="text-gray-600 ml-2">{{
                  formatCurrency(item.price)
                }}</span>
              </div>
              <div class="flex items-center">
                <button
                  @click="decreaseQuantity(item.pid)"
                  class="text-red-500 p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 12H6"
                    />
                  </svg>
                </button>
                <span class="text-lg font-medium">{{ item.quantity }}</span>
                <button
                  @click="increaseQuantity(item.pid)"
                  class="text-green-500 p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
              <span class="text-gray-600"
                >Subtotal:
                {{ formatCurrency(item.price * item.quantity) }}</span
              >
            </li>
          </ul>
          <p v-if="!cartItems.length" class="mt-2 text-gray-500">
            Please add items to your cart.
          </p>
          <div class="mt-4 flex justify-end">
            <p class="text-lg font-semibold">
              Total: {{ formatCurrency(cartSubtotal) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const containerClasses = "bg-black w-full h-full absolute top-0 opacity-60";

export default {
  name: "side-drawer",
  data: function () {
    return { containerClasses };
  },
  methods: {
    ...mapActions("drawer", ["closeDrawer"]),
    ...mapActions("cart", ["increaseQuantity", "decreaseQuantity"]),
    formatCurrency(amount) {
      return `$${amount.toFixed(2)}`;
    },
  },
  computed: {
    ...mapGetters("drawer", ["isDrawerOpen"]),
    ...mapGetters("cart", ["cartItems", "cartSubtotal"]),
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
