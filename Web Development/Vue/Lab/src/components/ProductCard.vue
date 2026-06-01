<script setup>
import {RouterLink} from 'vue-router';
import {useCartStore} from '@/stores/cartStore';

defineProps({
  item: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();
</script>

<template>
  <article
    class="card border border-base-200 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
  >
    <figure class="h-56 overflow-hidden bg-base-200">
      <img
        :src="item.image"
        :alt="item.imageAlt"
        class="h-full w-full object-cover"
      />
    </figure>
    <div class="card-body gap-3 p-5">
      <div class="flex items-center justify-between gap-2">
        <h3 class="text-lg font-semibold">{{ item.title }}</h3>
        <span
          v-if="item.tags && item.tags.length"
          class="badge badge-sm badge-success"
        >
          {{ item.tags[0] }}
        </span>
      </div>
      <p class="text-sm text-base-content/70">${{ item.price }}</p>
      <div class="flex gap-2">
        <RouterLink
          :to="'/product/' + item.id"
          class="btn btn-outline btn-sm flex-1"
          >View product</RouterLink
        >
        <button
          @click="cartStore.addToCart(item)"
          :disabled="item.stock <= 0"
          class="btn btn-primary btn-sm flex-1"
        >
          {{ item.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </div>
    </div>
  </article>
</template>
