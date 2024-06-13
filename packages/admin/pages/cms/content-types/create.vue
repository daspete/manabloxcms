<script setup lang="ts">
import createContentTypeMutation from '~/graphql/content-types/create-content-type.mutation.gql';
import { useToast } from 'primevue/usetoast';
import { v4 as uuid4 } from 'uuid';
import type { ContentType } from '~/generated/graphql/graphql';

definePageMeta({
  middleware: ['is-authenticated'],
});

const toast = useToast();
const router = useRouter();

const contentType = ref<Partial<ContentType>>({
  name: '',
  contentTypeId: uuid4(),
  isBlockType: false,
  isPublishable: false,
  canBeVisibleInMenu: false,
  isVisibleInTree: false,
  fields: [],
});

const isCreating = ref(false);
const mutationErrors = ref<string[]>([]);

const createContentType = async () => {
  mutationErrors.value = [];
  isCreating.value = true;

  const { mutate } = useMutation(createContentTypeMutation, {
    variables: {
      contentType: prepareContentTypeForMutation(contentType.value),
    },
  });

  try {
    await mutate();

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Content type "${contentType.value.name}" created.`,
      life: 2000,
    });

    router.push(`/cms/content-types/${contentType.value.contentTypeId}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    mutationErrors.value = err.message.split(',');

    toast.add({
      severity: 'error',
      summary: 'Error while creating content type',
      detail: 'Have a look at the errors and try again.',
      life: 3000,
    });
  } finally {
    isCreating.value = false;
  }
};
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold dark:text-white">
        Add a new content type
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
          label="Create"
          icon="i-mdi-content-save"
          @click="createContentType"
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

    <BlockUI :blocked="isCreating" full-screen />
  </div>
</template>
