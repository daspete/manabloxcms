import type { ContentType } from '~/generated/graphql/graphql';
import createContentTypeMutation from '~/graphql/content-types/create-content-type.mutation.gql';

export const useCreateContentTypeMutation = () => {
  const isCreating = ref(false);
  const errors = ref<string[]>([]);
  const contentType = ref<ContentType | undefined | null>(null);

  const { mutate } = useMutation<{ createContentType: ContentType }>(
    createContentTypeMutation,
  );

  return {
    isCreating,
    errors,
    contentType,
    create: async (contentTypeContent: Partial<ContentType>) => {
      isCreating.value = true;
      errors.value = [];

      try {
        const result = await mutate({
          contentType: prepareContentTypeForMutation(clone(contentTypeContent)),
        });
        contentType.value = result?.data?.createContentType;
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
