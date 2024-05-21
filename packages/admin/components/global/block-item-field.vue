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
  <div class="flex items-center gap-4">
    block item
  </div>
</template>
