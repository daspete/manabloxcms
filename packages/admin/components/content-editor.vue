<script setup lang="ts">
import type { Content, ContentType } from '~/generated/graphql/graphql';

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

const contentFields = computed(() => {
  return props.content.fields.filter((field) => {
    return !!getFieldType(props.contentType, field);
  });
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <div>
      <label for="content-title">Title</label>
      <InputText id="content-title" v-model="content.title" class="w-full" />
    </div>
    <div>
      <label for="content-slug">Slug</label>
      <InputText id="content-slug" v-model="content.slug" class="w-full" />
    </div>

    <component
      :is="field.type"
      v-for="field in contentFields"
      :key="field.fieldId"
      :field-type="getFieldType(contentType, field)"
      :field="field"
    />
  </div>
</template>
