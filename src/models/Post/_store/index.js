/* eslint-disable no-param-reassign */
// The posts module. You can add any additional things you want.
export default {
  state: {
    fetched: false,
  },

  actions: {
    fetch({ commit }) {
      commit('fetch');
    },
  },

  mutations: {
    fetch(state) {
      state.fetched = true;
    },
  },
};
