<script setup lang="ts">
import type { Asset } from '~/generated/graphql/graphql';
import deleteAssetMutation from '~/graphql/assets/delete-asset.mutation.gql';
import { getThumbnailUrl } from '~/utils/get-thumbnail-url';

definePageMeta({
  middleware: ['is-authenticated'],
});

const { loading, assets, refetch } = useAssetsQuery();
const confirm = useConfirm();
const toast = useToast();

const isDeleting = ref(false);

const deleteAsset = async (asset: Partial<Asset>) => {
  isDeleting.value = true;

  const { mutate } = await useMutation(deleteAssetMutation, {
    variables: { assetId: asset.assetId },
  });

  try {
    await mutate();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Asset ${asset.name} deleted.`,
      life: 2000,
    });

    refetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: 'Error while deleting asset',
      detail: err.message,
      life: 3000,
    });
  } finally {
    isDeleting.value = false;
  }
};

const confirmAssetDeletion = (event: MouseEvent, asset: Asset) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    group: 'deleteAssetGroup',
    message: `Asset ${asset.name} will be deleted.`,
    accept: () => {
      deleteAsset(asset);
    },
    reject: () => {},
  });
};
</script>
<template>
  <div class="container">
    <div class="flex py-8 justify-between items-center">
      <div class="text-2xl font-bold dark:text-white">Assets</div>
      <AssetUploader :outlined="false" @uploaded="refetch" />
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

        <Column class="w-24">
          <template #body="{ data }">
            <!-- eslint-disable-next-line vue/html-self-closing -->
            <img
              v-if="data.type.startsWith('image')"
              :src="getThumbnailUrl(data)"
              class="aspect-square w-full h-full object-cover"
            />
          </template>
        </Column>

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
          <template #body="{ data }">
            <Button
              class="w-12"
              icon="i-mdi-trash"
              aria-label=""
              text
              rounded
              severity="secondary"
              size="large"
              @click="confirmAssetDeletion($event, data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <ConfirmPopup group="deleteAssetGroup">
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
