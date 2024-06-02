import type { Space } from '~/generated/graphql/graphql';
import spaceQuery from '~/graphql/spaces/space.query.gql';

export const useSpaceQuery = (variables = {}) => {
  const space = ref<Space>({} as Space);
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    try {
      await new Promise((resolve, reject) => {
        const { onResult, onError } = useQuery(spaceQuery, _variables, {
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
            space.value = clone(result.data?.space);
            resolve(result.data?.space);
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
    space,
  };
};
