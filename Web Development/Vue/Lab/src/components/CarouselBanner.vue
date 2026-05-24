<script setup>
import {onMounted, onUnmounted} from 'vue';

import cozySneakersImg from '@/assets/Cozy Sneakers.webp';
import runningShoesImg from '@/assets/Running Shoes.jpg';
import casualBootsImg from '@/assets/Casual Boots.jpeg';

onMounted(() => {
  console.log('Carousel mounted');
});

onUnmounted(() => {
  console.log('Carousel unmounted');
});
</script>

<template>
  <div class="max-w-lg m-auto">
    <div
      class="carousel carousel-center bg-neutral rounded-box max-w-lg space-x-4 p-4"
    >
      <div class="carousel-item">
        <img :src="cozySneakersImg" class="h-96 rounded-box" />
      </div>
      <div class="carousel-item">
        <img :src="runningShoesImg" class="h-96 rounded-box" />
      </div>
      <div class="carousel-item">
        <img :src="casualBootsImg" class="h-96 rounded-box" />
      </div>
    </div>
  </div>
</template>
