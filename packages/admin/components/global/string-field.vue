<script setup lang="ts">
import Editor, { type EditorLoadEvent } from 'primevue/editor';

import type { StringField, StringFieldType } from '~/generated/graphql/graphql';

const props = defineProps({
  fieldType: {
    type: Object as PropType<StringFieldType>,
    required: true,
  },
  field: {
    type: Object as PropType<StringField>,
    required: true,
  },
});

const isPlainTextInput = computed(() => {
  if (!props.fieldType.stringSettings) {
    return true;
  }

  if (props.fieldType.stringSettings?.isRichText) {
    return false;
  }

  if (props.fieldType.stringSettings.isCodeBlock) {
    return false;
  }

  return true;
});

const isRichTextInput = computed(() => {
  if (isPlainTextInput.value) {
    return false;
  }

  return props.fieldType.stringSettings?.isRichText || false;
});

const isCodeBlock = computed(() => {
  if (isPlainTextInput.value) {
    return false;
  }

  if (isRichTextInput.value) {
    return false;
  }

  return props.fieldType.stringSettings?.isCodeBlock || false;
});

const initEditorContent = ({ instance }: EditorLoadEvent) => {
  instance.setContents(
    instance.clipboard.convert({ html: props.field.string }),
  );
};
</script>

<template>
  <div>
    <label :for="fieldType.fieldId">{{ fieldType.name }}</label>

    <InputText
      v-if="isPlainTextInput"
      :id="fieldType.fieldId"
      v-model="field.string"
      class="w-full"
    />

    <Editor
      v-if="isRichTextInput"
      v-model="field.string"
      class="w-full h-96 mb-12"
      @load="initEditorContent"
    />

    <Textarea
      v-if="isCodeBlock"
      v-model="field.string"
      class="w-full h-96 font-mono"
    />
  </div>
</template>
