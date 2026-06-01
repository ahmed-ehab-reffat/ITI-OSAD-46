<script setup>
import {RouterLink} from 'vue-router';
import {useCartStore} from '@/stores/cartStore';

const cartStore = useCartStore();
</script>

<template>
  <main class="min-h-screen bg-base-200 px-4 py-8">
    <div class="mx-auto w-full max-w-4xl">
      <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>

      <!-- Empty Cart -->
      <div
        v-if="cartStore.items.length === 0"
        class="bg-base-100 rounded-lg shadow-md p-12 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto mb-4 text-base-content/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2 class="text-2xl font-bold text-base-content/60 mb-2">
          Your cart is empty
        </h2>
        <p class="text-base-content/50 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <RouterLink to="/" class="btn btn-primary"
          >Continue Shopping</RouterLink
        >
      </div>

      <!-- Cart Items -->
      <div v-else>
        <div class="overflow-x-auto bg-base-100 rounded-lg shadow-md">
          <table class="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartStore.items" :key="item.id">
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-12 w-12">
                        <img :src="item.image" :alt="item.title" />
                      </div>
                    </div>
                    <div class="font-bold">{{ item.title }}</div>
                  </div>
                </td>
                <td>${{ item.price.toFixed(2) }}</td>
                <td>
                  <span class="badge badge-ghost badge-lg">{{ item.qty }}</span>
                </td>
                <td class="font-semibold">
                  ${{ (item.price * item.qty).toFixed(2) }}
                </td>
                <td>
                  <button
                    @click="cartStore.removeFromCart(item.id)"
                    class="btn btn-error btn-sm btn-outline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Cart Summary -->
        <div
          class="mt-6 bg-base-100 rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div class="text-lg">
            Total items:
            <span class="font-bold">{{ cartStore.totalItems }}</span>
          </div>
          <div class="text-2xl font-bold text-primary">
            Total: ${{ cartStore.totalPrice.toFixed(2) }}
          </div>
          <button
            @click="cartStore.clearCart()"
            class="btn btn-outline btn-error"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
