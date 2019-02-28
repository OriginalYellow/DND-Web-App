<template>
  <character-info-card title="my characters">
    <!-- justify-space-between -->
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        md4
        v-for="playerCharacter in playerCharacters"
        :key="playerCharacter.id"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-title primary-title>
            <span class="subheading">
              {{playerCharacter.name | titleCase}}
            </span>
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="accentLight"
              light
              small
              @click="$emit('selectPlayerCharacter', playerCharacter.id)"
            >view</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </character-info-card>
</template>

<script>
import CharacterInfoCard from '@/components/CharacterInfoCard';

export default {
  components: {
    CharacterInfoCard,
  },

  props: ['playerCharacters'],
};
</script>
