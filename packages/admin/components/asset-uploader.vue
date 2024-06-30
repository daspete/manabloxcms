<script setup lang="ts">
import type { Asset } from '~/generated/graphql/graphql';

const { currentSpace } = useCurrentSpace();

defineProps({
  outlined: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['uploaded']);

const runtimeConfig = useRuntimeConfig();
const accessTokenCookie = useCookie('accesstoken');
const refreshTokenCookie = useCookie('refreshtoken');

const uploaderIsActive = ref(false);
const isDragging = ref(false);
const isUploading = ref(false);

const showUploader = () => {
  uploaderIsActive.value = true;
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = true;
};

const onDragLeave = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = false;
};

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer?.files) {
    uploadFiles(Array.from(event.dataTransfer.files));
  }
  isDragging.value = false;
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newFiles = target.files;

  if (newFiles) {
    uploadFiles(Array.from(newFiles));
  }
};

const uploadFiles = async (files: Array<File>) => {
  isUploading.value = true;
  const successfulUploads: Array<Asset> = [];
  const uploadErrors: Array<string> = [];

  for (const file of files) {
    try {
      const asset = await uploadFile(file);

      if (asset.assetId) {
        successfulUploads.push(asset);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      uploadErrors.push(err.message);
    }
  }

  isUploading.value = false;

  emit('uploaded', successfulUploads, uploadErrors);

  uploaderIsActive.value = false;
};

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const accessToken = accessTokenCookie.value || '';
  const refreshToken = refreshTokenCookie.value || '';

  const response = await $fetch<Asset>(
    runtimeConfig.public.UPLOAD_ENDPOINT +
      `/${currentSpace.value?.spaceId || 'nospace'}`,
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        refreshtoken: refreshToken,
      },
    },
  );

  return response;
};
</script>

<template>
  <div>
    <Button
      label="Add new"
      :outlined="outlined"
      icon="i-mdi-plus"
      @click="showUploader"
    />

    <Dialog
      v-model:visible="uploaderIsActive"
      header="Asset uploader"
      modal
      class="w-1/2"
    >
      <div class="flex flex-col gap-2">
        <div v-if="!isUploading" class="dropzone h-32">
          <div
            :class="`dropzone__container relative border border-dashed border-black w-full h-full rounded flex items-center justify-center transition-all ${isDragging ? 'bg-green-400 text-white' : ''}`"
            @dragover="onDragOver"
            @dragleave="onDragLeave"
            @drop="onDrop"
          >
            <input
              id="fileinput"
              type="file"
              multiple
              class="opacity-0 w-1 h-1 overflow-hidden absolute"
              @change="onFileChange"
            />

            <label for="fileinput" class="cursor-pointer w-full">
              <div class="flex flex-col gap-2 items-center">
                <i class="i-mdi-image-outline text-4xl" />
                <div>Drag and drop files here or click to select files</div>
              </div>
            </label>
          </div>
        </div>
        <div
          v-if="isUploading"
          class="flex flex-col gap-2 items-center justify-center h-32"
        >
          <ProgressSpinner
            class="w-8 h-8"
            stroke-width="4"
            animation-duration="0.5s"
          />
          <div>Please wait... Uploading in progress</div>
        </div>
      </div>
    </Dialog>
  </div>
</template>
