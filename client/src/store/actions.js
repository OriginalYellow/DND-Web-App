/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import gql from 'graphql-tag';
import * as R from 'ramda';
import * as AT from './action-types';
import * as MT from './mutation-types';
import { apolloClient } from '@/main';
// import { onLogin } from '@/vue-apollo';
import router from '@/router';

function onLogin(token, dispatch) {
  localStorage.setItem('apollo-token', token);
  apolloClient.resetStore()
    .then(() => {
      dispatch(AT.GET_CURRENT_USER);
      router.push('/');
    });
}

export default {
  [AT.GET_CURRENT_USER]({ commit }) {
    commit(MT.SET_LOADING, true);
    apolloClient
      .query({
        query: gql`
          query {
            getCurrentUser {
              username
              email
              password
            }
          }
        `,
      })
      .then(({ data: { getCurrentUser } }) => {
        commit(MT.SET_LOADING, false);
        commit(MT.SET_USER, R.omit(['__typename'], getCurrentUser));
      })
      .catch((err) => {
        commit(MT.SET_LOADING, false);
        console.error(err);
      });
  },

  [AT.SIGNUP_USER]({ commit, dispatch }, payload) {
    commit(MT.SET_LOADING, true);
    apolloClient.mutate({
      mutation: gql`
        mutation ($username: String!, $email: String!, $password: String!) {
          signupUser(username: $username, email: $email, password: $password, ) {
            token
          }
        }
      `,
      variables: payload,
    }).then(({ data: { signupUser: { token } } }) => {
      commit(MT.SET_LOADING, false);
      onLogin(token, dispatch);
    });
  },

  [AT.SIGNIN_USER]({ commit, dispatch }, payload) {
    commit(MT.SET_LOADING, true);
    apolloClient.mutate({
      mutation: gql`
        mutation ($username: String!, $password: String!) {
          signinUser(username: $username password: $password, ) {
            token
          }
        }
      `,
      variables: payload,
    }).then(({ data: { signinUser: { token } } }) => {
      commit(MT.SET_LOADING, false);
      onLogin(token, dispatch);
    });
  },

  async [AT.SIGNOUT_USER]({ commit }) {
    commit(MT.CLEAR_USER);
    localStorage.setItem('token', '');
    await apolloClient.resetStore();
    router.push('/');
  },
};
