import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  theme: {
    primary: colors.grey.darken3,
    primaryLight: colors.grey.lighten2,
    secondary: colors.blue.darken2,
    secondaryLight: colors.blue.lighten1,
    accent: colors.deepOrange.darken1,
    accentLight: colors.deepOrange,
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
  customProperties: true,
  iconfont: 'md',
});
