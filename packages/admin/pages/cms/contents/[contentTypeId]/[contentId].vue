<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import updateContentMutation from '~/graphql/contents/update-content.mutation.gql';
import publishContentMutation from '~/graphql/contents/publish-content.mutation.gql';

definePageMeta({
  middleware: ['is-authenticated'],
});

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

const isVisualEditorActive = ref(false);

const updateAndPublishContent = async () => {
  const updateSuccess = await updateContent();

  if (!updateSuccess) return;

  isUpdating.value = true;

  const { mutate } = useMutation(publishContentMutation, {
    variables: {
      contentId: content.value.contentId,
    },
  });

  try {
    await mutate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    mutationErrors.value = err.message.split(',');
    toast.add({
      severity: 'error',
      summary: 'Error while publishing content',
      detail: 'Have a look at the errors and try again.',
      life: 3000,
    });
  }

  isUpdating.value = false;
};

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

    isUpdating.value = false;

    return true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    mutationErrors.value = err.message.split(',');

    toast.add({
      severity: 'error',
      summary: 'Error while updating content',
      detail: 'Have a look at the errors and try again.',
      life: 3000,
    });

    isUpdating.value = false;
    return false;
  }
};

const onVisualEditorClose = () => {
  isVisualEditorActive.value = false;
};
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold dark:text-white flex items-center gap-2">
        <span v-if="contentType.icon" class="flex items-center"
          ><i :class="contentType.icon"
        /></span>
        <span> Update {{ content.title }} </span>
      </span>
      <div class="flex gap-2">
        <Button
          :label="
            isVisualEditorActive ? 'Close visual editor' : 'Open visual editor'
          "
          @click="isVisualEditorActive = !isVisualEditorActive"
        />
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
          label="Update"
          icon="i-mdi-content-save"
          @click="
            () => {
              updateAndPublishContent();
            }
          "
        />
        <SplitButton
          v-else
          :model="[
            {
              label: 'Update and publish',
              icon: 'i-mdi-content-save',
              command: updateAndPublishContent,
            },
          ]"
          @click="
            () => {
              updateContent();
            }
          "
        >
          <div class="flex items-center gap-2">
            <i class="i-mdi-content-save" />
            <span>Update</span>
          </div>
        </SplitButton>
      </div>
    </div>

    <Message v-for="error in mutationErrors" :key="error" severity="error">
      {{ error }}
    </Message>
    <div v-if="!isInitializing">
      <ContentEditor
        v-if="!isVisualEditorActive"
        :content-type="contentType"
        :content="content"
      />
      <VisualEditor
        v-if="isVisualEditorActive"
        :content-type="contentType"
        :content="content"
        @on-close="onVisualEditorClose"
      />
    </div>

    <BlockUI :blocked="isUpdating" full-screen />
  </div>
</template>
