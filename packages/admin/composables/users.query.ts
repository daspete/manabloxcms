import type { User } from '~/generated/graphql/graphql';
import usersQuery from '~/graphql/users/users.query.gql';

export const useUsersQuery = (variables = {}) => {
  const users = ref<Array<User>>([]);
  const loading = ref(true);

  const refetch = async (_variables = {}) => {
    loading.value = true;

    await new Promise((resolve, reject) => {
      const { onResult } = useQuery(usersQuery, _variables, {
        fetchPolicy: 'network-only',
      });

      onResult((result) => {
        if (result.partial) return;

        if (result.error) {
          reject(result.error);
        } else {
          users.value = clone(result.data?.users);
          resolve(result.data?.users);
        }
      });
    });

    loading.value = false;
  };

  refetch(variables);

  return {
    loading,
    refetch,
    users,
  };
};
