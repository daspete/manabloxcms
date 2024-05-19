<script setup lang="ts">
const { loading, contentTypes } = useContentTypesQuery();

const props = defineProps({
  showBlockTypes: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["select"]);

const contentTypeSelectionMenu = ref();
const toggleContentTypeSelectionMenu = (event: any) => {
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
        contentTypes
          .filter((contentType) => {
            if (props.showBlockTypes) {
              return true;
            }

            return !contentType.isBlockType;
          })
          .map((contentType) => ({
            label: contentType.name,
            command: () => $emit('select', contentType),
          }))
      "
    />
  </div>
</template>
