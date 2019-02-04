/* eslint-disable no-new */
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import store from './store/index';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router from './router';
import registerFilters from './util/filters/registerFilters';
import * as filters from './util/filters';
import { createClient, createProvider } from './vue-apollo';
import * as AT from '@/store/action-types';

registerFilters(filters);

Vue.config.productionTip = false;

// eslint-disable-next-line import/prefer-default-export
export const apolloClient = createClient();

new Vue({
  router,
  el: '#app',
  store,
  apolloProvider: createProvider(createClient),

  // NOTE: Aliasing createElement to h is a common convention you’ll see in the
  // Vue ecosystem and is actually required for JSX.
  render: h => h(App),
  // created() {
  //   this.$store.dispatch(AT.GET_CURRENT_USER);
  // },
});
