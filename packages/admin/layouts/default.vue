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
    <div class="content">
      <NuxtPage />
    </div>
  </div>
</template>
