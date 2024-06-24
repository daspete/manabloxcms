<script setup lang="ts">
import type { Asset } from '~/generated/graphql/graphql';

const props = defineProps({
  multiple: {
    type: Boolean,
    required: true,
  },
});
const assetModel = defineModel<Asset>('asset');
const assetsModel = defineModel<Array<Asset>>('assets');

const preSelectedAsset = ref<Asset | undefined>(assetModel.value);
const preSelectedAssets = ref<Array<Asset> | undefined>(assetsModel.value);

const { loading, assets, refetch } = useAssetsQuery();

const selectorIsActive = ref(false);

const assetSelection = computed({
  get() {
    return props.multiple ? preSelectedAssets.value : preSelectedAsset.value;
  },
  set(value) {
    if (props.multiple) {
      preSelectedAssets.value = value as Array<Asset>;
    } else {
      preSelectedAsset.value = value as Asset;
    }
  },
});

const showSelector = () => {
  preSelectedAsset.value = assetModel.value;
  preSelectedAssets.value = assetsModel.value;

  selectorIsActive.value = true;
};

const confirmSelection = () => {
  if (props.multiple) {
    assetsModel.value = preSelectedAssets.value;
  } else {
    assetModel.value = preSelectedAsset.value;
  }

  selectorIsActive.value = false;
};

const onAssetsUploaded = async (
  assets: Array<Asset>,
  errors: Array<string>,
) => {
  if (errors.length) {
    console.error(errors);
  }

  await refetch();
};
</script>

<template>
  <Button
    :label="`Select asset${multiple ? 's' : ''}`"
    icon="i-mdi-image"
    severity="secondary"
    class="mb-4"
    @click="showSelector"
  />

  <div v-if="multiple && assetsModel">
    {{ assetsModel }}
  </div>

  <div v-if="!multiple && assetModel?.assetId">
    <div
      v-if="assetModel.url && assetModel.type.startsWith('image')"
      class="group relative w-full max-w-96 aspect-video flex items-center justify-center"
    >
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        :src="getThumbnailUrl(assetModel, { width: 1280, height: 720 })"
        :alt="assetModel.name"
        class="w-full h-full object-cover absolute"
      />

      <div
        class="absolute text-white opacity-0 group-hover:opacity-100 transition-all"
      >
        <Button
          icon="i-mdi-trash"
          severity="secondary"
          label="Remove"
          @click="assetModel = undefined"
        />
      </div>
    </div>

    <div
      v-if="assetModel.url && !assetModel.type.startsWith('image')"
      class="flex flex-col gap-2 justify-between border border-surface-200 py-2 px-4 rounded w-full max-w-96"
    >
      <div>{{ assetModel.name }}</div>
      <div>{{ assetModel.type }}</div>
      <a :href="assetModel.url" target="_blank">View file</a>
    </div>
  </div>

  <div v-if="selectorIsActive">
    <Dialog
      v-model:visible="selectorIsActive"
      header="Asset selector"
      modal
      class="w-3/4"
    >
      <div class="flex py-8 justify-between items-center">
        <div class="text-2xl font-bold dark:text-white">Assets</div>
        <div class="flex gap-2 items-center">
          <AssetUploader @uploaded="onAssetsUploaded" />
          <Button label="Select" icon="i-mdi-check" @click="confirmSelection" />
        </div>
      </div>

      <div class="shadow">
        <DataTable
          v-model:selection="assetSelection"
          :value="assets"
          data-key="assetId"
          paginator
          :rows="10"
          striped-rows
          :loading="loading"
        >
          <template #empty>No assets added yet.</template>

          <Column
            class="w-16"
            :selection-mode="multiple ? 'multiple' : 'single'"
          />

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
        </DataTable>
      </div>
    </Dialog>
  </div>
</template>
