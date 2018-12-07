<template>
  <v-card
    dark
    color="transparent"
  >
    <v-img
      height="190"
      src="https://liamrainsford.files.wordpress.com/2013/06/oughaval-wood-s.jpg"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
    >
      <v-card-title>
        <h1>
          <v-avatar>
            <img
              src="http://www.paolini.net/wp-content/uploads/2017/09/Kvothe-Overlay100.jpg"
              alt="avatar"
            >
          </v-avatar>
          {{ name | CapitalizeWords }}
        </h1>
      </v-card-title>
      <v-card-text>
        <p>
          {{ characterClass.name | Capitalize}}
          <v-icon small>
            {{ characterClass.icon }}
          </v-icon>
        </p>
        <p>
          {{ bio }}
        </p>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as R from "ramda";
import { Capitalize, CapitalizeWords } from "../playground-001";



//MIKE: define this in the parent or somewhere else as a last resort
interface CharacterClass {
  name: string;
  icon: string;
}

@Component({
  filters: {
    Capitalize,
    CapitalizeWords
  }
})
export default class CharacterSummary extends Vue {
  @Prop({ required: true })
  characterClass!: CharacterClass;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  bio!: string;
}
</script>
