<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import updateContentTypeMutation from '~/graphql/content-types/update-content-type.mutation.gql';

definePageMeta({
  middleware: ['is-authenticated'],
});

const route = useRoute();
const toast = useToast();

const { contentType } = useContentTypeQuery({
  contentTypeId: route.params.contentTypeId,
});

const isUpdating = ref(false);
const mutationErrors = ref<string[]>([]);

const updateContentType = async () => {
  mutationErrors.value = [];
  isUpdating.value = true;

  const { mutate } = useMutation(updateContentTypeMutation, {
    variables: {
      contentType: stripTypename(
        prepareContentTypeForMutation(contentType.value),
      ),
    },
  });

  try {
    await mutate();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Content type "${contentType.value.name}" updated.`,
      life: 3000,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    mutationErrors.value = err.message.split(',');
    toast.add({
      severity: 'error',
      summary: 'Error while updating content type',
      detail: 'Have a look at the errors and try again.',
      life: 5000,
    });
  } finally {
    isUpdating.value = false;
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
          @click="updateContentType"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <Message v-for="error in mutationErrors" :key="error" severity="error">
          {{ error }}
        </Message>
        <ContentTypeEditor :content-type="contentType" />
      </template>
    </Card>

    <BlockUI :blocked="isUpdating" full-screen />
  </div>
</template>
