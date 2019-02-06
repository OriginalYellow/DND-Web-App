/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import * as T from './mutation-types';

export default {
  [T.OPEN_DRAWER](state) {
    state.drawerIsOpen = true;
  },

  [T.CLOSE_DRAWER](state) {
    state.drawerIsOpen = false;
  },

  [T.SET_USER](state, user) {
    state.user = user;
  },

  [T.CLEAR_USER](state) {
    state.user = null;
  },

  [T.SET_LOADING](state, loading) {
    state.loading = loading;
  },

  [T.SET_ERROR](state, payload) {
    state.error = payload;
  },

  // [T.SET_AUTH_ERROR](state, payload) {
  //   state.authError = payload;
  // },

  [T.CLEAR_ERROR](state) {
    state.error = null;
  },
};
