<script setup lang="ts">
const { assets } = useAssetsQuery();

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

if(!props.field.asset) {
  if(props.fieldType.assetSettings?.defaultValue) {
    props.field.asset = props.fieldType.assetSettings.defaultValue;
  }
}
</script>

<template>
  <div class="flex gap-4 items-center">
    <label :for="fieldType.fieldId">{{ fieldType.name }}</label>
    <Dropdown v-model="field.asset" :options="assets" showClear filter optionLabel="name" placeholder="Select asset" class="flex-1">

      <template #value="{ value, placeholder }">
        <div class="flex items-center gap-2" v-if="value">
          <div>{{ value.type }}</div>
          <div>{{ value.name }}</div>
        </div>
        <div v-else>{{ placeholder }}</div>
      </template>

      <template #option="{ option }">
        <div class="flex items-center gap-2">
          <div>{{ option.type }}</div>
          <div>{{ option.name }}</div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
