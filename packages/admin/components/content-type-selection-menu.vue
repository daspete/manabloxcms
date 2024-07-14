<script setup lang="ts">
const variables = ref<{ page: number; limit: number }>({
  page: 1,
  limit: 1000,
});

const { loading, contentTypes } = useContentTypesQuery(variables.value);

const props = defineProps({
  showBlockTypes: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['select']);

const contentTypeItems = computed(() =>
  contentTypes.value.items
    .filter((contentType) => {
      if (props.showBlockTypes) {
        return true;
      }

      return !contentType.isBlockType;
    })
    .map((contentType) => ({
      label: contentType.name,
      icon: contentType.icon || undefined,
      command: () => emit('select', contentType),
    })),
);

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
      :model="contentTypeItems"
    />
  </div>
</template>
