<script setup lang="ts">
defineProps({
  field: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex gap-4">
    <FloatLabel class="flex-1">
      <InputText id="field-type-name" v-model="field.name" class="w-full" />
      <label for="field-type-name">Field name</label>
    </FloatLabel>
    <div class="flex items-center justify-between">
      <label for="isRequired" class="mr-2">Is required</label>
      <InputSwitch
        v-model="field.fieldSettings.isRequired"
        input-id="isRequired"
      />
    </div>
  </div>
</template>
