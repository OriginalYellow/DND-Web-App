<template>
<v-card color="grey lighten-2">
    <v-card-text>
        <h3>Main Stats</h3>
        <v-divider></v-divider>
        <p>
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            <!-- YOU WERE HERE -->
            DEX: {{ stats.dex }}
            <br>
            STR: {{ stats.str }}
            <br>
            INT: {{ stats.int }}
            <br>
            CHAR: {{ stats.char }}
        </p>
    </v-card-text>
    <v-card-actions>
        <!-- OLD -->
        <!-- <v-btn dark small color="indigo" @click="editStats()">EDIT</v-btn> -->
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <v-btn
                slot="activator"
                color="indigo"
                dark
                small
            >
                EDIT
            </v-btn>
            <v-card color="grey lighten-2">
                <v-card-title>
                    <h2>Edit Main Stats</h2>
                </v-card-title>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex v-for="(stat, index) in mainStats" :key="`stat-${index}`" xs3>
                                <v-text-field
                                    :label="stat.shortName"
                                    :placeholder="`${stat.val}`"
                                    outline
                                    v-model="formStats[index]"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="indigo"
                        dark
                        @click="submitForm()"
                    >
                        Save
                    </v-btn>
                    <v-btn
                        color="indigo"
                        flat
                        @click="dialog = false"
                    >
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card-actions>
</v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Stat } from '../Stat'

@Component
export default class CharacterSummary extends Vue {
    @Prop({required: true})
    mainStats!: Stat[];

    formStats = this.mainStats;

    submitForm(): void {
        //MIKE: emit something instead of doing this
        // this.mainStats = this.formStats;
    }
}
</script>