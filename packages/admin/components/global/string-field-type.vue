<script setup lang="ts">
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

if (!props.field.stringSettings) {
  props.field.stringSettings = {};
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <FieldTypeSettings :field="field" />

    <div class="flex gap-4">
      <FloatLabel class="flex-1">
        <InputNumber
          id="min-characters"
          v-model="field.stringSettings.minCharacters"
          class="w-full"
          showButtons
        />
        <label for="min-characters">Min. characters</label>
      </FloatLabel>
      <FloatLabel class="flex-1">
        <InputNumber
          id="max-characters"
          v-model="field.stringSettings.maxCharacters"
          class="w-full"
          showButtons
        />
        <label for="max-characters">Max. characters</label>
      </FloatLabel>
    </div>

    <div class="flex gap-4">
      <FloatLabel class="flex-1">
        <InputText
          id="regex"
          v-model="field.stringSettings.regex"
          class="w-full"
        />
        <label for="regex">Possible characters regex</label>
      </FloatLabel>
      <FloatLabel class="flex-1">
        <InputText
          id="default-value"
          v-model="field.stringSettings.defaultValue"
          class="w-full"
        />
        <label for="default-value">Default value</label>
      </FloatLabel>
    </div>

    <div class="flex gap-8">
      <div class="flex gap-4 items-center" v-if="!field.stringSettings.isCodeBlock && !field.stringSettings.isRichText">
        <InputSwitch id="is-textarea" v-model="field.stringSettings.isTextArea" />
        <label for="is-textarea">Is a textarea</label>
      </div>
      <div class="flex gap-4 items-center" v-if="!field.stringSettings.isCodeBlock && !field.stringSettings.isTextArea">
        <InputSwitch id="is-richtext" v-model="field.stringSettings.isRichText" />
        <label for="is-richtext">Use a WYSIWYG editor</label>
      </div>
      <div class="flex gap-4 items-center" v-if="!field.stringSettings.isRichText && !field.stringSettings.isTextArea">
        <InputSwitch id="is-codeblock" v-model="field.stringSettings.isCodeBlock" />
        <label for="is-codeblock">Is a codeblock</label>
      </div>
    </div>
  </div>
</template>
