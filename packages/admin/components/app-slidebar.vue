<script setup lang="ts">
const { isOpen, toggle } = useSlidebar();
</script>

<template>
  <div class="slidebar shadow-lg" v-show="isOpen">
    slide
  </div>
</template>
