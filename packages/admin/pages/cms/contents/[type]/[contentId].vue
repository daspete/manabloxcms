<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import updateContentMutation from "~/graphql/contents/update-content.mutation.gql";

const route = useRoute();
const toast = useToast();

const { loading: contentTypeLoading, contentType } = useContentTypeQuery({
  name: route.params.type,
});

const { loading: contentLoading, content } = useContentQuery({
  contentId: route.params.contentId,
});

const isUpdating = ref(false);

const updateContent = async () => {
  isUpdating.value = true;

  const { mutate } = useMutation(updateContentMutation, {
    variables: {
      content: stripTypename(clone(content.value)),
    },
  });

  try {
    await mutate();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: `Content updated.`,
      life: 2000,
    });
  } catch (err: any) {
    toast.add({
      severity: "error",
      summary: "Error while updating content",
      detail: err.message,
      life: 3000,
    });
  } finally {
    isUpdating.value = false;
  }
};

const contentReady = computed(() => !contentLoading.value && !contentTypeLoading.value && content.value && contentType.value && content.value.contentId);
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold"> Update content </span>
      <div class="flex gap-2">
        <NuxtLink to="/cms/contents">
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
          label="Update"
          icon="i-mdi-content-save"
          @click="updateContent"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <ContentEditor v-if="contentReady" :contentType="contentType" :content="content" />
      </template>
    </Card>

    <BlockUI :blocked="isUpdating" fullScreen />
  </div>
</template>
