import type { Content, PaginatedContents } from '~/generated/graphql/graphql';
import contentsQuery from '~/graphql/contents/contents.query.gql';

export const useContentsQuery = (variables = {}) => {
  const contents = ref<PaginatedContents>({
    total: 0,
    page: 0,
    limit: 0,
    items: [],
  });
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    try {
      const { data } = await useAsyncQuery<{ contents: PaginatedContents }>(
        contentsQuery,
        _variables,
      );

      if (data.value?.contents) {
        contents.value = clone(data.value.contents);
      }
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  refetch(variables);

  return {
    loading,
    refetch,
    contents,
  };
};
