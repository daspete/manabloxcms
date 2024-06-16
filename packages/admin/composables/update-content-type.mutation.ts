import type { ContentType } from '~/generated/graphql/graphql';
import updateContentTypeMutation from '~/graphql/content-types/update-content-type.mutation.gql';

export const useUpdateContentTypeMutation = () => {
  const isUpdating = ref(false);
  const errors = ref<string[]>([]);
  const contentType = ref<ContentType | undefined | null>(null);

  const { mutate } = useMutation<{ updateContentType: ContentType }>(
    updateContentTypeMutation,
  );

  return {
    isUpdating,
    errors,
    contentType,
    update: async (contentTypeContent: Partial<ContentType>) => {
      isUpdating.value = true;
      errors.value = [];

      try {
        const result = await mutate({
          contentType: stripTypename(
            prepareContentTypeForMutation(clone(contentTypeContent)),
          ),
        });
        contentType.value = result?.data?.updateContentType;
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
