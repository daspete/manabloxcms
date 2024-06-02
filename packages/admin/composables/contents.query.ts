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

    try {
      await new Promise((resolve, reject) => {
        const { onResult, onError } = useQuery(contentsQuery, _variables, {
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
            contents.value = clone(result.data?.contents);
            resolve(result.data?.contents);
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
    contents,
  };
};
