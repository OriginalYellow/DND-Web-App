<template>
  <v-app>
    <app-toolbar />
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
      <v-icon large>arrow_back</v-icon>
    </v-btn>
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
import * as T from '@/store/mutation-types';

export default {
  name: 'app',

  components: {
    AppToolbar,
    VApp,
    VContent,
    DebugPanel,
    ReferenceContainer,
  },

  // data() {
  //   return {
  //     drawerIsOpen: false,
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
