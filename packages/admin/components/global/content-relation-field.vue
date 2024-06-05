<script setup lang="ts">
const { contents } = useContentsQuery({
  limit: 20,
  page: 1,
});

const props = defineProps({
  fieldType: {
    type: Object,
    required: true,
  },
  field: {
    type: Object,
    required: true,
  },
});

if (!props.field.content) {
  if (props.fieldType.contentSettings?.defaultValue) {
    props.field.content = props.fieldType.contentSettings.defaultValue;
  }
}
</script>

<template>
  <div class="flex gap-4 items-center">
    <label :for="fieldType.fieldId">{{ fieldType.name }}</label>
    <Dropdown
      v-model="field.content"
      :options="contents.items"
      show-clear
      filter
      option-label="name"
      placeholder="Select content"
      class="flex-1"
    >
      <template #value="{ value, placeholder }">
        <div v-if="value?.title" class="flex items-center gap-2">
          <div>{{ value.type.name }}</div>
          <div>{{ value.title }}</div>
        </div>
        <div v-else>{{ placeholder }}</div>
      </template>

      <template #option="{ option }">
        <div class="flex items-center gap-2">
          <div>{{ option.type.name }}</div>
          <div>{{ option.title }}</div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
