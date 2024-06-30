import type { Content } from '~/generated/graphql/graphql';
import createContentMutation from '~/graphql/contents/create-content.mutation.gql';

export const useCreateContentMutation = () => {
  const { emit } = useGlobalEventBus();

  const isCreating = ref(false);
  const errors = ref<string[]>([]);
  const content = ref<Content | undefined | null>(null);

  const { mutate } = useMutation<{ createContent: Content }>(
    createContentMutation,
  );

  return {
    isCreating,
    errors,
    content,
    create: async (contentContent: Partial<Content>) => {
      isCreating.value = true;
      errors.value = [];

      try {
        const result = await mutate({
          content: prepareContentForMutation(clone(contentContent)),
        });

        content.value = result?.data?.createContent;

        emit('content:created', {
          parentId: content.value?.parent?.contentId,
          contentId: content.value?.contentId,
        });

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
