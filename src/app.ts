import 'vuetify/dist/vuetify.min.css';
// import 'material-design-icons-iconfont/dist/material-design-icons.css'; //MIKE: need a font file type loader or something for this to work, for now im using a cdn
import Vue from 'vue';
import Vuetify from 'vuetify';
// import 'echarts/lib/chart/radar'

// import fuck from './components/app.vue'; 
// import fuck from './components/app2.vue'; 
// import fuck from './components/app3.vue'; 
import fuck from './components/app4.vue'; 

Vue.use(Vuetify);

new Vue({
  el: '#app',
  render: h => h(fuck)
});