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
  <div class="flex items-center gap-4">
    <InputSwitch :id="fieldType.fieldId" v-model="field.boolean" />
    <label :for="fieldType.fieldId">{{ fieldType.name }}</label>
  </div>
</template>
