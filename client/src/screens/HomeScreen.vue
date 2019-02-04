<template>
  <v-container fluid>
    <v-flex>
      <span>{{statusText}}</span>
    </v-flex>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomeScreen',

  computed: {
    ...mapState(['user']),

    statusText() {
      if (!this.user) {
        return 'Not signed in';
      }
      return `Signed in as ${this.user.username}`;
    },
  },
};
</script>
