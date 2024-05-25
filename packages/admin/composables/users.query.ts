import type { User } from "~/generated/graphql/graphql";
import usersQuery from "~/graphql/users/users.query.gql";

export const useUsersQuery = (variables = {}) => {
  const users = ref<Array<User>>([]);
  const loading = ref(true);

  const refetch = async (_variables: any) => {
    loading.value = true;

    try {
      const { data } = await useAsyncQuery<{ users: Array<User> }>(usersQuery, _variables);

      if(data.value?.users) {
        users.value = clone(data.value.users);
      }
    }catch(err){
      console.log(err);
    }finally {
      loading.value = false;
    }
  };

  refetch(variables);

  return {
    loading,
    refetch,
    users,
  };
};
