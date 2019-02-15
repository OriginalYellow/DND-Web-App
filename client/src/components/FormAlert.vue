<template>
  <v-alert
    type="error"
    :value="true"
    transition="scale-transition"
    dismissible
    outline
    v-model="isOpen"
  >
    <h3>{{message}}</h3>
  </v-alert>
</template>

<script>
// import { mapState } from 'vuex';
import * as T from '@/store/mutation-types';

export default {
  props: ['message'],

  data() {
    return {
      isOpen: true,
    };
  },

  watch: {
    isOpen(value) {
      if (!value) {
        this.$store.commit(T.CLEAR_ERROR);
      }
    },
  },
};
</script>
