<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import updateSpaceMutation from '~/graphql/spaces/update-space.mutation.gql';

const route = useRoute();
const toast = useToast();

const { loading: spaceLoading, space } = useSpaceQuery({
  spaceId: route.params.spaceId,
});

const isInitializing = computed(() => spaceLoading.value);

const isUpdating = ref(false);

const updateSpace = async () => {
  isUpdating.value = true;

  const { mutate } = useMutation(updateSpaceMutation, {
    variables: {
      space: stripTypename(prepareSpaceForMutation(clone(space.value))),
    },
  });

  try {
    await mutate();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Space updated.`,
      life: 2000,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: 'Error while updating space',
      detail: err.message,
      life: 3000,
    });
  } finally {
    isUpdating.value = false;
  }
};
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold"> Update {{ space.name }} </span>
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
          @click="updateSpace"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <div v-if="!isInitializing">
          <SpaceEditor :space="space" />
        </div>
      </template>
    </Card>

    <BlockUI :blocked="isUpdating" full-screen />
  </div>
</template>
