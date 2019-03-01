<template>
  <!-- :scroll-threshold="75"
    scroll-off-screen -->
  <v-toolbar
    dark
    color="primary"
    app
    :extended="$route.name === 'characterSheet'"
    :extension-height="extensionHeight"
  >
    <v-toolbar-title>
      <router-link
        class="title-nav accentLight--text"
        :to="titleNav.link"
        tag="span"
      >
        {{titleNav.title}}
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        flat
        v-for="item in horizontalNavItems"
        :key="item.title"
        :to="item.link"
      >
        <v-icon :left="$vuetify.breakpoint.smAndUp">
          {{item.icon}}
        </v-icon>
        <span class="hidden-xs-only">
          {{item.title}}
        </span>
      </v-btn>
      <v-btn
        flat
        v-if="!user"
        :to="signinButton.link"
      >
        <v-icon :left="$vuetify.breakpoint.smAndUp">
          account_circle
        </v-icon>
        <span class="hidden-xs-only">
          {{signinButton.title}}
        </span>
      </v-btn>
      <v-btn
        flat
        v-else
        @click="handleLogOut"
      >
        <v-icon :left="$vuetify.breakpoint.smAndUp">
          account_circle
        </v-icon>
        <span class="hidden-xs-only">
          {{signoutButton.title}}
        </span>
      </v-btn>
    </v-toolbar-items>
    <character-sheet-bar
      v-if="$route.name === 'characterSheet'"
      slot="extension"
      :name="characterSummary.name"
      :level="characterSummary.level"
      :race="characterSummary.race"
      :stats="stats"
      :hitPoints="hitPoints"
      :characterClassName="characterSummary.characterClass.name"
    />
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex';
import CharacterSheetBar from '@/components/CharacterSheetBar';
import { SIGNOUT_USER } from '@/store/action-types';

export default {
  name: 'AppToolbar',

  components: {
    CharacterSheetBar,
  },

  methods: {
    handleLogOut() {
      this.$store.dispatch(SIGNOUT_USER);
    },
  },

  computed: {
    ...mapState(['user', 'selectedPlayerCharacter']),

    extensionHeight() {
      return this.$vuetify.breakpoint.mdAndUp ? 40 : 140;
    },

    horizontalNavItems() {
      if (!this.selectedPlayerCharacter) {
        return [];
      }
      return [
        {
          icon: 'description',
          title: 'Character Sheet',
          // title: this.selectedPlayerCharacter.name,
          link: '/character-sheet',
        },
      ];
    },

    signinButton() {
      return {
        title: 'Sign In',
        link: '/sign-in',
      };
    },

    signoutButton() {
      return {
        title: 'Sign Out',
      };
    },

    titleNav: () => ({
      title: "Mike's Cool Tool",
      link: '/',
    }),

    characterSummary() {
      return {
      // name: 'philobough swaggins',
        name: this.selectedPlayerCharacter.name,
        bio: 'The second coolest guy around',
        level: 3,
        race: 'halfling',
        characterClass: {
          name: 'bard',
          icon: 'music_note',
        },
      };
    },

    stats: () => [
      {
        value: '+2',
        topCaption: 'proficiency',
        bottomCaption: 'bonus',
        color: 'transparent',
      },
      {
        value: '25 ft.',
        topCaption: 'walking',
        bottomCaption: 'speed',
        color: 'transparent',
      },
      {
        value: '+3',
        bottomCaption: 'initiative',
        color: 'transparent',
      },
      {
        value: '+2',
        topCaption: 'armor',
        bottomCaption: 'class',
        color: 'transparent',
      },
    ],

    hitPoints: () => ({
      value: '11/18',
      topCaption: 'hit',
      bottomCaption: 'points',
      color: 'health',
      dark: true,
    }),
  },
};
</script>

<style lang="stylus" scoped>
.title-nav {
  cursor: pointer;
}

.stats-container {
  padding: 0;
}
</style>
