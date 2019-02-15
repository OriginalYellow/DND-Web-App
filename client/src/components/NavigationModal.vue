<template>
  <!-- <v-dialog
    v-model="isDialog"
    persistent
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
    <v-card color="primary">  
      <v-container
        grid-list-md
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            :class="button.width"
            v-for="button in buttons"
            :key="button.name"
          >
            <v-card
              ripple
              dark
              color="accentLight"
            >
              <v-card-text><div class="text-xs-center">{{button.name | titleCase}}</div></v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog> -->

   <v-layout row justify-center>
    <v-btn
      dark
      fab
      outline
      fixed
      bottom
      right
      color="accent"
      :style="{right: '90px'}"
      @click="dialog = true"
    >
      <v-icon>apps</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  
</template>

<script>
export default {
  data() {
    return {
  
      dialog: false,
    
      buttons: [
        { name: "abilities, saves, and senses", width: "xs12" },
        { name: "skills", width: "xs6" },
        { name: "actions", width: "xs6" },
        { name: "equipment", width: "xs6" },
        { name: "spells", width: "xs6" },
        { name: "features and traits", width: "xs6" },
        { name: "creatures", width: "xs6" },
        { name: "description", width: "xs6" },
        { name: "notes", width: "xs6" },
        { name: "proficencies and languages", width: "xs12" }
      ]
    };
  },

  props: {
    isDialog: Boolean,
    required: true
  }
};
</script>
