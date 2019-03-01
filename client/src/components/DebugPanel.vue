<template>
  <v-container>
    <!-- <v-flex xs12>
      <v-container>
        <v-layout
          row
          wrap
        >
          <v-flex xs3>
            <v-text-field
              label="Username"
              v-model="username"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field
              label="Password"
              v-model="password"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-btn
              color="secondary"
              @click="createUserInDB"
              flat
            >
              create user in database
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex> -->
    <v-flex xs12>
      <v-layout
        row
        wrap
      >
        <!-- <v-chip
          label
          disabled
          text-color="white"
          color="secondary"
        >
          Query Result:
        </v-chip>
        <v-chip
          label
          disabled
          text-color="white"
          color="primary"
        >
          {{ user.email }}
        </v-chip> -->
        <v-btn
          color="secondary"
          @click="openDrawer"
          flat
        >
          open drawer
        </v-btn>
        <v-btn
          color="secondary"
          @click="logBreakpoint"
          flat
        >
          Log Breakpoint
        </v-btn>
        <v-btn
          color="secondary"
          @click="logState"
          flat
        >
          Log State
        </v-btn>
        <v-btn
          color="secondary"
          @click="logCurrentRoute"
          flat
        >
          log current route
        </v-btn>
        <v-btn
          color="secondary"
          @click="testRouter"
          flat
        >
          test router
        </v-btn>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
import * as RA from 'ramda-adjunct';
import gql from 'graphql-tag';
import * as T from '@/store/mutation-types';

import * as U from '@/util';
import * as R from 'ramda';

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      user: {
        email: '',
      },
    };
  },

  methods: {
    testRouter() {
      this.$router.push('/');
    },

    async createUserInDB() {
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($username: String!, $email: String!, $password: String!) {
            signupUser(
              username: $username
              email: $email
              password: $password
            ) {
              username
            }
          }
        `,
        variables: {
          username: this.username,
          email: this.email,
          password: this.password,
        },
      });

      console.log(`result: ${result}`);
    },

    logBreakpoint() {
      console.log(this.$vuetify.breakpoint.name);
      // console.log(`xsOnly: ${this.$vuetify.breakpoint.xsOnly}`);
      console.log(`smAndDown: ${this.$vuetify.breakpoint.smAndDown}`);
    },

    logState() {
      console.log(this.$store.state);
    },

    openDrawer() {
      this.$store.commit(T.OPEN_DRAWER);
    },

    logCurrentRoute() {
      console.log(this.$route);
    },
  },
};
</script>
