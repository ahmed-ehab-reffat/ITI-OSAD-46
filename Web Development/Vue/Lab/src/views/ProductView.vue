<script setup>
import {computed, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import ProductDetails from '@/components/ProductDetails.vue';
import ProductCard from '@/components/ProductCard.vue';
import {useProductStore} from '@/stores/productStore';

const route = useRoute();
const productStore = useProductStore();

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.fetchProducts();
  }
});

const product = computed(() => {
  return productStore.products.find((p) => p.id === Number(route.params.id));
});

const relatedProducts = computed(() => {
  return productStore.products.filter((p) => p.id !== Number(route.params.id));
});
</script>

<template>
  <main class="min-h-screen bg-base-200 px-4 py-8">
    <div class="mx-auto w-full max-w-5xl">
      <!-- Loading if products haven't loaded yet -->
      <div v-if="productStore.loading" class="flex justify-center py-16">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <template v-else-if="product">
        <ProductDetails :product="product" />

        <section class="mt-10">
          <div class="mb-6 flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold">Related products</h2>
              <p class="text-sm text-base-content/60">
                You might also like these items.
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
      </template>

      <!-- Product not found -->
      <div v-else class="text-center py-16">
        <h2 class="text-2xl font-bold text-base-content/60">
          Product not found
        </h2>
        <RouterLink to="/" class="btn btn-primary mt-4"
          >Back to Home</RouterLink
        >
      </div>
    </div>
  </main>
</template>
