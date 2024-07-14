<script setup lang="ts">
const variables = ref<{ page: number; limit: number }>({
  page: 1,
  limit: 1000,
});

const { contentTypes } = useContentTypesQuery(variables.value);

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

if (!props.field.blockSettings) {
  props.field.blockSettings = {};
}

const blockTypes = computed(() =>
  contentTypes.value.items.filter(
    (contentType) => contentType.isBlockType === true,
  ),
);
</script>

<template>
  <div class="flex flex-col gap-8">
    <FieldTypeSettings :field="field" />

    <div class="flex gap-4 items-center">
      <label>Block type</label>
      <Dropdown
        v-model="field.blockSettings.blockType"
        :options="blockTypes"
        filter
        option-label="name"
        placeholder="Select a block type"
        class="flex-1"
      >
        <template #value="{ value, placeholder }">
          <div v-if="value">
            {{ value.name }}
          </div>
          <span v-else>
            {{ placeholder }}
          </span>
        </template>
      </Dropdown>
    </div>
  </div>
</template>
