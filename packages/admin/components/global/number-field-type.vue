<script setup lang="ts">
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

if (!props.field.numberSettings) {
  props.field.numberSettings = {};
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <FieldTypeSettings :field="field" />

    <div class="flex gap-4">
      <FloatLabel class="flex-1">
        <InputNumber
          id="min-value"
          v-model="field.numberSettings.min"
          class="w-full"
          show-buttons
        />
        <label for="min-value">Min. value</label>
      </FloatLabel>
      <FloatLabel class="flex-1">
        <InputNumber
          id="max-value"
          v-model="field.numberSettings.max"
          class="w-full"
          show-buttons
        />
        <label for="max-value">Max. value</label>
      </FloatLabel>
    </div>

    <div class="flex gap-4">
      <FloatLabel class="flex-1">
        <InputNumber
          id="precision"
          v-model="field.numberSettings.precision"
          class="w-full"
          show-buttons
        />
        <label for="precision">Precision</label>
      </FloatLabel>
      <FloatLabel class="flex-1">
        <InputNumber
          id="default-value"
          v-model="field.numberSettings.defaultValue"
          class="w-full"
          show-buttons
        />
        <label for="default-value">Default value</label>
      </FloatLabel>
    </div>
  </div>
</template>
