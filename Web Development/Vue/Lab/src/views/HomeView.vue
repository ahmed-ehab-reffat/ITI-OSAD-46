<script setup>
import {onMounted} from 'vue';
import CarouselBanner from '@/components/CarouselBanner.vue';
import ProductCard from '@/components/ProductCard.vue';
import {useProductStore} from '@/stores/productStore';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
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

      <!-- Loading State -->
      <div v-if="productStore.loading" class="flex justify-center py-16">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <!-- Error State -->
      <div
        v-else-if="productStore.error"
        class="alert alert-error shadow-lg max-w-xl mx-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ productStore.error }}</span>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in productStore.products"
          :key="product.id"
          :item="product"
        />
      </div>
    </section>
  </main>
</template>
