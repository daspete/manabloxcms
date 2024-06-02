<script setup lang="ts">
import { v4 as uuid4 } from 'uuid';
import type { Content } from '~/generated/graphql/graphql';
import createContentMutation from '~/graphql/contents/create-content.mutation.gql';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const { contentType } = useContentTypeQuery({
  contentTypeId: route.params.contentTypeId,
});

const content = ref<Partial<Content>>({
  contentId: uuid4(),
  parent: null,
  locale: 'de',
  title: '',
  slug: '',
  fields: [],
});

const isCreating = ref(false);
const mutationErrors = ref<string[]>([]);

const createContent = async () => {
  isCreating.value = true;

  const { mutate } = useMutation(createContentMutation, {
    variables: {
      content: prepareContentForMutation(clone(content.value)),
    },
  });

  try {
    await mutate();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Content created.`,
      life: 2000,
    });
    router.push(
      `/cms/contents/${content.value.type?.contentTypeId}/${content.value.contentId}`,
    );
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
    isCreating.value = false;
  }
};
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold dark:text-white">
        Create a new {{ contentType.name }}
      </span>

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
          label="Create"
          icon="i-mdi-content-save"
          @click="createContent"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <Message v-for="error in mutationErrors" :key="error" severity="error">
          {{ error }}
        </Message>
        <ContentEditor
          v-if="contentType.name"
          :content-type="contentType"
          :content="content"
        />
      </template>
    </Card>

    <BlockUI :blocked="isCreating" full-screen />
  </div>
</template>
