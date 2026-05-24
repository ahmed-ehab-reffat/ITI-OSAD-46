<script setup>
import router from "@/router";
import { onMounted } from "vue";

onMounted(() => {
  router.replace({ path: "/not-found" });
});
</script>
<template>404</template>
