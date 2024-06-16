<script setup lang="ts">
import type { ContentType, Space } from '~/generated/graphql/graphql';

definePageMeta({
  middleware: ['is-authenticated'],
});

const toast = useToast();
const {
  spaces,
  loading: spacesLoading,
  refetch: refreshSpaces,
} = useSpacesQuery();
const { contentTypes, refetch: refreshContentTypes } = useContentTypesQuery();
const {
  create: createSpaceMutation,
  isCreating: isCreatingSpace,
  errors: creatSpaceErrors,
} = useCreateSpaceMutation();
const {
  create: createContentTypeMutation,
  isCreating: isCreatingContentType,
  errors: contentTypeMutationErrors,
} = useCreateContentTypeMutation();

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

const showCreateContentTypeDialog = ref(false);

const createSpace = async () => {
  try {
    await createSpaceMutation(space.value);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Space created.`,
      life: 2000,
    });
    await refreshSpaces();
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error while creating space',
      detail:
        creatSpaceErrors.value.join(', ') ||
        'Have a look at the errors and try again.',
      life: 3000,
    });
  }
};
const createContentType = async () => {
  try {
    await createContentTypeMutation(contentType.value);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Content type created.`,
      life: 2000,
    });
    await refreshContentTypes();
    showCreateContentTypeDialog.value = false;
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error while creating content type',
      detail:
        contentTypeMutationErrors.value.join(', ') ||
        'Have a look at the errors and try again.',
      life: 3000,
    });
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
            <div v-if="contentTypes.length > 0" class="flex gap-2">
              <div class="flex-1">Content types</div>
              <div>{{ contentTypes.length }}</div>
            </div>
            <div v-else class="flex gap-2 justify-between items-center">
              <div>No content types found.</div>
              <Button
                type="button"
                label="Create Content type"
                :loading="showCreateContentTypeDialog"
                :disabled="showCreateContentTypeDialog"
                @click="showCreateContentTypeDialog = true"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <Dialog
      :visible="showCreateContentTypeDialog"
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
</template>
