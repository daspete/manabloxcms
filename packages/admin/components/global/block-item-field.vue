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
  <div class="flex gap-4">
    <div>{{ field.name }}</div>

    <div class="flex-1">
        <BlockEditor :block="field.block" />
    </div>
  </div>
</template>
