<script setup>
import { computed } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  actionLabel: {
    type: String,
    default: "View Product",
  },
});

const formattedPrice = computed(() =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.product.price),
);

const stockLabel = computed(() =>
  props.product.stock > 0 ? `${props.product.stock} left` : "Out of stock",
);
const stockClass = computed(() =>
  props.product.stock > 0 ? "badge-success" : "badge-error",
);
</script>

<template>
  <article class="card h-full bg-base-100 shadow-md transition hover:shadow-lg">
    <figure class="aspect-video overflow-hidden bg-base-200">
      <img
        :src="product.image"
        :alt="product.imageAlt"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </figure>

    <div class="card-body gap-3">
      <h3 class="card-title text-lg">{{ product.title }}</h3>

      <div class="flex flex-wrap gap-1">
        <span
          v-for="tag in product.tags"
          :key="tag"
          class="badge badge-outline badge-sm"
        >
          #{{ tag }}
        </span>
      </div>

      <div class="card-actions mt-auto items-center justify-between">
        <div>
          <span class="text-lg font-semibold">{{ formattedPrice }}</span>
          <div class="mt-1">
            <span class="badge badge-sm" :class="stockClass">{{
              stockLabel
            }}</span>
          </div>
        </div>
        <RouterLink :to="`/product/${product.id}`">
          <button
            class="btn btn-sm btn-primary"
            :disabled="product.stock === 0"
          >
            {{ actionLabel }}
          </button>
        </RouterLink>
      </div>
    </div>
  </article>
</template>
