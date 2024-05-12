<script setup lang="ts">
const contentType = ref({
  name: '',
  isPublishable: false,
  fields: []
});
</script>

<template>
  <div class="container pt-8">
    <Card>
      <template #title>
        Add a new content type
      </template>
      <template #content>
        <ContentTypeEditor :contentType="contentType" />
      </template>
    </Card>
  </div>
</template>
