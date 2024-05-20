import type { ContentType } from "~/generated/graphql/graphql";
import contentTypeQuery from "~/graphql/content-types/content-type.query.gql";

export const useContentTypeQuery = (variables = {}) => {
  const contentType = ref<ContentType>({} as ContentType);

  const { onResult, onError, refetch, loading } = useQuery(
    contentTypeQuery,
    variables,
    {
      fetchPolicy: 'network-only'
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
