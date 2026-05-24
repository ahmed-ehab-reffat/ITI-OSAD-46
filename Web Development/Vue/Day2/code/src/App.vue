<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import ProductDetailsView from "@/views/ProductDetailsView.vue";

import { ref } from "vue";
const brandName = "ShopDash";
const navLinks = [
  { id: 1, label: "Home", href: "#" },
  { id: 2, label: "Products", href: "#" },
  { id: 3, label: "Deals", href: "#" },
  { id: 4, label: "Contact", href: "#" },
];

const footerBrand = "ShopDash";
const footerLinks = [
  { id: 1, label: "Privacy", href: "#" },
  { id: 2, label: "Terms", href: "#" },
  { id: 3, label: "Support", href: "#" },
];
const footerText = "Sample footer using DaisyUI";

// const toggleView = ref(false);

// const toggle = () => {
//   toggleView.value = !toggleView.value;
// };
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <div
      class="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-6 md:px-8"
    >
      <AppHeader :brand="brandName" :links="navLinks" />

      <!-- <button @click="toggle" class="btn btn-primary">Toggle a view</button> -->
      <main class="space-y-8">
        <!-- <ProductDetailsView v-if="toggleView" /> -->
        <RouterView />
      </main>

      <AppFooter :brand="footerBrand" :links="footerLinks" :text="footerText" />
    </div>
  </div>
</template>
