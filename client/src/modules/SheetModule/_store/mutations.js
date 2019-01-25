/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import * as T from './mutation-types';

export default {
  [T.INCREASE_STAT](state, key) {
    state.stats[key].val++;
  },
  [T.DECREASE_STAT](state, key) {
    state.stats[key].val++;
  },
  [T.INCREASE_STAT_POOL](state) {
    state.statPool++;
  },
  [T.DECREASE_STAT_POOL](state) {
    state.statPool--;
  },
};
