// NOTE: "Note that getters accessed via methods will run each time you call
// them, and the result is not cached."
// source: https://vuex.vuejs.org/guide/getters.html

// MIKE: write your mutation signatures like this:
// const mutations = {
//   [types.SET_PARTNERS_LIST](state, partnersList) {
//     state.partnersList = partnersList;
//   },
//   [types.SET_CURRENT_PARTNER_ID](state, partnerId) {
//     state.currentPartnerId = partnerId;
//   }
// };

// source: https://blog.imaginea.com/migrating-between-redux-and-vuex-part-1/

// MIKE: keep lenses and immutability out of mutations. I had thought that the
// only big annoying part about having to use mutations is dynamically composing
// a path, but that shouldn't be an issue if you just use the object[key] syntax
// and construct the path like that. you could also use the that "pathify" vuex
// plugin to make it more consise.

// MIKE: i think your mutators are supposed to act like documentation - so
// making them do specific things and be called something specific is encouraged.
// also, restricting the types of things that mutators can do will increase the
// separation of concerns between them and actions.

// MIKE: you could still use lenses for incoming data - that might actually
// create a clear separation between how internal and external data should be
// handled. you could immutably change a little data structure (a lens) within
// an action and you can reuse it easily because its pure. that would be a good
// way of normalizing data (by key).

// NOTE: your internal data in a front end app shouldn't be especially complex.
// business logic is but it deals mostly with simplifying external data and
// expanding it into things that are complex, and that complexity doesn't stem
// from the data's complexity.
// also, anything that is more complex than vuex can handle probably has its own
// framework or works off in its own special area that doesn't resemble vuex.
// there will be oppertunities to use lenses there too.

// NOTE: partial lenses means PARTIAL lenses, which means that when you call
// "get" on a lense it will give you something, and when you call "set" it will
// give you something else

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// MIKE: use lenses to fetch the data and project / transform it.

// NOTE: one getter and one setter is essentially a transform:

// EXAMPLE LENS PIPELINE (filling out the state with external data):
//
//        [setter]                        [getter]
//           | <-lens----------------------->|
//     [url] | [url] | [raw data] | [object] | [object] (validation, etc., then commit)
//                   |            |
//            memoize(fetch)   project
//
// NOTES:
// - put a memoize function for the url into the lense

// NOTE: if i set a value and then immediatley get it, lenses are overkill
// unless I set it again

// MIKE: put actions and mutations in different files to emphasize their
// difference

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// NOTE: i can consume a big chunk of this dnd api. maybe you should do
// something funky when it comes to making calls.

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// MIKE: you could make an expression builder that took stuff to build the url
// out of

// IDEA: text-based chart maker where you overlay multiple documents on the same
// text editor - the lines don't move when u type, and they form boundaries
// around the different documents. call it "ASCII-Pad".

// NOTE: a lense is...
// 1. a function with 2 ways of calling it - as a get and optionally with some
//    extra sauce (a set + get)
// 2. its input is the "expectation" and its output is the copy of lenses
//    "focus" (a "focus" can be a property, object, etc.)
// 3. when the expectation doesn't match the output it fails and returns undefined

/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

// import * as R from 'ramda';
import {
  // lensPath,
  clone,
} from 'ramda';

import U from '../util';

Vue.use(Vuex);

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// UNDER CONSTRUCTION

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

const initialStats = {
  ac: {
    shortName: 'ac', longName: 'armor class', val: 5,
  },
  dex: {
    shortName: 'dex', longName: 'dexterity', val: 5,
  },
  str: {
    shortName: 'str', longName: 'strength', val: 5,
  },
  int: {
    shortName: 'int', longName: 'intelligence', val: 5,
  },
  char: {
    shortName: 'char', longName: 'charisma', val: 5,
  },
};

const store = {
  state: {
    bio: 'The coolest guy around.',
    name: 'philbough swaggins',
    // MIKE: 100 percent of your objects you want to be indexable should have key properties
    characterClass: { name: 'bard', icon: 'music_note' },
    stats: clone(initialStats),
    formStats: clone(initialStats),
  },

  actions: {
    tst({ commit }, newName) {
      commit('test', newName);
    },

    // MIKE: put the stat names in constants (see above example)
    incrFormStat({ commit }, key) {
      // get the index here and pass it through
      commit('increaseFormStat', key);
    },
  },

  mutations: {
    // MIKE: move this to action? consider that the passed key also documents
    // the code just fine without baking it into the funtion name.
    setStatVal(state, key, newVal) {
      state.stats[key].val = newVal;
    },

    // set,
  },

  getters: {
    statsArray({ stats }) {
      // return values(stats);
      return stats;
    },
  },
};

store.mutations.increaseFormStat(store.state, 'int'); // ?

export default new Vuex.Store(store);

// OLD:
// increaseFormStat(state, statShortName) {
//   const statValLens = compose(
//     statLens,
//     lensProp(statShortName),
//     valLens,
//   );

//   state = over(
//     statValLens,
//     inc,
//     state,
//   ); // ?
// },
