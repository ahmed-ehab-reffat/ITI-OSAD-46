import ProductDetailsView from "@/views/ProductDetailsView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  //   {
  //     path: "/",
  //     name: "home",
  //     component: () => import("../views/HomeView.vue"),
  //   },
  {
    // First (Non regex dynamic matching)
    // path: "/product/:productId",
    //Regex matching
    path: "/product/:productId(\\d+)",
    name: "product",
    component: ProductDetailsView,
    // props: true, //First method
    props: (route) => ({ productId: Number(route.params.productId) }),
    meta: {
      auth: true,
      admin: true,
      requiredPermissions: ["product.read", "product.write"],
    },
  },

  //wild card matching
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import("@/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// TBC in day 3 with auth store

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.auth)) {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
