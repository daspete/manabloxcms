import type { Content } from '~/generated/graphql/graphql';
import contentsQuery from '~/graphql/contents/contents.query.gql';

export const useContentsQuery = (variables = {}) => {
  const contents = ref([]);
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    try {
      const { data } = await useAsyncQuery<{ contents: Array<Content> }>(
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
