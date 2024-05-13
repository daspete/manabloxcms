import contentTypesQuery from "~/graphql/content-types/content-types.query.gql";

export const useContentTypesQuery = (variables = {}) => {
  const contentTypes = ref([]);

  const { onResult, onError, refetch, loading } = useQuery(
    contentTypesQuery,
    variables,
    {
      fetchPolicy: 'cache-and-network'
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
