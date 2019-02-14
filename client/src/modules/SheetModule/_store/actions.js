/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
// import * as AT from './action-types';
import * as T from './mutation-types';

export default {
  increaseStat({ commit }, key) {
    commit(T.INCREASE_STAT, key);
  },
  decreaseStat({ commit }, key) {
    commit(T.DECREASE_STAT, key);
  },
  increaseStatPool({ commit }) {
    commit(T.INCREASE_STAT_POOL);
  },
  decreaseStatPool({ commit }) {
    commit(T.DECREASE_STAT_POOL);
  },
};
