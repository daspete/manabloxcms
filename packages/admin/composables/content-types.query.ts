import type { ContentType } from "~/generated/graphql/graphql";
import contentTypesQuery from "~/graphql/content-types/content-types.query.gql";

export const useContentTypesQuery = (variables = {}) => {
  const contentTypes = ref<Array<Partial<ContentType>>>([]);

  const { onResult, onError, refetch, loading } = useQuery(
    contentTypesQuery,
    variables,
    {
      fetchPolicy: 'network-only'
    }
  );

  onResult((result) => {
    if (result.partial) return;
    contentTypes.value = result.data.contentTypes;
  });

  return {
    loading,
    refetch,
    contentTypes,
  };
};
