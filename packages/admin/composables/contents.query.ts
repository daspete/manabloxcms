import type { PaginatedContents } from '~/generated/graphql/graphql';
import contentsQuery from '~/graphql/contents/contents.query.gql';

export const useContentsQuery = (variables = {}) => {
  const contents = ref<PaginatedContents>({
    total: 0,
    page: 0,
    limit: 0,
    items: [],
  });
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    await new Promise((resolve, reject) => {
      const { onResult } = useQuery(contentsQuery, _variables, {
        fetchPolicy: 'network-only',
      });

      onResult((result) => {
        if (result.partial) return;

        if (result.error) {
          reject(result.error);
        } else {
          contents.value = clone(result.data?.contents);
          resolve(result.data?.contents);
        }
      });
    });

    loading.value = false;
  };

  refetch(variables);

  return {
    loading,
    refetch,
    contents,
  };
};
