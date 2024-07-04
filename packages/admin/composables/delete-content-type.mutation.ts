import type { ContentType } from '~/generated/graphql/graphql';
import deleteContentTypeMutation from '~/graphql/content-types/delete-content-type.mutation.gql';

export const useDeleteContentTypeMutation = () => {
  const isDeleting = ref(false);
  const errors = ref<string[]>([]);
  const contentType = ref<ContentType | undefined | null>(null);

  const { mutate } = useMutation<{ deleteContentType: ContentType }>(
    deleteContentTypeMutation,
  );

  return {
    isDeleting,
    errors,
    contentType,
    remove: async (contentTypeId: string) => {
      isDeleting.value = true;
      errors.value = [];

      try {
        const result = await mutate({
          contentTypeId,
        });
        contentType.value = result?.data?.deleteContentType;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        errors.value = err.message.split(',');
      }

      isDeleting.value = false;

      if (errors.value.length) {
        throw new Error(errors.value.join(', '));
      }
    },
  };
};
