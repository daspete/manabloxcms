<script setup lang="ts">
import type { BlockItemsField, Content } from '~/generated/graphql/graphql';
import contentByPermalinkQuery from '~/graphql/contents/content-by-permalink.query.gql';

const route = useRoute();
const permalink = route.path.slice(1);

const { data: contentResult } = await useAsyncQuery<{
  contentByPermalink: Content;
}>(contentByPermalinkQuery, {
  permalink,
});

const components = computed(() => {
  const componentsField = contentResult.value?.contentByPermalink.fields.find(
    (field) => field.name === 'components',
  );

  return (componentsField as BlockItemsField)?.blocks || [];
});
</script>

<template>
  <div>
    <div>{{ components }}</div>
  </div>
</template>
