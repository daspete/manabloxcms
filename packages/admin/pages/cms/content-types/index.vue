<script setup lang="ts">
const { loading, contentTypes } = useContentTypesQuery();
const router = useRouter();

const onContentTypeSelect = (event) => {
  console.log(event.data);
  router.push(`/cms/content-types/${ event.data.name }`);
}
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
        <DataTable :value="contentTypes" paginator :rows="5" stripedRows :loading="loading" removableSort selectionMode="single"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          @rowSelect="onContentTypeSelect"
        >

          <template #paginatorstart>
            <Button type="button" label="Reload" icon="i-mdi-reload" rounded size="small" />
          </template>

          <template #paginatorend></template>

          <template #empty>No content types added yet.</template>

          <Column field="name" header="Name" sortable>
            <template #body="{ data }">
              <div>{{ data.name }}</div>
              <div class="text-xs">Content type ID: {{ data.contentTypeId }}</div>
            </template>
          </Column>
          <Column field="isPublishable" header="Publishable" class="w-64">
            <template #body="{ data }">
              <Tag v-if="data.isPublishable" value="Yes" severity="success" icon="i-mdi-check"></Tag>
              <Tag v-else value="No" severity="danger" icon="i-mdi-window-close"></Tag>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
