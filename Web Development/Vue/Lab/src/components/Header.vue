<script setup>
import {RouterLink} from 'vue-router';
import {useCartStore} from '@/stores/cartStore';

const cartStore = useCartStore();
</script>

<template>
  <div class="navbar bg-neutral shadow-sm">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl text-primary font-bold"
        >Shop</RouterLink
      >
    </div>
    <div class="flex gap-6">
      <RouterLink
        to="/"
        class="link link-hover text-base-content/80 hover:text-primary transition"
        >Home</RouterLink
      >
      <RouterLink
        to="/cart"
        class="link link-hover text-base-content/80 hover:text-primary transition"
        >Cart</RouterLink
      >
      <RouterLink
        to="/about"
        class="link link-hover text-base-content/80 hover:text-primary transition"
        >About</RouterLink
      >
    </div>
    <div class="flex gap-4">
      <div class="dropdown dropdown-end">
        <RouterLink to="/cart" role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm badge-primary indicator-item">{{
              cartStore.totalItems
            }}</span>
          </div>
        </RouterLink>
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="User Avatar" src="@/assets/ahmed.jpg" />
          </div>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-xl border border-base-200"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge badge-sm badge-secondary">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
