import type { Asset } from "~/generated/graphql/graphql";
import assetsQuery from "~/graphql/assets/assets.query.gql";

export const useAssetsQuery = (variables = {}) => {
  const assets = ref<Array<Asset>>([]);
  const loading = ref(true);

  const refetch = async (_variables: any = {}) => {
    loading.value = true;

    try {
      const { data } = await useAsyncQuery<{ assets: Array<Asset> }>(assetsQuery, _variables);

      if(data.value?.assets) {
        assets.value = clone(data.value.assets);
      }
    }catch(err){
      console.log(err);
    }finally {
      loading.value = false;
    }
  };

  refetch(variables);

  return {
    loading,
    refetch,
    assets,
  };
};
