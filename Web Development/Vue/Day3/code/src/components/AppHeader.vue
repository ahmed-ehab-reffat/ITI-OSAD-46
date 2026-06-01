<script setup>
defineProps({
  brand: {
    type: String,
    required: true,
  },
  links: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <header class="rounded-box bg-base-100 shadow">
    <nav class="navbar">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl normal-case">{{ brand }}</a>
      </div>

      <div class="flex-none">
        <div class="dropdown dropdown-end md:hidden">
          <label tabindex="0" class="btn btn-ghost btn-circle">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li v-for="link in links" :key="link.id">
              <a :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <ul class="menu menu-horizontal hidden gap-1 px-1 md:flex">
          <li v-for="link in links" :key="link.id">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
