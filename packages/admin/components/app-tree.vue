<script setup lang="ts">
const { isOpen } = useTree();
const { contentTypes } = useContentTypesQuery();

const isTreeVisible = ref(true);

const refreshTree = async () => {
  isTreeVisible.value = false;
  await nextTick();
  isTreeVisible.value = true;
};
</script>

<template>
  <div
    v-show="isOpen"
    class="tree shadow-lg bg-white dark:bg-surface-900 dark:opacity-80"
  >
    <div class="flex flex-col w-full h-full">
      <div class="flex gap-2 items-center justify-end">
        <Button
          size="small"
          text
          icon="i-mdi-refresh"
          severity="secondary"
          @click="refreshTree"
        />
      </div>
      <div class="flex-1 overflow-hidden">
        <ScrollPanel class="w-full h-full px-2">
          <ContentTree v-if="isTreeVisible" :content-types="contentTypes" />
        </ScrollPanel>
      </div>

      <div>&nbsp;</div>
    </div>
  </div>
</template>
