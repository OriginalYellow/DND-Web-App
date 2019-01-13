import Vue from 'vue';
import * as R from 'ramda';
import * as filters from './index';

const registerFilter = (value, key) => Vue.filter(key, value);

const registerFilters = R.forEachObjIndexed(registerFilter);

export default registerFilters;
