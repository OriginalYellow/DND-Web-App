<template>
  <v-container
    text-xs-center
    mt-5
    pt-5
  >

    <!-- Signup Title -->
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <h1 class="primary--text">Get Onto My Cool Tool</h1>
      </v-flex>
    </v-layout>

    <!-- Error Alert -->
    <v-layout
      v-if="error"
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <!-- Signup Form -->
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        offset-sm3
        xl4
        offset-xl4
      >
        <v-card color="primaryLight">
          <v-container>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleSigninUser"
            >

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="usernameRules"
                    v-model="username"
                    prepend-icon="face"
                    label="Username"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="passwordRules"
                    v-model="password"
                    prepend-icon="extension"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    :loading="loading"
                    :disabled="!isFormValid || loading"
                    color="accent"
                    type="submit"
                  >
                    Sign In</v-btn>
                  <h3>Don't have an account?
                    <router-link to="/sign-up">Sign Up</router-link>
                  </h3>
                </v-flex>
              </v-layout>

            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import * as T from '@/store/action-types';
import FormAlert from '@/components/FormAlert';

export default {
  components: {
    FormAlert,
  },

  data() {
    return {
      isFormValid: true,
      username: '',
      password: '',
      usernameRules: [
        username => !!username || 'Username is required',
        username => username.length < 10 || 'Username must be less than 10 characters',
      ],
      passwordRules: [
        password => !!password || 'Password is required',
        password => password.length >= 4 || 'Password must be at least 4 characters',
      ],
    };
  },

  computed: {
    ...mapState(['loading', 'user', 'error']),
  },

  methods: {
    handleSigninUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch(T.SIGNIN_USER, {
          username: this.username,
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>
