// MIKE: have the state property be a function so you can reuse the store. see
// https://vuex.vuejs.org/guide/modules.html#module-reuse
import Vue from 'vue';
import Vuex from 'vuex';

// root actions, getters, mutations
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = () => ({
  drawerIsOpen: false,
  user: null,
  playerCharacters: [],
  selectedPlayerCharacter: null,
  loading: false,
  error: null,
});

const store = {
  state,
  actions,
  getters,
  mutations,
};

Vue.use(Vuex);
export default new Vuex.Store(store);
