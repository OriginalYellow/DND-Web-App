import Vue from 'vue';
import VueApollo from 'vue-apollo';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client';

Vue.use(VueApollo);

const AUTH_TOKEN = 'apollo-token';
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP;
// const httpEndpoint = 'https://dnd-web-app-server-7xvupoynn.now.sh/graphql';

// Config
const defaultOptions = {
  httpEndpoint,
  // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:1234/graphql',
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  getAuth: (tokenName) => {
    const token = localStorage.getItem(tokenName);
    if (!localStorage.getItem(tokenName)) {
      localStorage.setItem(tokenName, '');
    }

    return token;
  },
};

export function createClient(options = {}) {
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  });

  // apolloClient.wsClient = wsClient;

  return apolloClient;
}

export function createProvider(apolloClient) {
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // NOTE: documentation for "fetchPolicy": https://tinyurl.com/y8swk9py
        fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message);
    },
  });

  return apolloProvider;
}

export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message);
  }
}

export async function onLogout(apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message);
  }
}
