<script setup lang="ts">
import { v4 as uuid4 } from 'uuid';
import type { Space } from '~/generated/graphql/graphql';
import createSpaceMutation from '~/graphql/spaces/create-space.mutation.gql';

const router = useRouter();
const toast = useToast();

const space = ref<Partial<Space>>({
  spaceId: uuid4(),
  name: '',
  technicalName: '',
  description: '',
  url: '',
  settingsBlockType: undefined,
  settings: undefined,
});

const isCreating = ref(false);

const createSpace = async () => {
  isCreating.value = true;

  const { mutate } = useMutation(createSpaceMutation, {
    variables: {
      space: prepareSpaceForMutation(clone(space.value)),
    },
  });

  try {
    await mutate();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Space created.`,
      life: 2000,
    });
    router.push(`/settings/spaces/${space.value.spaceId}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
  } finally {
    isCreating.value = false;
  }
};
</script>

<template>
  <div class="container pt-8">
    <div class="flex justify-between mb-8 items-center">
      <span class="text-2xl font-bold dark:text-white">Create a new space</span>
      <div class="flex gap-2">
        <NuxtLink to="/settings/spaces">
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
          @click="createSpace"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <SpaceEditor :space="space" />
      </template>
    </Card>

    <BlockUI :blocked="isCreating" full-screen />
  </div>
</template>
