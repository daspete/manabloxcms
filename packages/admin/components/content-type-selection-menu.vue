<script setup lang="ts">
const { loading, contentTypes } = useContentTypesQuery();

const props = defineProps({
  showBlockTypes: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['select']);

const contentTypeSelectionMenu = ref();
const toggleContentTypeSelectionMenu = (event: MouseEvent) => {
  contentTypeSelectionMenu.value.toggle(event);
};
</script>

<template>
  <div>
    <Button
      type="button"
      :loading="loading"
      label="Add new content"
      icon="i-mdi-plus"
      aria-haspopup="true"
      aria-controls="content-type-selection-menu"
      @click="toggleContentTypeSelectionMenu"
    />
    <Menu
      id="content-type-selection-menu"
      ref="contentTypeSelectionMenu"
      :popup="true"
      :model="
        contentTypes
          .filter((contentType) => {
            if (props.showBlockTypes) {
              return true;
            }

            return !contentType.isBlockType;
          })
          .map((contentType) => ({
            label: contentType.name,
            icon: contentType.icon || undefined,
            command: () => $emit('select', contentType),
          }))
      "
    />
  </div>
</template>
