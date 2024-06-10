<script setup lang="ts">
defineProps({
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
    <Panel toggleable collapsed>
      <template #header>
        {{ field.name }}
      </template>

      <template #togglericon="{ collapsed }">
        <i :class="collapsed ? 'i-mdi-chevron-down' : 'i-mdi-chevron-up'" />
      </template>

      <BlockEditor :block="field.block" />
    </Panel>
  </div>
</template>
