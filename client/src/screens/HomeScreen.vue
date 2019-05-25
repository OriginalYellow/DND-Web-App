<template>
  <v-container grid-list-xl>
    <!-- MIKE: after reducing bundle size, test to see if this loading thing is
    actually working: -->
    <span v-if="$apollo.loading">Loading...</span>
    <template v-else>
      <v-layout
        row
        wrap
      >
        <span>{{statusText}}</span>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <characters-container
            :playerCharacters="playerCharacters"
            @selectPlayerCharacter="selectPlayerCharacter"
          />
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as T from '@/store/action-types';
// DEBUG

import CharactersContainer from '@/components/CharactersContainer';

export default {
  name: 'HomeScreen',

  components: {
    CharactersContainer,
  },

  computed: {
    ...mapState(['user', 'playerCharacters']),

    statusText() {
      if (!this.user) {
        return 'Not signed in';
      }

      return `Signed in as ${this.user.username}`;
    },
  },

  methods: {
    ...mapActions({ selectPlayerCharacter: T.SELECT_PLAYER_CHARACTER }),
  },
};
</script>
