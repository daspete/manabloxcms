<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { v4 as uuid4 } from 'uuid';
import updateContentTypeMutation from '~/graphql/content-types/update-content-type.mutation.gql';

const route = useRoute();

const { loading, contentType } = useContentTypeQuery({ name: route.params.name });
const toast = useToast();

const isUpdating = ref(false);

const updateContentType = async () => {
  isUpdating.value = true;

  const { mutate } = useMutation(updateContentTypeMutation, {
    variables: {
      contentType: stripTypename(clone(contentType.value))
    }
  });

  try {
    const response = await mutate();
    toast.add({ severity: 'success', summary: 'Success', detail: `Content type "${ contentType.value.name }" updated.`, life: 5000 });
  } catch(err) {
    toast.add({ severity: 'error', summary: 'Error while updating content type', detail: err.message, life: 5000 });
  } finally {
    isUpdating.value = false;
  }

}
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold">
        Update content type
      </span>
      <div class="flex gap-2">
        <NuxtLink to="/cms/content-types">
          <Button type="button" label="Back to overview" icon="i-mdi-chevron-left" severity="secondary" outlined />
        </NuxtLink>
        <Button type="button" label="Update"  icon="i-mdi-content-save" @click="updateContentType" />
      </div>
    </div>

    <Card>
      <template #content>
        <ContentTypeEditor :contentType="contentType" />
      </template>
    </Card>

    <BlockUI :blocked="isUpdating" fullScreen />
  </div>
</template>
