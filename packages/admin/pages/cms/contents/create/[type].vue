<script setup lang="ts">
const route = useRoute();

const { loading, contentType } = useContentTypeQuery({
  name: route.params.type,
});

const content = ref({
  type: route.params.type,
  parent: null,
  locale: 'de',
  fields: [],
});

const isCreating = ref(false);

const createContent = async () => {

}
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold">Create a new {{ route.params.type }}</span>
      <div class="flex gap-2">
        <NuxtLink to="/cms/content">
          <Button
            type="button"
            label="Back to overview"
            icon="i-mdi-chevron-left"
            severity="secondary"
            outlined
          />
        </NuxtLink>
        <Button
          type="button"
          label="Create"
          icon="i-mdi-content-save"
          @click="createContent"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <ContentEditor v-if="contentType.name" :contentType="contentType" :content="content" />
      </template>
    </Card>

    <BlockUI :blocked="isCreating" fullScreen />
  </div>
</template>
