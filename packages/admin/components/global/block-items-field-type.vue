<script setup lang="ts">
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

if (!props.field.blocksSettings) {
  props.field.blocksSettings = {};
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <FieldTypeSettings :field="field" />

    Coming soon
  </div>
</template>
