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

const headline = computed(() => {
  const headlineField = props.fields.find((field) => field.name === 'headline');
  return (headlineField as StringField)?.string || null;
});

const content = computed(() => {
  const contentField = props.fields.find((field) => field.name === 'content');
  return (contentField as StringField)?.string || null;
});
</script>

<template>
  <div>
    <h2>{{ headline }}</h2>
    <div v-html="content" />
  </div>
</template>
