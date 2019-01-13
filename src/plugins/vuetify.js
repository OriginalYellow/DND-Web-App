import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  theme: {
    primary: colors.grey.darken3,
    primaryLight: colors.grey.lighten2,
    secondary: colors.blueGrey.darken1,
    secondaryLight: colors.blueGrey.lighten3,
    accent: colors.indigo.lighten1,
    accentLight: colors.indigo.lighten2,
    health: colors.red.darken3,
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
  customProperties: true,
  iconfont: 'md',
});
