<script setup lang="ts">
import createContentTypeMutation from "~/graphql/content-types/create-content-type.mutation.gql";
import { useToast } from "primevue/usetoast";
import { v4 as uuid4 } from "uuid";
import type { ContentType } from "~/generated/graphql/graphql";

const toast = useToast();

const contentType = ref<Partial<ContentType>>({
  name: "",
  contentTypeId: uuid4(),
  isBlockType: false,
  isPublishable: false,
  canBeVisibleInMenu: false,
  isVisibleInTree: false,
  fields: [],
});

const isCreating = ref(false);

const createContentType = async () => {
  isCreating.value = true;

  const { mutate } = useMutation(createContentTypeMutation, {
    variables: {
      contentType: contentType.value,
    },
  });

  try {
    await mutate();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: `Content type "${contentType.value.name}" created.`,
      life: 2000,
    });
  } catch (err: any) {
    toast.add({
      severity: "error",
      summary: "Error while creating content type",
      detail: err.message,
      life: 3000,
    });
  } finally {
    isCreating.value = false;
  }
};
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold"> Add a new content type </span>
      <div class="flex gap-2">
        <NuxtLink to="/cms/content-types">
          <Button
            type="button"
            label="Back to overview"
            icon="i-mdi-chevron-left"
            severity="secondary"
            outlined
          />
        </NuxtLink>
        <Button
          type="button"
          label="Create"
          icon="i-mdi-content-save"
          @click="createContentType"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <ContentTypeEditor :contentType="contentType" />
      </template>
    </Card>

    <BlockUI :blocked="isCreating" fullScreen />
  </div>
</template>
