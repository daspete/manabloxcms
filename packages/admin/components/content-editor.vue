<script setup lang="ts">
import type { Content, ContentType } from "~/generated/graphql/graphql";

const props = defineProps({
  contentType: {
    type: Object as PropType<ContentType>,
    required: true,
  },
  content: {
    type: Object as PropType<Content>,
    required: true,
  },
});

initContentFields(props.contentType, props.content);
</script>

<template>
  <div class="flex flex-col gap-8">
    <component
      v-for="field in content.fields"
      :key="field.fieldId"
      :is="field.type"
      :fieldType="getFieldType(contentType, field)"
      :field="field"
    />
  </div>
</template>
