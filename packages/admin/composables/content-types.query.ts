import type { ContentType } from '~/generated/graphql/graphql';
import contentTypesQuery from '~/graphql/content-types/content-types.query.gql';

export const useContentTypesQuery = (variables = {}) => {
  const contentTypes = ref<Array<ContentType>>([]);
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    await new Promise((resolve, reject) => {
      const { onResult } = useQuery(contentTypesQuery, _variables, {
        fetchPolicy: 'network-only',
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

    loading.value = false;
  };

  refetch(variables);

  return {
    loading,
    refetch,
    contentTypes,
  };
};
