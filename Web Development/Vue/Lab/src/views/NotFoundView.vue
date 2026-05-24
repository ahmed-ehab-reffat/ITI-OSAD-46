<script setup>
import router from '@/router';
import {onMounted, onUnmounted} from 'vue';

onMounted(() => {
  router.replace({path: '/not-found'});
  console.log('Not Found page mounted');
});

onUnmounted(() => {
  console.log('Not Found page unmounted');
});
</script>

<template>
  <main class="min-h-screen bg-base-200 px-4 py-8">
    <div class="mx-auto w-full max-w-5xl text-center">
      <div class="hero min-h-96 bg-base-100 rounded-lg">
        <div class="hero-content">
          <div>
            <h1 class="text-6xl font-bold text-error mb-4">404</h1>
            <h2 class="text-3xl font-bold mb-2">Page Not Found</h2>
            <p class="text-lg text-base-content/70 mb-8">
              Sorry, the page you're looking for doesn't exist.
            </p>
            <RouterLink to="/" class="btn btn-primary">
              Back to Home
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
