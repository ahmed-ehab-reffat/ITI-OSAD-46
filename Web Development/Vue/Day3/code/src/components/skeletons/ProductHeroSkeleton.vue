<template>
  <section class="card bg-base-100 shadow-xl">
    <div class="card-body gap-6 lg:flex-row lg:items-center">
      <!-- Image Skeleton -->
      <figure
        class="skeleton overflow-hidden rounded-box border border-base-300 bg-base-200 lg:min-h-[400px] lg:w-1/2"
      />

      <!-- Content Skeleton -->
      <div class="lg:w-1/2 space-y-5">
        <!-- Title -->
        <div class="skeleton h-10 w-3/4 rounded-box"></div>

        <!-- Description -->
        <div class="space-y-2">
          <div class="skeleton h-4 w-full rounded-box"></div>
          <div class="skeleton h-4 w-5/6 rounded-box"></div>
          <div class="skeleton h-4 w-4/5 rounded-box"></div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <div class="skeleton h-6 w-20 rounded-full"></div>
          <div class="skeleton h-6 w-24 rounded-full"></div>
          <div class="skeleton h-6 w-16 rounded-full"></div>
        </div>

        <!-- Price and Stock -->
        <div class="flex flex-wrap items-center gap-3">
          <div class="skeleton h-8 w-32 rounded-box"></div>
          <div class="skeleton h-6 w-24 rounded-full"></div>
        </div>

        <!-- Button -->
        <div class="skeleton h-12 w-48 rounded-lg"></div>
      </div>
    </div>
  </section>
</template>
