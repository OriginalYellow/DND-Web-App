// MIKE: have the state property be a function so you can reuse the store. see
// https://vuex.vuejs.org/guide/modules.html#module-reuse
import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';

// models
import User from '@/models/User';
import Post from '@/models/Post';
import posts from '@/models/Post/_store';
import Character from '@/models/Character';
import Stat from '@/models/Stat';
import StatTypes from '@/models/StatType';

// root actions, getters, mutations
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const database = new VuexORM.Database();

database.register(Character);
database.register(Stat);
database.register(User);
database.register(StatTypes);
database.register(Post, posts);

const state = () => ({
  drawerIsOpen: false,
  user: null,
  loading: false,
});

const store = {
  state,
  actions,
  getters,
  mutations,
  plugins: [VuexORM.install(database)],
};

Vue.use(Vuex);
export default new Vuex.Store(store);
