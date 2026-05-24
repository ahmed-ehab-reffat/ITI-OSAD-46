<script setup>
import ProductCard from "./ProductCard.vue";

defineProps({
  title: {
    type: String,
    default: "Related Products",
  },
  products: {
    type: Array,
    default: () => [],
  },
  actionLabel: {
    type: String,
    default: "View Product",
  },
});
</script>

<template>
  <section class="rounded-box bg-base-100 p-5 shadow-xl md:p-6">
    <header class="mb-4 flex items-center justify-between">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <span class="badge badge-neutral">{{ products.length }} items</span>
    </header>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :action-label="actionLabel"
      />
    </div>
  </section>
</template>
