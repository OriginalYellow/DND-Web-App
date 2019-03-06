// eslint-disable-next-line import/extensions

import VueRouter from 'vue-router';
import Vue from 'vue';
import HomeScreen from '@/screens/HomeScreen';
import CharacterSheetScreen from '@/screens/CharacterSheetScreen';
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
      component: CharacterSheetScreen,
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
