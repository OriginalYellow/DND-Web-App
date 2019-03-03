/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import gql from 'graphql-tag';
import * as R from 'ramda';
import * as A from './action-types';
import * as M from './mutation-types';
import { apolloClient } from '@/main';
// import { onLogin } from '@/vue-apollo';
import router from '@/router';

function onLogin(token, dispatch) {
  localStorage.setItem('apollo-token', token);
  apolloClient.resetStore()
    .then(() => {
      dispatch(A.GET_CURRENT_USER);
      router.push('/');
    });
}

// MIKE: put your query strings in their own folder and name them to make this
// less retarded:
export default {
  [A.GET_CURRENT_USER]({ commit }) {
    commit(M.SET_LOADING, true);
    apolloClient
      .query({
        query: gql`
          query {
            getCurrentUser {
              username
              email
              password
              playerCharacters {
                id
                name
                abilityScoreList {
                  name
                  value
                  proficient
                  modifier
                  info {
                    fullName
                  }}}}}`,
      })
      .then(({ data: { getCurrentUser: result } }) => {
        commit(M.SET_LOADING, false);
        if (result) {
          commit(M.SET_USER, R.omit(['__typename', 'playerCharacters'], result));
          commit(M.SET_PLAYER_CHARACTERS, result.playerCharacters);
        } else {
          commit(M.CLEAR_USER);
        }
      })
      .catch((err) => {
        commit(M.SET_LOADING, false);
        console.error(err);
      });
  },

  [A.SIGNUP_USER]({ commit, dispatch }, payload) {
    commit(M.CLEAR_ERROR);
    commit(M.SET_LOADING, true);
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
      commit(M.SET_LOADING, false);
      onLogin(token, dispatch);
    }).catch((err) => {
      commit(M.SET_LOADING, false);
      commit(M.SET_ERROR, err);
      console.error(err);
    });
  },

  [A.SIGNIN_USER]({ commit, dispatch }, payload) {
    commit(M.CLEAR_ERROR);
    commit(M.SET_LOADING, true);
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
      commit(M.SET_LOADING, false);
      onLogin(token, dispatch);
    }).catch((err) => {
      commit(M.SET_LOADING, false);
      commit(M.SET_ERROR, err);
      console.error(err);
    });
  },

  async [A.SIGNOUT_USER]({ commit }) {
    commit(M.CLEAR_USER);
    commit(M.CLEAR_PLAYER_CHARACTERS);
    commit(M.CLEAR_SELECTED_PLAYER_CHARACTER);
    localStorage.setItem('apollo-token', '');
    await apolloClient.resetStore();
    router.push('/');
  },

  [A.SELECT_PLAYER_CHARACTER]({ commit, state }, id) {
    commit(
      M.SET_SELECTED_PLAYER_CHARACTER,
      R.find(
        R.propEq('id', id),
        state.playerCharacters,
      ),
    );
    router.push('/character-sheet');
  },
};
