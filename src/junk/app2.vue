// src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"

<template>
  <div class="application theme--light">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <todo-item v-for="item in groceryList" v-bind:todo="item" v-bind:key="item.id">
        </todo-item>
        <!-- <v-card>
        <v-img
          src="https://posva.net/slides/vue-testing/images/vue-transform-webpack.png"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">How to asdfsadfMake a Sick Webpack Config</h3>
          </div>
        </v-card-title>

        <v-card-text>
          {{this.card_text}}
        </v-card-text>

        <v-card-actions>
          <v-btn flat color="green">Share</v-btn>
          <v-btn flat color="orange">nigga, please</v-btn>
        </v-card-actions>
      </v-card> -->
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const placeholder =
  "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.";

Vue.component("todo-item", {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ["todo"],
  template: "<p>fug uuuuuuuu</p>",
  // template: `
  //               <v-card>
  //             <v-img
  //               src="https://posva.net/slides/vue-testing/images/vue-transform-webpack.png"
  //               aspect-ratio="2.75"
  //             ></v-img>

  //             <v-card-title primary-title>
  //               <div>
  //                 <h3 class="headline mb-0">How to asdfsadfMake a Sick Webpack Config</h3>
  //               </div>
  //             </v-card-title>

  //             <v-card-text>
  //               {{todo.value}}
  //             </v-card-text>

  //             <v-card-actions>
  //               <v-btn flat color="green">Share</v-btn>
  //               <v-btn flat color="orange">nigga, please</v-btn>
  //             </v-card-actions>
  //           </v-card>
  //      `
  data() {
    return {
      groceryList: [{ id: 0, value: placeholder }]
    };
  }
});

// export default Vue.extend({
//   data () {
//     return {
//       groceryList: [{id: 0, value: placeholder}]
//     }
//   }
// });
</script>

// import Vue from "vue";

// export default Vue.extend({
//   data() 
//   {
//     return {
//       msg: 'Helldo world!'
//     }
//   }
// });
