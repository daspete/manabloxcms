<script setup lang="ts">
import type { PageState } from 'primevue/paginator';
import { useConfirm } from 'primevue/useconfirm';
import type { ContentType } from '~/generated/graphql/graphql';

definePageMeta({
  middleware: ['is-authenticated'],
});

const variables = ref<{ page: number; limit: number }>({
  page: 1,
  limit: 10,
});

const { loading, contentTypes, refetch } = useContentTypesQuery(
  variables.value,
);
const { isDeleting, remove } = useDeleteContentTypeMutation();

const confirm = useConfirm();
const toast = useToast();

const possiblePageLimits = [10, 20, 50, 100];

const deleteContentType = async (contentType: Partial<ContentType>) => {
  if (!contentType.contentTypeId) return;

  try {
    await remove(contentType.contentTypeId);

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Content type ${contentType.name} deleted.`,
      life: 2000,
    });
    refetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: 'Error while deleting content type',
      detail: err.message,
      life: 3000,
    });
  }
};

const confirmContentTypeDeletion = (
  event: MouseEvent,
  contentType: ContentType,
) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    group: 'deleteContentTypeGroup',
    message: `Content type ${
      contentType.name ? contentType.name : ''
    } will be deleted.`,
    accept: () => {
      deleteContentType(contentType);
    },
    reject: () => {},
  });
};

const changePage = (event: PageState) => {
  variables.value.page = event.page + 1;
  refetch(variables.value);
};

const changeLimit = (limit: number) => {
  variables.value.limit = limit;
  variables.value.page = 1;
  refetch(variables.value);
};
</script>

<template>
  <div class="container">
    <div class="flex py-8 justify-between items-center">
      <div class="text-2xl font-bold dark:text-white">Content types</div>
      <NuxtLink to="/cms/content-types/create">
        <Button label="Add new" icon="i-mdi-plus" />
      </NuxtLink>
    </div>

    <div>
      <div class="shadow">
        <DataTable
          :total-records="contentTypes.total"
          :value="contentTypes.items"
          striped-rows
          removable-sort
          :loading="loading"
          class="shadow"
        >
          <template #empty>No content types added yet.</template>

          <Column field="name" header="Name" sortable>
            <template #body="{ data }">
              <div>
                <NuxtLink
                  :to="`/cms/content-types/${data.contentTypeId}`"
                  class="flex items-center gap-2"
                >
                  <div v-if="data.icon" class="flex items-center">
                    <i :class="data.icon" />
                  </div>
                  <div>
                    <div>{{ data.name }}</div>
                    <div class="text-xs">
                      Content type ID: {{ data.contentTypeId }}
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </template>
          </Column>
          <Column field="isBlockType" class="w-48 text-center">
            <template #header>
              <div class="text-center flex-1">Type</div>
            </template>
            <template #body="{ data }">
              {{ data.isBlockType ? 'Block' : 'Single' }}
            </template>
          </Column>
          <Column class="w-16">
            <template #body="{ data }">
              <Button
                class="w-12"
                icon="i-mdi-trash"
                aria-label=""
                text
                rounded
                severity="secondary"
                size="large"
                @click="confirmContentTypeDeletion($event, data)"
              />
            </template>
          </Column>
        </DataTable>

        <Paginator
          v-if="contentTypes.total > variables.limit"
          :total-records="contentTypes.total"
          :rows="10"
          :rows-per-page-options="possiblePageLimits"
          class="shadow"
          @page="changePage"
          @update:rows="changeLimit"
        />
      </div>
    </div>

    <ConfirmPopup group="deleteContentTypeGroup">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="px-4 py-2">
          <div class="text-center font-bold">Are you sure?</div>
          <div>{{ message.message }}</div>
          <div class="flex gap-2 items-center justify-center mt-2">
            <Button
              label="Yes"
              size="small"
              icon="i-mdi-check"
              severity="danger"
              @click="acceptCallback"
            />
            <Button
              label="No"
              size="small"
              icon="i-mdi-window-close"
              severity="success"
              @click="rejectCallback"
            />
          </div>
        </div>
      </template>
    </ConfirmPopup>

    <BlockUI :blocked="isDeleting" full-screen />
  </div>
</template>
