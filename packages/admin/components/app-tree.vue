<script setup lang="ts">
const { isOpen } = useTree();

const { contentTypes } = useContentTypesQuery();
</script>

<template>
  <div
    v-show="isOpen"
    class="tree shadow-lg bg-white dark:bg-surface-900 dark:opacity-80"
  >
    <ScrollPanel class="w-full h-full px-2">
      <ContentTree :content-types="contentTypes" />
    </ScrollPanel>
  </div>
</template>
