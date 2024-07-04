import type { PaginatedContentTypes } from '~/generated/graphql/graphql';
import contentTypesQuery from '~/graphql/content-types/content-types.query.gql';

export const useContentTypesQuery = (variables = {}) => {
  const contentTypes = ref<PaginatedContentTypes>({
    total: 0,
    page: 0,
    limit: 0,
    items: [],
  });
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    try {
      await new Promise((resolve, reject) => {
        const { onResult, onError } = useQuery(contentTypesQuery, _variables, {
          fetchPolicy: 'network-only',
        });

        onError((error) => {
          reject(error);
        });

        onResult((result) => {
          if (result.partial) return;

          if (result.error) {
            reject(result.error);
          } else {
            contentTypes.value = clone(result.data?.contentTypes);
            resolve(result.data?.contentTypes);
          }
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
    }

    loading.value = false;
  };

  refetch(variables);

  return {
    loading,
    refetch,
    contentTypes,
  };
};
