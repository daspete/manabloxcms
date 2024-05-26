import type { Content } from '~/generated/graphql/graphql';
import contentQuery from '~/graphql/contents/content.query.gql';

export const useContentQuery = (variables = {}) => {
  const content = ref<Content>({} as Content);
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    try {
      const { data } = await useAsyncQuery<{ content: Content }>(
        contentQuery,
        _variables,
      );

      if (data.value?.content) {
        content.value = clone(data.value.content);
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
    content,
  };
};
