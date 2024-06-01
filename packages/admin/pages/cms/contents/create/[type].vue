<script setup lang="ts">
import { v4 as uuid4 } from 'uuid';
import type { Content } from '~/generated/graphql/graphql';
import createContentMutation from '~/graphql/contents/create-content.mutation.gql';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const { contentType } = useContentTypeQuery({
  name: route.params.type,
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
      `/cms/contents/${content.value.type?.name}/${content.value.contentId}`,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
  } finally {
    isCreating.value = false;
  }
};
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold"
        >Create a new {{ route.params.type }}</span
      >
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
