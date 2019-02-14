<template>
  <v-app>
    <app-toolbar />

    <navigation-modal />

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
        @click="isToggled=!isToggled"
      >
        <v-icon large>arrow_back</v-icon>
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
    
    <reference-container  
      :isToggled="isToggled"
    />
  </v-app>
</template>

<script>
import { VApp, VContent } from "vuetify/lib";
import { mapState } from "vuex";
import DebugPanel from "@/components/DebugPanel.vue";
import AppToolbar from "@/components/AppToolbar.vue";
import ReferenceContainer from "@/components/ReferenceContainer.vue";
import TextEditMenu from "@/components/TextEditMenu";
import * as T from "@/store/mutation-types";
import NavigationModal from "@/components/NavigationModal.vue"

export default {
  data() {
    return {
      dialog: false,
      isToggled: false
    };
  },

  name: "app",

  components: {
    AppToolbar,
    VApp,
    VContent,
    DebugPanel,
    ReferenceContainer,
    NavigationModal,
    TextEditMenu
  },

  // data() {
  //   return {
  //     isFormatToggled: false,
  //   };
  // },

  computed: {
    ...mapState(["drawerIsOpen"])
  }
};
</script>

<style lang="stylus" scoped>
.nav-fab {
  bottom: 16px;
}
</style>
