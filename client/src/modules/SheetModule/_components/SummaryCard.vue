/* eslint-disable no-underscore-dangle */
<template>
    <v-card
      dark
      color="transparent"
    >
      <v-img
        height="190"
        src="https://liamrainsford.files.wordpress.com/2013/06/oughaval-wood-s.jpg"
        gradient="to top right, rgba(10,15,48,.9), rgba(100,115,201,.5)"
      >
        <v-card-title>
          <h2>
            <v-avatar>
              <img
                src="http://www.paolini.net/wp-content/uploads/2017/09/Kvothe-Overlay100.jpg"
                alt="avatar"
              >
            </v-avatar>
            {{ name | titleCase }}
          </h2>
        </v-card-title>
        <v-card-text>
          <p>
            {{ characterClass.name | titleCase}}
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

import { hasAll } from '@/util/validators';

export default {
  props: {
    characterClass: {
      required: true,
      validator: hasAll(['name', 'icon']),
    },
    bio: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
  },
};
</script>
