import VueRouter from 'vue-router';
import Vue from 'vue';
// eslint-disable-next-line import/extensions
import SheetModule from '@/modules/SheetModule';
import HomeScreen from '@/screens/HomeScreen';
import SignUpScreen from '@/components/SignUpScreen';
import SignInScreen from '@/components/SignInScreen';

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
