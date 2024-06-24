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

if (!props.field.asset) {
  if (props.fieldType.assetSettings?.defaultValue) {
    props.field.asset = props.fieldType.assetSettings.defaultValue;
  }
}
</script>

<template>
  <div class="flex flex-col">
    <label :for="fieldType.fieldId">{{ fieldType.name }}</label>
    <div>
      <AssetSelector v-model:asset="field.asset" :multiple="false" />
    </div>
  </div>
</template>
