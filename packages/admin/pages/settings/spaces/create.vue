<script setup lang="ts">
import { v4 as uuid4 } from 'uuid';
import type { Space } from '~/generated/graphql/graphql';

const {
  create,
  isCreating,
  errors,
  space: createdSpace,
} = useCreateSpaceMutation();

const router = useRouter();
const toast = useToast();

definePageMeta({
  middleware: ['is-authenticated'],
});

const space = ref<Partial<Space>>({
  spaceId: uuid4(),
  name: '',
  technicalName: '',
  description: '',
  url: '',
  settingsBlockType: undefined,
  settings: undefined,
});

const createSpace = async () => {
  try {
    await create(space.value);

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Space created.`,
      life: 2000,
    });

    router.push(`/settings/spaces/${createdSpace.value?.spaceId}`);
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error while creating space',
      detail:
        errors.value.join(', ') || 'Have a look at the errors and try again.',
      life: 3000,
    });
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
          :loading="isCreating"
          :disabled="isCreating"
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
