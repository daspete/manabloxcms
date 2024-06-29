import {
  ApolloClient,
  InMemoryCache,
  Observable,
  createHttpLink,
  from,
  type FetchResult,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { provideApolloClient } from '@vue/apollo-composable';
import type { AuthTokens } from '~/generated/graphql/graphql';
import refreshTokensMutation from '~/graphql/auth/refresh-tokens.mutation.gql';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const accessToken = useCookie('accesstoken');
  const refreshToken = useCookie('refreshtoken');

  console.log('apollo url', runtimeConfig.public.API_URL);

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

  const errorLink = onError((err) => {
    if (err.graphQLErrors) {
      for (const graphQLError of err.graphQLErrors) {
        switch (graphQLError.extensions?.code) {
          case 'UNAUTHENTICATED':
          case 'FORBIDDEN':
            return new Observable<FetchResult>((observer) => {
              (async () => {
                if (!refreshToken.value) {
                  observer.error(err);
                  return;
                }

                try {
                  const { mutate } = await useMutation<{
                    refreshTokens: AuthTokens;
                  }>(refreshTokensMutation);

                  const result = await mutate();

                  if (
                    !result?.data?.refreshTokens?.accessToken ||
                    !result?.data?.refreshTokens?.refreshToken
                  ) {
                    refreshToken.value = null;
                    accessToken.value = null;
                    observer.error(graphQLError);
                    return;
                  }

                  accessToken.value = result.data.refreshTokens.accessToken;
                  refreshToken.value = result.data.refreshTokens.refreshToken;

                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  };

                  err.operation.setContext({
                    ...err.operation.getContext(),
                    headers: {
                      ...err.operation.getContext().headers,
                      authorization: `Bearer ${accessToken.value}`,
                    },
                  });

                  return err.forward(err.operation).subscribe(subscriber);
                } catch (err) {
                  accessToken.value = null;
                  refreshToken.value = null;
                  observer.error(err);
                }
              })();
            });
            break;
        }
      }
    }

    nuxtApp.callHook('apollo:error', err);
  });

  const cache = new InMemoryCache({
    // typePolicies: {
    //   Asset: {
    //     keyFields: ['assetId'],
    //   },
    //   User: {
    //     keyFields: ['userId'],
    //   },
    //   Content: {
    //     keyFields: ['contentId'],
    //   },
    //   ContentType: {
    //     keyFields: ['contentTypeId'],
    //   },
    //   Space: {
    //     keyFields: ['spaceId'],
    //   },
    // },
  });

  const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache,
  });

  provideApolloClient(apolloClient);
});
