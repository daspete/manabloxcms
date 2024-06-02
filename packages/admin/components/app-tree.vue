<script setup lang="ts">
const { isOpen } = useTree();
</script>

<template>
  <div v-show="isOpen" class="tree shadow-lg">
    <ScrollPanel class="w-full h-full px-2">
      <ContentTree />
    </ScrollPanel>
  </div>
</template>
