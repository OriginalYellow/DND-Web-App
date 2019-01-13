<template>
  <v-app>
    <app-toolbar />
    <v-btn-toggle
      flat
      multiple
      class="v-btn-toggle--only-child"
      :style="{'z-index': 1000}"
    >
      <v-btn
        @click="isFormatToggled = !isFormatToggled"
        :flat="!isFormatToggled"
        color="accentLight"
        :ripple="false"
      >
        <v-icon>text_format</v-icon>
      </v-btn>
      <template v-if="isFormatToggled">
        <v-btn
          flat
          active-class="asdfasdf"
        >
          <v-icon>format_bold</v-icon>
        </v-btn>
        <v-btn
          flat
          active-class="asdfasdf"
        >
          <v-icon>format_italic</v-icon>
        </v-btn>
        <v-btn
          flat
          active-class="asdfasdf"
        >
          <v-icon>format_underlined</v-icon>
        </v-btn>
        <v-btn
          flat
          active-class="asdfasdf"
        >
          <v-icon>format_size</v-icon>
          <sup>1</sup>
        </v-btn>
        <v-btn
          flat
          active-class="asdfasdf"
        >
          <v-icon>format_size</v-icon>
          <sup>2</sup>
        </v-btn>
        <v-btn
          flat
          active-class="asdfasdf"
        >
          <v-icon>undo</v-icon>
        </v-btn>
        <v-btn
          flat
          active-class="asdfasdf"
        >
          <v-icon>redo</v-icon>
        </v-btn>
      </template>
    </v-btn-toggle>
    <!-- <v-speed-dial
      v-model="fab"
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
    </v-speed-dial> -->
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

  data() {
    return {
      // drawerIsOpen: false,
      isFormatToggled: false,
    };
  },

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
