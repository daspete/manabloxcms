<script setup lang="ts">
useHead({
  htmlAttrs: {
    // class: 'dark',
  },
});
</script>

<template>
  <div class="flex min-h-screen w-full items-stretch">
    <AppSidebar />
    <AppSlidebar />
    <div class="flex-1 flex flex-col h-screen">
      <AppTopbar />
      <div class="content flex-1 overflow-y-auto px-4 py-2">
        <NuxtPage />
      </div>
      <AppBottombar />
    </div>
  </div>
</template>
