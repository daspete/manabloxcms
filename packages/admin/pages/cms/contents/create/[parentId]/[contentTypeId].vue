<script setup lang="ts">
import { v4 as uuid4 } from 'uuid';
import type { Content } from '~/generated/graphql/graphql';

const { create, isCreating, errors } = useCreateContentMutation();

const {
  publish,
  isPublishing,
  errors: publishErrors,
} = usePublishContentMutation();

definePageMeta({
  middleware: ['is-authenticated'],
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const { contentType } = useContentTypeQuery({
  contentTypeId: route.params.contentTypeId,
});

const content = ref<Partial<Content>>({
  contentId: uuid4(),
  parent:
    route.params.parentId === 'null'
      ? null
      : ({ contentId: route.params.parentId } as Content),
  locale: 'de',
  localizationId: uuid4(),
  title: '',
  slug: '',
  fields: [],
});

const createAndPublishContent = async () => {
  // const createSuccess = await createContent(false);
  const createSuccess = await createContent(false, false);
  if (!createSuccess) return;

  try {
    if (!content.value.contentId) return;
    await publish(content.value.contentId);

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Content published.`,
      life: 2000,
    });

    router.push(
      `/cms/contents/${content.value.type?.contentTypeId}/${content.value.contentId}`,
    );
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error while publishing content',
      detail: 'Have a look at the errors and try again.',
      life: 3000,
    });
  }
};

const createContent = async (redirect = true, showToast = true) => {
  try {
    await create(content.value);

    if (showToast) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: `Content created.`,
        life: 2000,
      });
    }

    if (redirect) {
      router.push(
        `/cms/contents/${content.value.type?.contentTypeId}/${content.value.contentId}`,
      );
    } else {
      return true;
    }
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error while creating content',
      detail: 'Have a look at the errors and try again.',
      life: 3000,
    });
    return false;
  }
};
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold dark:text-white flex items-center gap-2">
        <span v-if="contentType.icon" class="flex items-center"
          ><i :class="contentType.icon"
        /></span>
        <span> Create a new {{ contentType.name }} </span>
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
          v-if="!contentType.isPublishable"
          type="button"
          label="Create and publish"
          icon="i-mdi-content-save"
          @click="createAndPublishContent"
        />
        <SplitButton
          v-else
          :model="[
            {
              label: 'Create and publish',
              icon: 'i-mdi-content-save',
              command: createAndPublishContent,
            },
          ]"
          @click="
            () => {
              createContent();
            }
          "
        >
          <div class="flex items-center gap-2">
            <i class="i-mdi-content-save" />
            <span>Create</span>
          </div>
        </SplitButton>
      </div>
    </div>

    <Message v-for="error in errors" :key="error" severity="error">
      {{ error }}
    </Message>

    <Message v-for="error in publishErrors" :key="error" severity="error">
      {{ error }}
    </Message>

    <ContentEditor
      v-if="contentType.name"
      :content-type="contentType"
      :content="content"
    />

    <BlockUI :blocked="isCreating || isPublishing" full-screen />
  </div>
</template>
