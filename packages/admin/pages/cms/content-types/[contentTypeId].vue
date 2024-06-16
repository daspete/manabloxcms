<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

definePageMeta({
  middleware: ['is-authenticated'],
});

const { isUpdating, update, errors } = useUpdateContentTypeMutation();
const route = useRoute();
const toast = useToast();

const { contentType } = useContentTypeQuery({
  contentTypeId: route.params.contentTypeId,
});

const updateContentType = async () => {
  try {
    await update(contentType.value);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Content type updated.`,
      life: 2000,
    });
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error while updating content type',
      detail:
        errors.value.join(', ') || 'Have a look at the errors and try again.',
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold dark:text-white">
        Update content type
      </span>
      <div class="flex gap-2">
        <NuxtLink to="/cms/content-types">
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
          label="Update"
          icon="i-mdi-content-save"
          :loading="isUpdating"
          :disabled="isUpdating"
          @click="updateContentType"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <Message v-for="error in errors" :key="error" severity="error">
          {{ error }}
        </Message>
        <ContentTypeEditor :content-type="contentType" />
      </template>
    </Card>

    <BlockUI :blocked="isUpdating" full-screen />
  </div>
</template>
