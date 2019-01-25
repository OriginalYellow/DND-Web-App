<template>
  <v-app>
    <app-toolbar />
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
      :style="{'z-index': 1002}"
    >
      <v-btn
        dark
        fab
        outline
        fixed
        bottom
        right
        color="accent"
        slot="activator"
        :style="{right: '90px'}"
      >
        <v-icon>apps</v-icon>
      </v-btn>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat
            @click="dialog = false"
          >Disagree</v-btn>
          <v-btn
            color="green darken-1"
            flat
            @click="dialog = false"
          >Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-speed-dial
      fixed
      bottom
      right
      direction="top"
      :style="{'z-index': 1000}"
    >
      <v-btn
        dark
        fab
        outline
        color="accent"
        slot="activator"
      >
        <v-icon large>arrow_back</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-content>
      <router-view />
      <v-container>
        <v-layout row>
          <debug-panel></debug-panel>
        </v-layout>
      </v-container>
    </v-content>
    <reference-container />
  </v-app>
</template>

<script>
import { VApp, VContent } from 'vuetify/lib';
import { mapState } from 'vuex';
import DebugPanel from '@/components/DebugPanel.vue';
import AppToolbar from '@/components/AppToolbar.vue';
import ReferenceContainer from '@/components/ReferenceContainer.vue';
import TextEditMenu from '@/components/TextEditMenu';
import * as T from '@/store/mutation-types';

export default {
  data() {
    return {
      dialog: false,
    };
  },

  name: 'app',

  components: {
    AppToolbar,
    VApp,
    VContent,
    DebugPanel,
    ReferenceContainer,
    TextEditMenu,
  },

  // data() {
  //   return {
  //     isFormatToggled: false,
  //   };
  // },

  computed: {
    ...mapState(['drawerIsOpen']),
  },
};
</script>

<style lang="stylus" scoped>
.nav-fab {
  bottom: 16px;
}
</style>
