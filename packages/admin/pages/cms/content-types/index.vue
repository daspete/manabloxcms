<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";

const { loading, contentTypes, refetch } = useContentTypesQuery();
const router = useRouter();
const confirm = useConfirm();

const onContentTypeSelect = (event) => {
  console.log(event.data);
  router.push(`/cms/content-types/${event.data.name}`);
};

const deleteContentTypeById = (contentTypeId) => {
  console.log("delete content type");
};

const confirmContentTypeDeletion = (event, contentType) => {
  confirm.require({
    target: event.currentTarget,
    group: "deleteContentTypeGroup",
    message: `Content type ${contentType.name ? contentType.name : ""
      } will be deleted.`,
    accept: () => {
      deleteContentTypeById(contentType.id);
    },
    reject: () => { },
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
        <DataTable :value="contentTypes" paginator :rows="5" stripedRows :loading="loading" removableSort
          selectionMode="single" :rowsPerPageOptions="[5, 10, 20, 50]"
          paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{first} to {last} of {totalRecords}" @rowSelect="onContentTypeSelect">
          <template #paginatorstart>
            <Button type="button" label="Reload" icon="i-mdi-reload" rounded size="small" @click="refetch" />
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
          <Column field="isPublishable" class="w-48 text-center">
            <template #header="{ data }">
              <div class="text-center flex-1">is publishable</div>
            </template>
            <template #body="{ data }">
              <i v-if="data.isPublishable" class="i-mdi-check text-green-500" />
              <i v-else class="i-mdi-window-close" />
            </template>
          </Column>
          <Column class="w-16">
            <template #body="{ data }">
              <Button @click="confirmContentTypeDeletion($event, data)" icon="i-mdi-trash" text severity="secondary"
                size="large" />
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
            <Button label="Yes" size="small" icon="i-mdi-check" severity="danger" @click="acceptCallback" />
            <Button label="No" size="small" icon="i-mdi-window-close" severity="success" @click="rejectCallback" />
          </div>
        </div>
      </template>
    </ConfirmPopup>
  </div>
</template>
