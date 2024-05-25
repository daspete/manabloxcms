import type { ContentType } from "~/generated/graphql/graphql";
import contentTypeQuery from "~/graphql/content-types/content-type.query.gql";

export const useContentTypeQuery = (variables = {}) => {
  const contentType = ref<ContentType>({} as ContentType);
  const loading = ref(true);

  const refetch = async (_variables: any) => {
    loading.value = true;

    try {
      const { data } = await useAsyncQuery<{ contentType: ContentType}>(contentTypeQuery, _variables);

      if(data.value?.contentType) {
        contentType.value = clone(data.value.contentType);
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
    contentType,
  };
};
