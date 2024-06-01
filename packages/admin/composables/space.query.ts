import type { Space } from '~/generated/graphql/graphql';
import spaceQuery from '~/graphql/spaces/space.query.gql';

export const useSpaceQuery = (variables = {}) => {
  const space = ref<Space>({} as Space);
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    await new Promise((resolve, reject) => {
      const { onResult } = useQuery(spaceQuery, _variables, {
        fetchPolicy: 'network-only',
      });

      onResult((result) => {
        if (result.partial) return;

        if (result.error) {
          reject(result.error);
        } else {
          space.value = clone(result.data?.space);
          resolve(result.data?.space);
        }
      });
    });

    loading.value = false;
  };

  refetch(variables);

  return {
    loading,
    refetch,
    space,
  };
};
