<script setup lang="ts">
const { isOpen } = useSlidebar();
</script>

<template>
  <div v-show="isOpen" class="slidebar shadow-lg">slide</div>
</template>
