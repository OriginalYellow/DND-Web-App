<template>
  <v-app>
    <app-toolbar />
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
import DebugPanel from '@/components/DebugPanel';
import AppToolbar from '@/components/AppToolbar';
import ReferenceContainer from '@/components/ReferenceContainer';

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
  },

};
</script>

<style lang="stylus" scoped>
.nav-fab {
  bottom: 16px;
}
</style>
