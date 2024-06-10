<script setup lang="ts">
const { isOpen } = useTree();

const { contentTypes } = useContentTypesQuery();
</script>

<template>
  <div v-show="isOpen" class="tree shadow-lg bg-white">
    <ScrollPanel class="w-full h-full px-2">
      <ContentTree :content-types="contentTypes" />
    </ScrollPanel>
  </div>
</template>
