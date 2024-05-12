<script setup lang="ts">
useHead({
  htmlAttrs: {
    // class: 'dark',
  },
});
</script>

<template>
  <div class="flex flex-col">
    <MainMenu />
    <div class="content flex justify-center pb-8">
      <NuxtPage />
    </div>
  </div>
</template>
