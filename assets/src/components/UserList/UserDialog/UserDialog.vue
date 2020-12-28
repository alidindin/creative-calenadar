<template>
    <v-dialog v-model="showUserDialog" :max-width="1200">
        <!-- User Edit -->
        <div v-if="showUserEditDialog">
            <v-card>
                <v-card-title>
                    <h1>Kunde bearbeiten</h1>
                    <v-icon></v-icon>
                    <span></span>
                    <v-spacer/>
                    <v-btn
                            v-on:click="closeUserDialogHandler"
                            depressed
                    >
                        <v-icon>{{ closeIcon }}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-form
                            ref="form"
                            v-model="userInputsValid"
                            :lazy-validation="lazy"
                    >
                        <v-row>
                            <v-col cols="6" md="6">
                                <v-text-field
                                        v-model="firstName"
                                        :rules="nameRules"
                                        filled
                                        color="deep-purple"
                                        label="Vorname"
                                        style="min-height: 96px"
                                        type="text"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" md="6">
                                <v-text-field
                                        v-model="lastName"
                                        :rules="nameRules"
                                        filled
                                        color="deep-purple"
                                        label="Nachname"
                                        style="min-height: 96px"
                                        type="text"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" md="6">
                                <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        filled
                                        color="deep-purple"
                                        label="E-Mail"
                                        style="min-height: 96px"
                                        type="text"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" md="6">
                                <v-text-field
                                        v-model="phone"
                                        :rules="phoneRules"
                                        filled
                                        color="deep-purple"
                                        label="Telefon"
                                        style="min-height: 96px"
                                        type="number"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-select
                                filled
                                color="deep-purple"
                                v-model="selectedClass"
                                :items="genderOptions"
                                :rules="itemRules"
                                label="Haartyp"
                                required
                        ></v-select>
                        <v-text-field
                                v-model="contentFull"
                                :rules="textRules"
                                filled
                                color="deep-purple"
                                label="Info"
                                style="min-height: 96px"
                                type="text"
                        ></v-text-field>
                        <v-card-title>
                            <v-spacer/>
                            <v-btn
                                    v-on:click="cancelEditUser"
                                    text
                            >
                                <span class="mr-2">Zurück</span>
                                <v-icon>{{ iconBack }}</v-icon>
                            </v-btn>
                            <v-btn
                                    v-on:click="editEventConfirm"
                                    text
                            >
                                <span class="mr-2">Speichern</span>
                                <v-icon>{{ iconCheck }}</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
        <div v-else>
            <v-card>
                <div v-if="userData.gender === 'male'" class="male" style="padding-left: 30px; padding-right: 25px;">
                    <v-card-title>
                        <h1>{{ userData.lastName }}, {{ userData.firstName }}</h1>
                        <v-icon></v-icon>
                        <span></span>
                        <v-spacer/>
                        <v-btn
                                v-on:click="closeUserDialogHandler"
                                depressed
                        >
                            <v-icon>{{ closeIcon }}</v-icon>
                        </v-btn>
                    </v-card-title>
                </div>
                <div v-else class="female" style="padding-left: 30px; padding-right: 25px;">
                    <v-card-title>
                        <h1>{{ userData.lastName }}, {{ userData.firstName }}</h1>
                        <v-icon></v-icon>
                        <span></span>
                        <v-spacer/>
                        <v-btn
                                v-on:click="closeUserDialogHandler"
                                depressed
                        >
                            <v-icon>{{ closeIcon }}</v-icon>
                        </v-btn>
                    </v-card-title>
                </div>
                <v-card-text>
                    <v-form
                            ref="form"
                            v-model="userInputsValid"
                            :lazy-validation="lazy"
                    >
                        <v-row>
                            <v-col cols="6" md="6">
                                {{ userData.email }}
                            </v-col>
                            <v-col cols="6" md="6">
                                {{ userData.phone }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                {{ userData.gender }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                {{ userData.info }}
                            </v-col>
                        </v-row>
                        <v-card-title style="padding-right: 25px;">
                            <v-spacer/>
                            <v-btn
                                    v-on:click="editUser"
                                    text
                            >
                                <span class="mr-2">Bearbeiten</span>
                                <v-icon>{{ iconCreate }}</v-icon>
                            </v-btn>
                            <v-btn
                                    @click="showDeleteUserDialog"
                                    text
                            >
                                <span class="mr-2">Löschen</span>
                                <v-icon>{{ iconDelete }}</v-icon>
                            </v-btn>
                        </v-card-title>
                        <!--                            <v-btn-->
                        <!--                                    :disabled="!userInputsValid"-->
                        <!--                                    @click="postUser"-->
                        <!--                                    text-->
                        <!--                            >-->
                        <!--                                <span class="mr-2">Hinzufügen</span>-->
                        <!--                                <v-icon>mdi-calendar-plus</v-icon>-->
                        <!--                            </v-btn>-->
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import {
    mdiClose,
    mdiDeleteForever,
    mdiCalendarEdit,
    mdiCheckBold,
    mdiArrowLeftBox
} from '@mdi/js'
export default {
    name: "UserDialog",
    data: vm => ({
        user: undefined,
        closeIcon: mdiClose,
        iconDelete: mdiDeleteForever,
        iconCreate: mdiCalendarEdit,
        iconCheck: mdiCheckBold,
        iconBack: mdiArrowLeftBox,
        showUserDialog: false,
        showUserEditDialog: false
    }),
    computed: {
        ...mapGetters({
            getUser: 'user'
        }),
        userData () {
            if (!this.getUser.data) return [];
            return this.getUser.data[0];
        }
    },
    methods: {
        showUserDialogHandler (id) {
            this.showUserDialog = true
            this.$store.dispatch('getUser', id);
            console.log('id',this.userId)
        },
        closeUserDialogHandler () {
            this.showUserEditDialog = false
            this.showUserDialog = false
        },
        editUser () {
            this.showUserEditDialog = true;
        },
        cancelEditUser () {
            this.showUserEditDialog = false;
        },
        showDeleteUserDialog () {
            console.log('delete User')
        }
    }
}
</script>

<style scoped>
    .male {
        border-bottom: 5px solid #42A5F5;
    }
    .female {
        border-bottom: 5px solid #EC407A;
    }
    .edit-div {
        border-bottom: 5px solid #575757;
    }
</style>