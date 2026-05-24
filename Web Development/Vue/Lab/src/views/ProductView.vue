<script setup>
import {computed, onMounted, onUnmounted} from 'vue';

import Product from '@/components/Product.vue';
import ProductCard from '@/components/ProductCard.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  cart: {
    type: Object,
    required: true
  }
});

onMounted(() => {
  console.log(`Product page mounted for ID: ${props.id}`);
});

onUnmounted(() => {
  console.log('Product page unmounted');
});

const featuredProduct = computed(() => {
  return props.products.find((p) => p.id === props.id);
});

const relatedProducts = computed(() => {
  return props.products.filter((p) => p.id !== props.id);
});
</script>

<template>
  <main class="min-h-screen bg-base-200 px-4 py-8">
    <div class="mx-auto w-full max-w-5xl">
      <Product v-if="featuredProduct" :product="featuredProduct" :cart="cart" />

      <section class="mt-10">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold">Related products</h2>
            <p class="text-sm text-base-content/60">
              You might also like these sneakers.
            </p>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <ProductCard
            v-for="item in relatedProducts"
            :key="item.id"
            :item="item"
          />
        </div>
      </section>
    </div>
  </main>
</template>

