<script setup>
import {onMounted, onUnmounted} from 'vue';
import {RouterLink} from 'vue-router';

onMounted(() => {
  console.log('Product Card mounted');
});

onUnmounted(() => {
  console.log('Product Card unmounted');
});

defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <article
    class="card border border-base-200 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
  >
    <figure class="h-56 overflow-hidden bg-base-200">
      <img
        :src="item.image"
        :alt="item.name"
        class="h-full w-full object-cover"
      />
    </figure>
    <div class="card-body gap-3 p-5">
      <div class="flex items-center justify-between gap-2">
        <h3 class="text-lg font-semibold">{{ item.name }}</h3>
        <span v-if="item.discount" class="badge badge-sm badge-success">
          {{ item.discount }}% OFF
        </span>
      </div>
      <p class="text-sm text-base-content/70">$ {{ item.price }}</p>
      <RouterLink :to="'/product/' + item.id" class="btn btn-outline btn-sm"
        >View product</RouterLink
      >
    </div>
  </article>
</template>
