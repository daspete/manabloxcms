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
      <InputText
        :id="fieldType.fieldId"
        v-model="field.string"
        class="w-full"
      />
      <label :for="fieldType.fieldId">{{ fieldType.name }}</label>
    </FloatLabel>
  </div>
</template>
