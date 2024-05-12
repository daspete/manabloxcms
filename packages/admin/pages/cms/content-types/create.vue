<script setup lang="ts">
const contentType = ref({
  name: '',
  isPublishable: false,
  fields: []
});
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold">
        Add a new content type
      </span>
      <Button type="button" label="Create" size="small" icon="i-mdi-content-save" />
    </div>

    <Card>
      <template #content>
        <ContentTypeEditor :contentType="contentType" />
      </template>
    </Card>
  </div>
</template>
