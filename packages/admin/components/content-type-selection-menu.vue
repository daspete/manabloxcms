<script setup lang="ts">
const { loading, contentTypes, refetch } = useContentTypesQuery();

const emits = defineEmits(['select']);

const contentTypeSelectionMenu = ref();
const toggleContentTypeSelectionMenu = (event) => {
  	contentTypeSelectionMenu.value.toggle(event);
};
</script>

<template>
  <div>
    <Button
      type="button"
      @click="toggleContentTypeSelectionMenu"
      :loading="loading"
      label="Add new content"
      icon="i-mdi-plus"
      aria-haspopup="true"
      aria-controls="content-type-selection-menu"
    />
    <Menu
      ref="contentTypeSelectionMenu"
      id="content-type-selection-menu"
      :popup="true"
      :model="
        contentTypes.map((contentType) => ({
          label: contentType.name,
          command: () => $emit('select', contentType)
        }))
      "
    />
  </div>
</template>
