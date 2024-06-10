import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  const httpLink = createHttpLink({
    uri: runtimeConfig.public.API_URL,
  });

  const cache = new InMemoryCache();

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  });

  provideApolloClient(apolloClient);
});
