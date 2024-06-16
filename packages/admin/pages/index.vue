<script setup lang="ts">
import type { ContentType, Space } from '~/generated/graphql/graphql';
import createSpaceMutation from '~/graphql/spaces/create-space.mutation.gql';
import createContentTypeMutation from '~/graphql/content-types/create-content-type.mutation.gql';

definePageMeta({
  middleware: ['is-authenticated'],
});

const toast = useToast();
const {
  spaces,
  loading: spacesLoading,
  refetch: refreshSpaces,
} = useSpacesQuery();
const {
  contentTypes,
  loading: contentTypesLoading,
  refetch: refreshContentTypes,
} = useContentTypesQuery();

const space = ref<Partial<Space>>({
  name: '',
  technicalName: '',
  description: '',
  url: '',
  settingsBlockType: undefined,
  settings: undefined,
});

const contentType = ref<Partial<ContentType>>({
  name: '',
  isBlockType: false,
  isPublishable: false,
  canBeVisibleInMenu: false,
  isVisibleInTree: false,
  fields: [],
});

const isCreatingSpace = ref(false);
const isCreatingContentType = ref(false);

const contentTypeMutationErrors = ref<string[]>([]);

const createSpace = async () => {
  isCreatingSpace.value = true;

  const { mutate } = useMutation(createSpaceMutation, {
    variables: {
      space: prepareSpaceForMutation(clone(space.value)),
    },
  });

  try {
    await mutate();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Space created.`,
      life: 2000,
    });

    refreshSpaces();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
  } finally {
    isCreatingSpace.value = false;
  }
};
const createContentType = async () => {
  contentTypeMutationErrors.value = [];
  isCreatingContentType.value = true;

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

    refreshContentTypes();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    contentTypeMutationErrors.value = err.message.split(',');

    toast.add({
      severity: 'error',
      summary: 'Error while creating content type',
      detail: 'Have a look at the errors and try again.',
      life: 3000,
    });
  } finally {
    isCreatingContentType.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div v-if="!spacesLoading && spaces.items.length === 0">
      <Dialog visible modal header="Welcome" :closable="false">
        <div class="flex flex-col gap-4">
          <div>
            It seem's, it's your first login. Create your first space here.
          </div>
          <div>
            <SpaceEditor :space="space" />
          </div>
          <div class="self-end">
            <Button
              type="button"
              label="Create space"
              :loading="isCreatingSpace"
              :disabled="isCreatingSpace"
              @click="createSpace"
            />
          </div>
        </div>
      </Dialog>
    </div>
    <div v-else-if="!contentTypesLoading && contentTypes.length === 0">
      <Dialog
        visible
        modal
        header="Create your first content type"
        :closable="false"
        style="width: 80%"
      >
        <div class="flex flex-col gap-4">
          <div>Create your first content type here.</div>
          <div>
            <ContentTypeEditor :content-type="contentType" />
          </div>
          <div class="self-end">
            <Button
              type="button"
              label="Create Content type"
              :loading="isCreatingContentType"
              :disabled="isCreatingContentType"
              @click="createContentType"
            />
          </div>
        </div>
      </Dialog>
    </div>
    <div v-else class="mt-8 flex gap-4">
      <Card class="w-1/2">
        <template #title>
          <div>Statistics</div>
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <div class="flex gap-2">
              <div class="flex-1">Spaces</div>
              <div>{{ spaces.items.length }}</div>
            </div>
            <div class="flex gap-2">
              <div class="flex-1">Content types</div>
              <div>{{ contentTypes.length }}</div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
