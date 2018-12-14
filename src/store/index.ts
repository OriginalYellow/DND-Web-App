import Vue from 'vue'
import Vuex, { Module } from 'vuex'
 
import CharacterSheet from './modules/characterSheet'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
  state: {},
  modules: {
    CharacterSheet,
  }
})