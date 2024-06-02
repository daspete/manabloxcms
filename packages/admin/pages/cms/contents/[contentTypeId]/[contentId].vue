<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import updateContentMutation from '~/graphql/contents/update-content.mutation.gql';

const route = useRoute();
const toast = useToast();

const { loading: contentTypeLoading, contentType } = useContentTypeQuery({
  contentTypeId: route.params.contentTypeId,
});

const { loading: contentLoading, content } = useContentQuery({
  contentId: route.params.contentId,
});

const isInitializing = computed(
  () => contentLoading.value || contentTypeLoading.value,
);

const isUpdating = ref(false);
const mutationErrors = ref<string[]>([]);

const updateContent = async () => {
  mutationErrors.value = [];
  isUpdating.value = true;

  const { mutate } = useMutation(updateContentMutation, {
    variables: {
      content: stripTypename(prepareContentForMutation(clone(content.value))),
    },
  });

  try {
    await mutate();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Content updated.`,
      life: 2000,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    mutationErrors.value = err.message.split(',');

    toast.add({
      severity: 'error',
      summary: 'Error while updating content',
      detail: 'Have a look at the errors and try again.',
      life: 3000,
    });
  } finally {
    isUpdating.value = false;
  }
};
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold"> Update {{ content.title }} </span>
      <div class="flex gap-2">
        <NuxtLink to="/cms/contents">
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
          @click="updateContent"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <Message v-for="error in mutationErrors" :key="error" severity="error">
          {{ error }}
        </Message>
        <div v-if="!isInitializing">
          <ContentEditor :content-type="contentType" :content="content" />
        </div>
      </template>
    </Card>

    <BlockUI :blocked="isUpdating" full-screen />
  </div>
</template>
