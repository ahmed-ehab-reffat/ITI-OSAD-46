<script setup>
defineProps({
  brand: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
  links: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <footer class="footer footer-center rounded-box bg-base-100 p-6 shadow">
    <aside>
      <p class="text-lg font-semibold">{{ brand }}</p>
      <p class="text-base-content/70">{{ text }}</p>
    </aside>

    <nav>
      <div class="grid grid-flow-col gap-4">
        <a v-for="link in links" :key="link.id" :href="link.href" class="link link-hover">
          {{ link.label }}
        </a>
      </div>
    </nav>
  </footer>
</template>
