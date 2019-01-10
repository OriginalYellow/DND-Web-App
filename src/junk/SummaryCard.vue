/* eslint-disable no-underscore-dangle */
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
            {{ name | titleCase }}
          </h1>
        </v-card-title>
        <v-card-text>
          <p>
            {{ characterClass.name | sentenceCase}}
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

<script>
import {
  VCard,
  VImg,
  VCardTitle,
  VAvatar,
  VCardText,
  VIcon,
} from 'vuetify/lib';

import { Capitalize, CapitalizeWords } from '../filters/capitalization';
import { hasAll } from '../validators';

export default {
  filters: {
    Capitalize,
    CapitalizeWords,
  },

  components: {
    VCard,
    VImg,
    VAvatar,
    VCardText,
    VIcon,
    VCardTitle,
  },

  props: {
    characterClass: {
      required: true,
      validator: hasAll(['name', 'icon']),
    },
    bio: {
      required: true,
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
  },
};
</script>
