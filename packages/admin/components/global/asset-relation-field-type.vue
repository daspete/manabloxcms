<script setup lang="ts">
const { assets } = useAssetsQuery();

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

if (!props.field.assetSettings) {
  props.field.assetSettings = {};
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <FieldTypeSettings :field="field" />

    <div class="flex gap-4 items-center">
      <label for="asset-relation">Default asset</label>
      <Dropdown
        v-model="field.assetSettings.defaultValue"
        :options="assets"
        show-clear
        filter
        option-label="name"
        placeholder="Select default asset"
        class="flex-1"
      >
        <template #value="{ value, placeholder }">
          <div v-if="value" class="flex items-center gap-2">
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
  </div>
</template>
