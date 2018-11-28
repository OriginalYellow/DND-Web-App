<template>
<v-card color="grey lighten-2">
    <v-card-text>
        <h3>Main Stats</h3>
        <v-divider></v-divider>
        <p>
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
                            <v-flex xs3>
                                <v-text-field
                                    label="DEX"
                                    :placeholder="`${stats.dex}`"
                                    outline
                                    v-model="formStats.dex"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field
                                    label="STR"
                                    :placeholder="`${stats.str}`"
                                    outline
                                    v-model="formStats.str"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field
                                    label="INT"
                                    :placeholder="`${stats.int}`"
                                    outline
                                    v-model="formStats.int"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field
                                    label="CHAR"
                                    :placeholder="`${stats.char}`"
                                    outline
                                    v-model="formStats.char"
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

//MIKE: define this in the parent or somewhere else as a last resort
interface MainStats {
    ac: number;
    dex: number;
    str: number;
    int: number;
    char: number;
}

@Component
export default class CharacterSummary extends Vue {
    @Prop({required: true})
    mainStats!: MainStats;

    formStats!: MainStats;

//     get UpperCaseStat() {
//     return Math.random()
//   }
}
</script>