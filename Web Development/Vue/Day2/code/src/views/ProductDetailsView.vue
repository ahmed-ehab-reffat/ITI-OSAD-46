<script setup>
import ProductHeroSection from "@/components/ProductHeroSection.vue";
import RelatedProducts from "@/components/RelatedProducts.vue";
import { onMounted, onUnmounted, ref, watch, computed } from "vue";

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

const products = ref([
  {
    id: 101,
    title: "Orbit Wireless Headphones",
    description:
      "Comfort-focused wireless headphones with clear mids, punchy bass, and 30-hour battery life.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Black wireless headphones on a white background",
    tags: ["audio", "wireless", "best-seller"],
    stock: 12,
  },
  {
    id: 102,
    title: "Pulse Smartwatch",
    description:
      "Track heart rate, sleep, and daily activity with a bright display and water-resistant build.",
    price: 89.5,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Smartwatch close-up on a soft background",
    tags: ["wearables", "fitness", "new"],
    stock: 5,
  },
  {
    id: 103,
    title: "Aero Mechanical Keyboard",
    description:
      "Low-profile mechanical keyboard with hot-swappable switches and subtle RGB backlight.",
    price: 149.0,
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Mechanical keyboard on a desk",
    tags: ["accessories", "keyboard", "gaming"],
    stock: 0,
  },
  {
    id: 104,
    title: "Nova 4K Webcam",
    description:
      "Ultra-clear 4K webcam with dual microphones and auto-light correction for meetings.",
    price: 109.0,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Webcam mounted on top of a monitor",
    tags: ["video", "work", "creator"],
    stock: 18,
  },
]);

// The current product with id of /product/:productId
// const featuredProduct = computed(() =>
//   products.value.find((p) => p.id === props.productId),
// ); //{}

// // All other products
// const relatedProducts = computed(() =>
//   products.value.filter((p) => p.id !== props.productId),
// );

// This won't work.....why?
// const featuredProduct = ref(
//   products.value.find((p) => p.id === props.productId),
// );
// const relatedProducts = ref(
//   products.value.filter((p) => p.id !== props.productId),
// );

const featuredProduct = ref({});
const relatedProducts = ref([]);
// //meta
const buyNowLabel = "Buy Now";
const relatedTitle = "Related Products";
const relatedActionLabel = "View Product";

onMounted(() => {
  getPageData();
  console.log("Product details page mounted");
});

onUnmounted(() => {
  console.log("Product Details page unmounted");
});
//First method
const getPageData = () => {
  console.log("Getting page data");
  featuredProduct.value = products.value.find((p) => p.id === props.productId);
  relatedProducts.value = products.value.filter(
    (p) => p.id !== props.productId,
  );
};

watch(() => props.productId, getPageData, { immediate: false });

/**
 * async fetchSomething
 *
 * data ref
 * isLoading ref
 * error ref
 */
</script>
<template>
  <div v-if="featuredProduct">
    <ProductHeroSection :product="featuredProduct" :cta-label="buyNowLabel" />

    <RelatedProducts
      :title="relatedTitle"
      :products="relatedProducts"
      :action-label="relatedActionLabel"
    />
  </div>
  <div v-else>Ooops!</div>
</template>
