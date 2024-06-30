import type { Content } from '~/generated/graphql/graphql';
import publishContentMutation from '~/graphql/contents/publish-content.mutation.gql';

export const usePublishContentMutation = () => {
  const { emit } = useGlobalEventBus();

  const isPublishing = ref(false);
  const errors = ref<string[]>([]);
  const content = ref<Content | undefined | null>(null);

  const { mutate } = useMutation<{ publishContent: Content }>(
    publishContentMutation,
  );

  return {
    isPublishing,
    errors,
    content,
    publish: async (contentId: string) => {
      isPublishing.value = true;
      errors.value = [];

      try {
        const result = await mutate({
          contentId,
        });

        content.value = result?.data?.publishContent;

        emit('content:published', {
          parentId: content.value?.parent?.contentId,
          contentId: content.value?.contentId,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        errors.value = err.message.split(',');
      }

      isPublishing.value = false;

      if (errors.value.length) {
        throw new Error(errors.value.join(', '));
      }
    },
  };
};
