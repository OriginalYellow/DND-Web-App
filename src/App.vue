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
    <v-btn
      absolute
      fixed
      dark
      fab
      bottom
      right
      color="accent"
      class="nav-fab"
      @click="$router.go(-1)"
    >
      <v-icon
        large
      >arrow_back</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import { VApp, VContent } from 'vuetify/lib';
import DebugPanel from '@/components/DebugPanel.vue';
import AppToolbar from '@/components/AppToolbar.vue';

export default {
  name: 'app',

  components: {
    AppToolbar,
    VApp,
    VContent,
    DebugPanel,
  },
};
</script>

<style lang="stylus" scoped>
.nav-fab {
  bottom: 16px;
}
</style>
