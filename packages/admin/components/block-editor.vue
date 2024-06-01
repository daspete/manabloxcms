<script setup lang="ts">
import type { BlockFieldUnion } from '~/generated/graphql/graphql';

const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const { contentType } = useContentTypeQuery({
  name: props.block.type,
});

const isInitializing = ref(true);

watch(contentType, () => {
  if (props.block.fields.length === 0) {
    initContentFields(contentType.value, props.block);
  }
  isInitializing.value = false;
});

const blockFields = computed(() => {
  return props.block.fields.filter((field: BlockFieldUnion) => {
    return !!getFieldType(contentType.value, field);
  });
});
</script>

<template>
  <div>
    <div v-if="isInitializing">Please wait, block is initializing</div>
    <div v-else class="flex flex-col gap-4">
      <component
        :is="field.type"
        v-for="field in blockFields"
        :key="field.fieldId"
        :field-type="getFieldType(contentType, field)"
        :field="field"
      />
    </div>
  </div>
</template>
