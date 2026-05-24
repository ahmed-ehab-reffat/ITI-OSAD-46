<script setup>
import {ref} from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import cozySneakersImg from '@/assets/Cozy Sneakers.webp';
import runningShoesImg from '@/assets/Running Shoes.jpg';
import casualBootsImg from '@/assets/Casual Boots.jpeg';
import flipFlopsImg from '@/assets/Flip Flops.jpeg';
import {RouterView} from 'vue-router';

const products = ref([
  {
    'id': 1,
    'name': 'Cozy Sneakers',
    'description': 'High-quality sneakers that go with everything you wear.',
    'image': cozySneakersImg,
    'badge': 'NEW',
    'price': 120,
    'discount': 20,
    'stock': 10,
    'tags': ['Fashion', 'Casual', 'Sport']
  },
  {
    'id': 2,
    'name': 'Running Shoes',
    'description': 'Built for speed and comfort on any terrain.',
    'image': runningShoesImg,
    'badge': '',
    'price': 90,
    'discount': 10,
    'stock': 5,
    'tags': ['Sport', 'Running']
  },
  {
    'id': 3,
    'name': 'Casual Boots',
    'description': 'Rugged boots for everyday adventures.',
    'image': casualBootsImg,
    'badge': 'SALE',
    'price': 150,
    'discount': 0,
    'stock': 8,
    'tags': ['Casual', 'Winter']
  },
  {
    'id': 4,
    'name': 'Flip Flops',
    'description': 'Light and breezy for sunny days.',
    'image': flipFlopsImg,
    'badge': '',
    'price': 30,
    'discount': 50,
    'stock': 20,
    'tags': ['Summer', 'Casual']
  }
]);

const cart = ref({
  totalBought: 0,
  subtotal: 0
});
</script>

<template>
  <Header :products="products" :cart="cart" />

  <RouterView :products="products" :cart="cart" />

  <Footer />
</template>
