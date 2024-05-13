import contentTypeQuery from "~/graphql/content-types/content-type.query.gql";

export const useContentTypeQuery = (variables = {}) => {
  const contentType = ref({});

  const { onResult, onError, refetch, loading } = useQuery(
    contentTypeQuery,
    variables,
    {
      fetchPolicy: 'cache-and-network'
    }
  );

  onResult((result) => {
    if (result.partial) return;
    contentType.value = clone(result.data.contentType);
  });

  return {
    loading,
    refetch,
    contentType,
  };
};
