import type { Asset } from '~/generated/graphql/graphql';
import assetsQuery from '~/graphql/assets/assets.query.gql';

export const useAssetsQuery = (variables = {}) => {
  const assets = ref<Array<Asset>>([]);
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    try {
      await new Promise((resolve, reject) => {
        const { onResult, onError } = useQuery(assetsQuery, _variables, {
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
            assets.value = clone(result.data?.assets);
            resolve(result.data?.assets);
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
    assets,
  };
};
