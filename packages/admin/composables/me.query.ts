import type { User } from '~/generated/graphql/graphql';
import meQuery from '~/graphql/auth/me.query.gql';

const me = ref<User | null>(null);
const loading = ref(true);

export const useMeQuery = () => {
  const refetch = async () => {
    loading.value = true;

    try {
      await new Promise((resolve, reject) => {
        const { onResult, onError } = useQuery(meQuery);

        onError((error) => {
          reject(error);
        });

        onResult((result) => {
          if (result.partial) return;

          if (result.error) {
            console.log('error', result.error.message)
            reject(result.error);
          } else {
            resolve(result.data?.me);
          }
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
    }

    loading.value = false;
  };

  if(!me.value) {
    refetch();
  }

  return {
    loading,
    refetch,
    me,
  };
};
