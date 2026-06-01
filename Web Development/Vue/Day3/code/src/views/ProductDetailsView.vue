<script setup>
import ProductHeroSection from "@/components/ProductHeroSection.vue";
import RelatedProducts from "@/components/RelatedProducts.vue";
import ProductHeroSkeleton from "@/components/skeletons/ProductHeroSkeleton.vue";
import RelatedProductsSkeleton from "@/components/skeletons/RelatedProductsSkeleton.vue";
import { useProductsStore } from "@/stores/productsStore";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref, watch, computed } from "vue";

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

const productsStore = useProductsStore();
const { getProductById, fetchProducts, getRelatedProducts } = productsStore;

const { products, featuredProduct, relatedProducts } =
  storeToRefs(productsStore); // Without storeToRefs you WILL LOSE REACTIVITY

// Add loading and error states
const { loading: productsLoading, error: productsError } = storeToRefs(productsStore);

//meta
const buyNowLabel = "Buy Now";
const relatedTitle = "Related Products";
const relatedActionLabel = "View Product";

onMounted(() => {
  console.log("Product details page mounted");
});

onUnmounted(() => {
  console.log("Product Details page unmounted");
});

const getPageData = async () => {
  console.log("Getting page data");
  await fetchProducts(); //This shouldn't be called in a real api

  getProductById(props.productId);
  console.log(
    featuredProduct.value,
    relatedProducts.value,
    props.productId,
    typeof props.productId,
  );
  getRelatedProducts(props.productId);
};
watch(() => props.productId, getPageData, { immediate: true });
</script>
<template>
  <div class="space-y-6">
    <!-- Error State -->
    <div v-if="productsError" class="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4v2m0 0a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-8a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"
        />
      </svg>
      <span>Failed to load product. Please try again.</span>
    </div>

    <!-- Hero Section -->
    <div v-else-if="productsLoading">
      <ProductHeroSkeleton />
    </div>
    <div v-else-if="featuredProduct">
      <ProductHeroSection :product="featuredProduct" :cta-label="buyNowLabel" />
    </div>
    <div v-else>
      <div class="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4v2m0 0a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-8a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"
          />
        </svg>
        <span>Product not found!</span>
      </div>
    </div>

    <!-- Related Products Section -->
    <div v-if="!productsError">
      <div v-if="productsLoading">
        <RelatedProductsSkeleton />
      </div>
      <div v-else>
        <RelatedProducts
          :title="relatedTitle"
          :products="relatedProducts"
          :action-label="relatedActionLabel"
        />
      </div>
    </div>
  </div>
</template>
