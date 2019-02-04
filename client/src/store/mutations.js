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

  [T.CLEAR_USER](state, user) {
    state.user = user;
  },

  [T.SET_LOADING](state, loading) {
    state.loading = loading;
  },
};
