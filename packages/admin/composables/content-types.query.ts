import type { ContentType } from "~/generated/graphql/graphql";
import contentTypesQuery from "~/graphql/content-types/content-types.query.gql";

export const useContentTypesQuery = (variables = {}) => {
  const contentTypes = ref<Array<ContentType>>([]);
  const loading = ref(true);

  const refetch = async (_variables: any = {}) => {
    loading.value = true;

    try {
      const { data } = await useAsyncQuery<{ contentTypes: Array<ContentType>}>(contentTypesQuery, _variables);

      if (data.value?.contentTypes) {
        contentTypes.value = clone(data.value.contentTypes);
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
    contentTypes,
  };
};
