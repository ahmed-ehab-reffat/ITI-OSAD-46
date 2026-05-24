<script setup>
import {onMounted, onUnmounted} from 'vue';
import CarouselBanner from '@/components/CarouselBanner.vue';
import ProductCard from '@/components/ProductCard.vue';

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

onMounted(() => {
  console.log(`Home page mounted - ${props.products.length} products loaded`);
});

onUnmounted(() => {
  console.log('Home page unmounted');
});
</script>


<template>
  <main class="bg-base-200 px-4 py-8">
    <CarouselBanner />

    <section class="mx-auto w-full max-w-7xl mt-12">
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-2">Featured Products</h2>
        <p class="text-base-content/60">Check out our latest collection</p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :item="product"
        />
      </div>
    </section>
  </main>
</template>
