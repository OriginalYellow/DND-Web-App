/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import * as T from './mutation-types';

export default {
  [T.TOGGLE_DRAWER](state) {
    state.drawerIsOpen = !state.drawerIsOpen;
  },
  [T.OPEN_DRAWER](state) {
    state.drawerIsOpen = true;
  },
};
