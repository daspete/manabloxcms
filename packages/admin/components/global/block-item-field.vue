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
  <div>
    <Fieldset :legend="field.name" :toggleable="true">
      <div>
        <BlockEditor :block="field.block" />
      </div>
    </Fieldset>
  </div>
</template>
