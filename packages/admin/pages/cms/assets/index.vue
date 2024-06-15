<script setup lang="ts">
definePageMeta({
  middleware: ['is-authenticated'],
});

const { loading, assets } = useAssetsQuery();
</script>
<template>
  <div class="container">
    <div class="flex py-8 justify-between items-center">
      <div class="text-2xl font-bold dark:text-white">Assets</div>
      <Button label="Add new" icon="i-mdi-plus" />
    </div>

    <div class="shadow">
      <DataTable
        :value="assets"
        paginator
        :rows="10"
        striped-rows
        :loading="loading"
      >
        <template #empty>No assets added yet.</template>

        <Column field="name" header="Name" sortable>
          <template #body="{ data }">
            <div>{{ data.name }}</div>
          </template>
        </Column>

        <Column field="type" header="Type">
          <template #body="{ data }">
            <div>{{ data.type }}</div>
            <div v-if="data.width || data.height" class="text-xs">
              {{ data.width }}x{{ data.height }}px
            </div>
          </template>
        </Column>

        <Column field="size" header="Size">
          <template #body="{ data }">
            <div>{{ data.size }}</div>
          </template>
        </Column>

        <Column class="w-16">
          <template #body> x </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
