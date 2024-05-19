<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import type { ContentType } from "~/generated/graphql/graphql";
import deleteContentTypeMutation from "~/graphql/content-types/delete-content-type.mutation.gql";

const { loading, contentTypes, refetch } = useContentTypesQuery();
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

const isDeleting = ref(false);

const onContentTypeSelect = (event: any) => {
  router.push(`/cms/content-types/${event.data.name}`);
};

const deleteContentType = async (contentType: Partial<ContentType>) => {
  isDeleting.value = true;

  const { mutate } = await useMutation(deleteContentTypeMutation, {
    variables: { contentTypeId: contentType.contentTypeId },
  });

  try {
    await mutate();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: `Content type ${contentType.name} deleted.`,
      life: 2000,
    });
    refetch();
  } catch (err: any) {
    toast.add({
      severity: "error",
      summary: "Error while deleting content type",
      detail: err.message,
      life: 3000,
    });
  } finally {
    isDeleting.value = false;
  }
};

const confirmContentTypeDeletion = (event: any, contentType: ContentType) => {
  confirm.require({
    target: event.currentTarget,
    group: "deleteContentTypeGroup",
    message: `Content type ${
      contentType.name ? contentType.name : ""
    } will be deleted.`,
    accept: () => {
      deleteContentType(contentType);
    },
    reject: () => {},
  });
};
</script>

<template>
  <div class="container">
    <div class="flex py-8 justify-between items-center">
      <div class="text-2xl font-bold">Content types</div>
      <NuxtLink to="/cms/content-types/create">
        <Button label="Add new" icon="i-mdi-plus"></Button>
      </NuxtLink>
    </div>

    <div>
      <div class="shadow">
        <DataTable
          :value="contentTypes"
          paginator
          :rows="5"
          stripedRows
          :loading="loading"
          removableSort
          selectionMode="single"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          @rowSelect="onContentTypeSelect"
        >
          <template #paginatorstart>
            <Button
              type="button"
              label="Reload"
              icon="i-mdi-reload"
              rounded
              size="small"
              @click="refetch"
            />
          </template>

          <template #paginatorend></template>

          <template #empty>No content types added yet.</template>

          <Column field="name" header="Name" sortable>
            <template #body="{ data }">
              <div>{{ data.name }}</div>
              <div class="text-xs">
                Content type ID: {{ data.contentTypeId }}
              </div>
            </template>
          </Column>
          <Column field="isBlockType" class="w-48 text-center">
            <template #header>
              <div class="text-center flex-1">Type</div>
            </template>
            <template #body="{ data }">
              {{ data.isBlockType ? "Block" : "Single" }}
            </template>
          </Column>
          <Column class="w-16">
            <template #body="{ data }">
              <Button
                @click="confirmContentTypeDeletion($event, data)"
                icon="i-mdi-trash"
                text
                severity="secondary"
                size="large"
              />
            </template>
          </Column>
        </DataTable>
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

    <BlockUI :blocked="isDeleting" fullScreen />
  </div>
</template>
