<script setup>
import {computed} from 'vue';
import {useCartStore} from '@/stores/cartStore';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();

const finalPrice = computed(() => {
  if (!props.product.discount) return props.product.price;
  return Math.round(props.product.price * (1 - props.product.discount / 100));
});
</script>

<template>
  <div class="card lg:card-side bg-base-100 shadow-2xl overflow-hidden">
    <figure class="lg:w-1/2 bg-linear-to-b from-primary/10 to-transparent">
      <img
        :src="product.image"
        :alt="product.imageAlt || product.title"
        class="h-96 w-full object-cover lg:h-full"
      />
    </figure>
    <div class="card-body p-8">
      <div class="flex flex-col gap-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <span
            v-if="product.tags && product.tags.length"
            class="badge badge-primary badge-lg"
          >
            {{ product.tags[0] }}
          </span>
          <span class="text-sm text-base-content/60">
            ID: {{ product.id }}
          </span>
        </div>

        <div>
          <h1 class="text-4xl font-extrabold tracking-tight text-base-content">
            {{ product.title }}
          </h1>
          <p class="mt-3 max-w-2xl text-base-content/75 leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-3">
            <span class="text-4xl font-bold text-base-content">
              ${{ finalPrice }}
            </span>
            <span v-if="product.discount" class="badge badge-success">
              {{ product.discount }}% OFF
            </span>
          </div>
          <div
            v-if="product.discount"
            class="text-sm text-base-content/60 line-through"
          >
            ${{ product.price }}
          </div>

          <div class="mt-2 flex items-center gap-2">
            <span class="text-sm font-medium">Availability:</span>
            <span
              v-if="product.stock > 0"
              class="badge badge-success gap-1 text-xs"
            >
              {{ product.stock }} in stock
            </span>
            <span
              v-else
              class="badge badge-error gap-1 font-bold text-xs text-white"
            >
              Out of Stock
            </span>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in product.tags"
            :key="tag"
            class="badge badge-outline"
          >
            {{ tag }}
          </span>
        </div>

        <button
          @click="cartStore.addToCart(product)"
          :disabled="product.stock <= 0"
          class="btn btn-primary btn-wide font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300"
        >
          {{ product.stock > 0 ? 'Buy Now' : 'Out of Stock' }}
        </button>
      </div>
    </div>
  </div>
</template>
