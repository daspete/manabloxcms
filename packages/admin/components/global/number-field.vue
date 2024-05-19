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
    <FloatLabel class="flex-1">
      <InputNumber
        :id="fieldType.fieldId"
        v-model="field.number"
        class="w-full"
      />
      <label :for="fieldType.fieldId">{{ fieldType.name }}</label>
    </FloatLabel>
  </div>
</template>
