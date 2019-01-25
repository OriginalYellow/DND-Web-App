import VueRouter from 'vue-router';
import Vue from 'vue';
// eslint-disable-next-line import/extensions
import SheetModule from '@/modules/SheetModule';
import HomeScreen from '@/screens/HomeScreen'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeScreen,
    },
    {
      path: '/character-sheet',
      name: 'characterSheet',
      component: SheetModule,
    },
  ],
});
