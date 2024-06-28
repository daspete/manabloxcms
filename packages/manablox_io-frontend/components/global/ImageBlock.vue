<script setup lang="ts">
import type {
  AssetRelationField,
  ContentFieldUnion,
} from '~/generated/graphql/graphql';

const props = defineProps({
  fields: {
    type: Array<ContentFieldUnion>,
    required: true,
  },
});

const image = computed(() => {
  const imageField = props.fields.find(
    (field: ContentFieldUnion) => field.name === 'image',
  );
  return (imageField as AssetRelationField)?.asset || null;
});
</script>

<template>
  <div>
    <img v-if="image" :src="image.url" >
  </div>
</template>
