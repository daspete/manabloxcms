import type { Space } from '~/generated/graphql/graphql';
import createSpaceMutation from '~/graphql/spaces/create-space.mutation.gql';

export const useCreateSpaceMutation = () => {
  const isCreating = ref(false);
  const errors = ref<string[]>([]);
  const space = ref<Space | undefined | null>(null);

  const { mutate } = useMutation<{ createSpace: Space }>(createSpaceMutation);

  return {
    isCreating,
    errors,
    space,
    create: async (spaceContent: Partial<Space>) => {
      isCreating.value = true;
      errors.value = [];

      try {
        const result = await mutate({
          space: prepareSpaceForMutation(clone(spaceContent)),
        });
        space.value = result?.data?.createSpace;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        errors.value = err.message.split(',');
      }

      isCreating.value = false;

      if (errors.value.length) {
        throw new Error(errors.value.join(', '));
      }
    },
  };
};
