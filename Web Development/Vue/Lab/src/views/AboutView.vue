<script setup>
import {onMounted, onUnmounted} from 'vue';

onMounted(() => {
  console.log('About page mounted');
});

onUnmounted(() => {
  console.log('About page unmounted');
});
</script>

<template>
  <main class="min-h-screen bg-base-200 px-4 py-8">
    <div class="mx-auto w-full max-w-5xl">
      <section class="mb-12">
        <h1 class="text-4xl font-bold mb-6">About Us</h1>
        <div class="bg-base-100 p-8 rounded-lg shadow-md">
          <p class="text-lg text-base-content/80 mb-4 leading-relaxed">
            Welcome to SneakerHub, your ultimate destination for premium
            footwear. Founded in 2020, we've been committed to bringing you the
            latest and greatest in shoe fashion and comfort.
          </p>
          <p class="text-lg text-base-content/80 mb-4 leading-relaxed">
            Our mission is to provide high-quality, stylish shoes that fit every
            lifestyle and occasion. Whether you're a runner, a casual walker, or
            a fashion enthusiast, we have the perfect pair for you.
          </p>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-3">Quality</h3>
            <p class="text-base-content/70">
              Premium materials and craftsmanship in every pair.
            </p>
          </div>
          <div class="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-3">Variety</h3>
            <p class="text-base-content/70">
              Extensive selection for every taste and need.
            </p>
          </div>
          <div class="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-3">Reliability</h3>
            <p class="text-base-content/70">
              Fast shipping and exceptional customer service.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-3xl font-bold mb-6">Contact Us</h2>
        <div class="bg-base-100 p-8 rounded-lg shadow-md">
          <p class="text-lg text-base-content/80 mb-4">
            Email: info@sneakerhub.com
          </p>
          <p class="text-lg text-base-content/80">Phone: +1 (555) 123-4567</p>
        </div>
      </section>
    </div>
  </main>
</template>
