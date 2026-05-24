import {createWebHistory, createRouter} from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ProductView from '@/views/ProductView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  {path: '/', component: HomeView},
  {path: '/about', component: AboutView},
  {
    path: '/product/:id(\\d+)',
    component: ProductView,
    props: (route) => ({
      id: Number(route.params.id)
    })
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
