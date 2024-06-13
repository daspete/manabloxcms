import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { provideApolloClient } from '@vue/apollo-composable';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const accessToken = useCookie('accesstoken');
  const refreshToken = useCookie('refreshtoken');

  const httpLink = createHttpLink({
    uri: runtimeConfig.public.API_URL,
  });

  const authLink = setContext((_, { headers }) => {
    const _headers = {
      ...(typeof headers === 'object' ? headers : {}),
    };

    if (accessToken.value) {
      _headers.authorization = `Bearer ${accessToken.value}`;
    }

    if (refreshToken.value) {
      _headers.refreshtoken = refreshToken.value;
    }

    return { headers: _headers };
  });

  const cache = new InMemoryCache();

  const apolloClient = new ApolloClient({
    link: from([authLink, httpLink]),
    cache,
  });

  provideApolloClient(apolloClient);
});
