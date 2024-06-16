import type { Space } from '~/generated/graphql/graphql';
import updateSpaceMutation from '~/graphql/spaces/update-space.mutation.gql';

export const useUpdateSpaceMutation = () => {
  const isUpdating = ref(false);
  const errors = ref<string[]>([]);
  const space = ref<Space | undefined | null>(null);

  const { mutate } = useMutation<{ updateSpace: Space }>(updateSpaceMutation);

  return {
    isUpdating,
    errors,
    space,
    update: async (spaceContent: Partial<Space>) => {
      isUpdating.value = true;
      errors.value = [];

      try {
        const result = await mutate({
          space: stripTypename(prepareSpaceForMutation(clone(spaceContent))),
        });
        space.value = result?.data?.updateSpace;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        errors.value = err.message.split(',');
      }

      isUpdating.value = false;

      if (errors.value.length) {
        throw new Error(errors.value.join(', '));
      }
    },
  };
};
