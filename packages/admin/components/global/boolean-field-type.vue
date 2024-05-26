<script setup lang="ts">
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

if (!props.field.booleanSettings) {
  props.field.booleanSettings = {};
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <FieldTypeSettings :field="field" />

    <div class="flex gap-4 items-center">
      <InputSwitch
        id="boolean-defaultvalue"
        v-model="field.booleanSettings.defaultValue"
      />
      <label for="boolean-defaultvalue">Default value</label>
    </div>
  </div>
</template>
