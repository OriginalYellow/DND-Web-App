import VueRouter from 'vue-router';
import Vue from 'vue';
// eslint-disable-next-line import/extensions
// import SheetModule from '@/modules/SheetModule';
import HomeScreen from '@/screens/HomeScreen';
import AbilitiesSavesSensesView from '@/screens/AbilitiesSavesSensesView';
import SignUpScreen from '@/screens/SignUpScreen';
import SignInScreen from '@/screens/SignInScreen';

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
      // component: SheetModule,
      component: AbilitiesSavesSensesView,
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: SignUpScreen,
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: SignInScreen,
    },
  ],
});
