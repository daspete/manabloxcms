<script setup lang="ts">
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
</script>

<template>
  <div>
    <label :for="fieldType.fieldId">{{ fieldType.name }}</label>
    <InputNumber
      :id="fieldType.fieldId"
      v-model="field.number"
      class="w-full"
    />
  </div>
</template>
