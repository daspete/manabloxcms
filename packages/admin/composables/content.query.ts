import type { Content } from '~/generated/graphql/graphql';
import contentQuery from '~/graphql/contents/content.query.gql';

export const useContentQuery = (variables = {}) => {
  const content = ref<Content>({} as Content);
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    await new Promise((resolve, reject) => {
      const { onResult } = useQuery(contentQuery, _variables, {
        fetchPolicy: 'network-only',
      });

      onResult((result) => {
        if (result.partial) return;

        if (result.error) {
          reject(result.error);
        } else {
          content.value = clone(result.data?.content);
          resolve(result.data?.content);
        }
      });
    });

    loading.value = false;
  };

  refetch(variables);

  return {
    loading,
    refetch,
    content,
  };
};
