<script setup lang="ts">
const { isOpen } = useTree();

const variables = ref<{ page: number; limit: number }>({
  page: 1,
  limit: 1000,
});

const { contentTypes } = useContentTypesQuery(variables.value);

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
    class="tree shadow-lg bg-white dark:bg-surface-900 dark:opacity-80 w-72"
  >
    <div class="flex flex-col w-full h-full">
      <div class="flex gap-2 items-center justify-end">
        <Button
          size="small"
          text
          title="Refresh tree"
          icon="i-mdi-refresh"
          severity="secondary"
          @click="refreshTree"
        />
      </div>
      <div class="flex-1 overflow-hidden">
        <ScrollPanel class="w-full h-full px-2">
          <div class="border-b">
            <ContentTree
              v-if="isTreeVisible"
              :content-types="contentTypes.items"
            />
          </div>
        </ScrollPanel>
      </div>

      <div>&nbsp;</div>
    </div>
  </div>
</template>
