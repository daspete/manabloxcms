import type { Content } from "~/generated/graphql/graphql";
import contentsQuery from "~/graphql/contents/contents.query.gql";

export const useContentsQuery = (variables = {}) => {
  const contents = ref<Array<Partial<Content>>>([]);

  const { onResult, onError, refetch, loading } = useQuery(
    contentsQuery,
    variables,
    {
      fetchPolicy: 'network-only'
    }
  );

  onResult((result) => {
    if (result.partial) return;
    contents.value = result.data.contents;
  });

  return {
    loading,
    refetch,
    contents,
  };
};
