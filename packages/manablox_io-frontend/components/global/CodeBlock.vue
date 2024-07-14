<script setup lang="ts">
import type {
  ContentFieldUnion,
  StringField,
} from '~/generated/graphql/graphql';

const props = defineProps({
  fields: {
    type: Array<ContentFieldUnion>,
    required: true,
  },
});

const codeContent = computed(() => {
  const contentField = props.fields.find((field) => field.name === 'code');
  return (contentField as StringField)?.string || null;
});
</script>

<template>
  <div>
    <pre><code>{{ codeContent }}</code></pre>
  </div>
</template>
