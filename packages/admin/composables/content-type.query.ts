import type { ContentType } from '~/generated/graphql/graphql';
import contentTypeQuery from '~/graphql/content-types/content-type.query.gql';

export const useContentTypeQuery = (variables = {}) => {
  const contentType = ref<ContentType>({} as ContentType);
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    await new Promise((resolve, reject) => {
      const { onResult } = useQuery(contentTypeQuery, _variables, {
        fetchPolicy: 'network-only',
      });

      onResult((result) => {
        if (result.partial) return;

        if (result.error) {
          reject(result.error);
        } else {
          contentType.value = clone(result.data?.contentType);
          resolve(result.data?.contentType);
        }
      });
    });

    loading.value = false;
  };

  refetch(variables);

  return {
    loading,
    refetch,
    contentType,
  };
};
