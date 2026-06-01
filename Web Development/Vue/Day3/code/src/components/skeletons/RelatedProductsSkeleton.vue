<template>
  <section class="rounded-box bg-base-100 p-5 shadow-xl md:p-6">
    <!-- Header -->
    <header class="mb-4 flex items-center justify-between">
      <div class="skeleton h-8 w-48 rounded-box"></div>
      <div class="skeleton h-6 w-24 rounded-full"></div>
    </header>

    <!-- Product Cards Grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 3" :key="i" class="card h-full bg-base-100 shadow-md">
        <!-- Image -->
        <figure class="skeleton aspect-video overflow-hidden bg-base-200"></figure>

        <div class="card-body gap-3">
          <!-- Title -->
          <div class="skeleton h-6 w-3/4 rounded-box"></div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1">
            <div class="skeleton h-5 w-16 rounded-full"></div>
            <div class="skeleton h-5 w-14 rounded-full"></div>
          </div>

          <!-- Price and Actions -->
          <div class="card-actions mt-auto items-center justify-between">
            <div class="flex flex-col gap-2">
              <div class="skeleton h-6 w-20 rounded-box"></div>
              <div class="skeleton h-5 w-16 rounded-full"></div>
            </div>
            <div class="skeleton h-10 w-24 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
