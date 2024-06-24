<script setup lang="ts">
import type { Content, ContentType } from '~/generated/graphql/graphql';

const props = defineProps({
  contentType: {
    type: Object as PropType<ContentType>,
    required: true,
  },
  content: {
    type: Object as PropType<Partial<Content>>,
    required: true,
  },
});

if (!props.content.type) {
  props.content.type = props.contentType;
}

initContentFields(props.contentType, props.content);

const contentFields = computed(() => {
  return props.content.fields?.filter((field) => {
    return !!getFieldType(props.contentType, field);
  });
});

const mainContentFields = computed(() => {
  return contentFields.value?.filter((field) => {
    return (
      getFieldType(props.contentType, field)?.adminSettings.zone === 'main'
    );
  });
});

const sidebarContentFields = computed(() => {
  return contentFields.value?.filter((field) => {
    return (
      getFieldType(props.contentType, field)?.adminSettings.zone === 'sidebar'
    );
  });
});
</script>

<template>
  <Card>
    <template #content>
      <div class="flex flex-col gap-8">
        <div>
          <label for="content-title">Title</label>
          <InputText
            id="content-title"
            v-model="content.title"
            class="w-full"
          />
        </div>
        <div>
          <label for="content-slug">Slug</label>
          <InputText id="content-slug" v-model="content.slug" class="w-full" />
        </div>
      </div>
    </template>
  </Card>

  <div class="flex gap-8 mt-8">
    <div class="flex-1">
      <Card>
        <template #content>
          <div class="flex flex-col gap-8">
            <component
              :is="field.type"
              v-for="field in mainContentFields"
              :key="field.fieldId"
              :field-type="getFieldType(contentType, field)"
              :field="field"
            />
          </div>
        </template>
      </Card>
    </div>
    <div class="w-80">
      <Card>
        <template #content>
          <div class="flex flex-col gap-8">
            <component
              :is="field.type"
              v-for="field in sidebarContentFields"
              :key="field.fieldId"
              :field-type="getFieldType(contentType, field)"
              :field="field"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
