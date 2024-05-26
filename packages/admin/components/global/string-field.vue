<script setup lang="ts">
defineProps({
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
    <InputText :id="fieldType.fieldId" v-model="field.string" class="w-full" />
  </div>
</template>
