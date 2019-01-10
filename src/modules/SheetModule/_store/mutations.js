/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import * as MT from './mutation-types';

export default {
  [MT.INCREASE_STAT](state, key) {
    state.stats[key].val++;
  },
  [MT.DECREASE_STAT](state, key) {
    state.stats[key].val++;
  },
  [MT.INCREASE_STAT_POOL](state) {
    state.statPool++;
  },
  [MT.DECREASE_STAT_POOL](state) {
    state.statPool--;
  },
};
