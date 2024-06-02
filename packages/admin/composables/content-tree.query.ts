import type { Content } from '~/generated/graphql/graphql';
import contentTreeQuery from '~/graphql/contents/content-tree.query.gql';

export const useContentTreeQuery = (variables = {}) => {
  const contentTree = ref<Content[]>([]);
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    try {
      await new Promise((resolve, reject) => {
        const { onResult, onError } = useQuery(contentTreeQuery, _variables, {
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
            contentTree.value = clone(result.data?.contentTree);
            resolve(result.data?.contentTree);
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
    contentTree,
  };
};
