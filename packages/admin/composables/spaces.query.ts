import type { PaginatedSpaces } from '~/generated/graphql/graphql';
import spacesQuery from '~/graphql/spaces/spaces.query.gql';

export const useSpacesQuery = (variables = {}) => {
  const spaces = ref<PaginatedSpaces>({
    total: 0,
    page: 0,
    limit: 0,
    items: [],
  });
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    try {
      loading.value = true;

      await new Promise((resolve, reject) => {
        const { onResult } = useQuery(spacesQuery, _variables, {
          fetchPolicy: 'network-only',
        });

        onResult((result) => {
          if (result.partial) return;

          if (result.error) {
            reject(result.error);
          } else {
            spaces.value = clone(result.data?.spaces);
            resolve(result.data?.spaces);
          }
        });
      });
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  refetch(variables);

  return {
    loading,
    refetch,
    spaces,
  };
};
