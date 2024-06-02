<script setup lang="ts">
import type { PageState } from 'primevue/paginator';
import type { Space } from '~/generated/graphql/graphql';
import deleteSpaceMutation from '~/graphql/spaces/delete-space.mutation.gql';

const variables = ref<{ page: number; limit: number }>({
  page: 1,
  limit: 10,
});

const { loading, spaces, refetch } = useSpacesQuery(variables.value);
const confirm = useConfirm();
const toast = useToast();

const isDeleting = ref(false);

const possiblePageLimits = [10, 20, 50, 100];

const deleteSpace = async (space: Partial<Space>) => {
  isDeleting.value = true;

  const { mutate } = await useMutation(deleteSpaceMutation, {
    variables: { spaceId: space.spaceId },
  });

  try {
    await mutate();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Space ${space.name} deleted.`,
      life: 2000,
    });

    refetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: 'Error while deleting space',
      detail: err.message,
      life: 3000,
    });
  } finally {
    isDeleting.value = false;
  }
};

const confirmSpaceDeletion = (event: MouseEvent, space: Space) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    group: 'deleteSpaceGroup',
    message: `Space ${space.name} will be deleted.`,
    accept: () => {
      deleteSpace(space);
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
  refetch(variables.value);
};
</script>

<template>
  <div class="container">
    <div class="flex py-8 justify-between items-center">
      <div class="text-2xl font-bold dark:text-white">Spaces</div>
      <NuxtLink to="/settings/spaces/create">
        <Button label="Add new" icon="i-mdi-plus" />
      </NuxtLink>
    </div>

    <div>
      <div class="flex flex-col gap-2">
        <DataTable
          :total-records="spaces.total"
          :value="spaces.items"
          striped-rows
          removable-sort
          :loading="loading"
          class="shadow"
        >
          <template #empty>No content added yet.</template>

          <Column field="name" header="Name">
            <template #body="{ data }">
              <div>
                <NuxtLink :to="`/settings/spaces/${data.spaceId}`">
                  <div>{{ data.name }}</div>
                  <div class="text-xs">Space ID: {{ data.spaceId }}</div>
                </NuxtLink>
              </div>
            </template>
          </Column>

          <Column field="description" header="Description">
            <template #body="{ data }">
              <div>{{ data.description }}</div>
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
                @click="confirmSpaceDeletion($event, data)"
              />
            </template>
          </Column>
        </DataTable>

        <Paginator
          v-if="spaces.total > variables.limit"
          :total-records="spaces.total"
          :rows="10"
          :rows-per-page-options="possiblePageLimits"
          class="shadow"
          @page="changePage"
          @update:rows="changeLimit"
        />
      </div>
    </div>

    <ConfirmPopup group="deleteSpaceGroup">
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
