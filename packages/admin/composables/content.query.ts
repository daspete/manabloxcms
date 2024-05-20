import type { Content } from "~/generated/graphql/graphql";
import contentQuery from "~/graphql/contents/content.query.gql";

export const useContentQuery = (variables = {}) => {
  const content = ref<Content>({} as Content);

  const { onResult, onError, refetch, loading } = useQuery(
    contentQuery,
    variables,
    {
      fetchPolicy: 'network-only'// 'cache-and-network'
    }
  );

  onResult((result) => {
    if (result.partial) return;
    content.value = clone(result.data.content);
  });

  return {
    loading,
    refetch,
    content,
  };
};
