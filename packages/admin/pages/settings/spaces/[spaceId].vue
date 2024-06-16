<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

definePageMeta({
  middleware: ['is-authenticated'],
});

const { isUpdating, update, errors } = useUpdateSpaceMutation();
const route = useRoute();
const toast = useToast();

const { loading: spaceLoading, space } = useSpaceQuery({
  spaceId: route.params.spaceId,
});

const isInitializing = computed(() => spaceLoading.value);

const updateSpace = async () => {
  try {
    await update(space.value);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Space updated.`,
      life: 2000,
    });
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error while updating space',
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
      <span class="text-2xl font-bold dark:text-white">
        Update {{ space.name }}
      </span>
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
          label="Update"
          icon="i-mdi-content-save"
          :loading="isUpdating"
          :disabled="isUpdating"
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
