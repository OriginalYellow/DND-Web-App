import 'vuetify/dist/vuetify.min.css';
// import 'material-design-icons-iconfont/dist/material-design-icons.css'; //MIKE: need a font file type loader or something for this to work, for now im using a cdn
import Vue from 'vue';
import Vuetify from 'vuetify';
import app from './components/App.vue'; 

Vue.use(Vuetify);

new Vue({
  el: '#app',
  render: h => h(app)
});