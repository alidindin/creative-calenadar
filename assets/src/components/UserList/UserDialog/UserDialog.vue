<template>
    <v-dialog v-model="showUserDialog" :max-width="1200">
        <!-- User Edit -->
        <div v-if="showUserEditDialog">
            <v-card>
                <div class="edit-div" style="padding-left: 30px; padding-right: 30px">
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
                </div>
                <v-card-text>
                    <v-form
                            ref="form"
                            v-model="userInputsValid"
                            :lazy-validation="lazy"
                    >
                        <v-row style="max-width: 100%; padding-left: 50px; padding-right: 25px; padding-top: 30px">
                            <v-col cols="6" md="6" style="background: #F8F9F9;">
                                <v-card-text style="min-height: 150px">
                                    <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Vorname</p>
                                    <div style="margin-top: 20px; line-height: 0.8; padding-left: 5px; min-height: 70px;">
                                        <v-text-field
                                                v-model="editFirstName"
                                                :rules="nameRules"
                                                filled
                                                color="deep-purple"
                                                label="Vorname"
                                                style="min-height: 96px"
                                                type="text"
                                        ></v-text-field>
                                    </div>
                                </v-card-text>
                                <v-card-text style="min-height: 150px">
                                    <v-icon style="margin-top: -5px">{{ iconEmail }}</v-icon>
                                    <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Email</p>
                                    <div style="margin-top: 20px; line-height: 0.8; padding-left: 5px; min-height: 70px;">
                                        <v-text-field
                                                v-model="editEmail"
                                                :rules="emailRules"
                                                filled
                                                color="deep-purple"
                                                label="E-Mail"
                                                style="min-height: 96px"
                                                type="text"
                                        ></v-text-field>
                                    </div>
                                </v-card-text>
                                <v-card-text style="min-height: 150px">
                                    <v-icon  style="margin-top: -5px">{{ phoneIcon }}</v-icon>
                                    <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Telefon</p>
                                    <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px; min-height: 70px">
                                        <v-text-field
                                                v-model="editPhone"
                                                :rules="phoneRules"
                                                filled
                                                color="deep-purple"
                                                label="Telefon"
                                                style="min-height: 96px"
                                                type="number"
                                        ></v-text-field>
                                    </div>
                                </v-card-text>
                            </v-col>
                            <v-col cols="6" md="6" style="background: #F8F9F9;">
                                <v-card-text style="min-height: 150px">
                                    <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Nachname</p>
                                    <div style="margin-top: 20px; line-height: 0.8; padding-left: 5px; min-height: 70px;">
                                        <v-text-field
                                                v-model="editLastName"
                                                :rules="nameRules"
                                                filled
                                                color="deep-purple"
                                                label="Nachname"
                                                style="min-height: 96px"
                                                type="text"
                                        ></v-text-field>
                                    </div>
                                </v-card-text>
                                <v-card-text style="min-height: 150px">
                                    <v-icon style="margin-top: -5px">{{ iconGender }}</v-icon>
                                    <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Type</p>
                                    <div style="margin-top: 20px; line-height: 0.8; padding-left: 5px; min-height: 70px;">
                                        <v-select
                                                filled
                                                color="deep-purple"
                                                v-model="editSelectedClass"
                                                :items="selectedGenderOption"
                                                :item-text="'name'"
                                                :rules="itemRules"
                                                label="Haartyp"
                                                required
                                        ></v-select>
                                    </div>
                                </v-card-text>
                                <v-card-text style="min-height: 150px; margin-top: 10px;">
                                    <v-icon  style="margin-top: -5px">{{ iconInfo }}</v-icon>
                                    <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Info</p>
                                    <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px; min-height: 70px">
                                        <v-text-field
                                                v-model="editContentFull"
                                                :rules="textRules"
                                                filled
                                                color="deep-purple"
                                                label="Info"
                                                style="min-height: 96px"
                                                type="text"
                                        ></v-text-field>
                                    </div>
                                </v-card-text>
                            </v-col>

                        </v-row>
                        <v-card-title style="padding-right: 35px;">
                            <v-spacer/>
                            <v-btn
                                    v-on:click="cancelEditUser"
                                    text
                            >
                                <span class="mr-2">Zurück</span>
                                <v-icon>{{ iconBack }}</v-icon>
                            </v-btn>
                            <v-btn
                                    v-on:click="editUserConfirm"
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
                <div v-if="userData.gender === 'male'" class="male" style="padding-left: 30px; padding-right: 35px;">
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
                <div v-else class="female" style="padding-left: 30px; padding-right: 35px;">
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
                        <v-row style="max-width: 100%; padding-left: 50px; padding-right: 25px; padding-top: 30px">
                            <v-col cols="6" md="6" style="background: #F8F9F9;">
                                <v-card-text style="min-height: 150px">
                                    <v-icon style="margin-top: -5px">{{ iconEmail }}</v-icon>
                                        <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Email</p>
                                            <div style="margin-top: 20px; line-height: 0.8; padding-left: 5px; min-height: 70px;">
                                                {{ userData.email }}
                                            </div>
                                </v-card-text>
                                <v-card-text>
                                    <v-icon  style="margin-top: -5px">{{ phoneIcon }}</v-icon>
                                        <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Telefon</p>
                                            <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px; min-height: 70px">
                                                {{ userData.phone }}
                                            </div>
                                </v-card-text>
                            </v-col>
                            <v-col cols="6" md="6" style="background: #F8F9F9;">
                                <v-card-text style="min-height: 150px">
                                    <v-icon style="margin-top: -5px">{{ iconGender }}</v-icon>
                                        <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Typ</p>
                                            <div style="margin-top: 20px; line-height: 0.8; padding-left: 5px; min-height: 70px;">
                                                {{ getGender }}
                                            </div>
                                </v-card-text>
                                <v-card-text style="min-height: 150px">
                                    <v-icon style="margin-top: -5px">{{ iconInfo }}</v-icon>
                                        <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Info</p>
                                            <div style="margin-top: 20px; line-height: 0.8; padding-left: 5px; min-height: 70px;">
                                                {{ userData.info }}
                                            </div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-card-title style="padding-right: 35px;">
                            <v-spacer/>
                            <v-btn
                                    v-on:click="editUserHandler"
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
    mdiArrowLeftBox,
    mdiEmail,
    mdiPhone,
    mdiGenderMaleFemale,
    mdiInformationOutline
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
        iconEmail: mdiEmail,
        phoneIcon: mdiPhone,
        iconGender: mdiGenderMaleFemale,
        iconInfo: mdiInformationOutline,
        showUserDialog: false,
        showUserEditDialog: false,
        userInputsValid: true,
        genderOptions : [
            {
                value: 'female',
                name: 'Damenhaarschnitt'
            },
            {
                value: 'male',
                name: 'Herrenhaarschnitt'
            }
        ],
        nameRules: [
            v => !!v || 'Name is required'
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        phoneRules: [
            v => !!v || 'Telefon is required'
        ],
        textRules: [
            v => !!v || 'Text is required'
        ],
        itemRules: [
            v => !!v || 'Item is required'
        ],
        inputRules: [
            v => !!v || 'Item is required'
        ],
        rules: {
            email: v => (v || '').match(/@/) || 'Please enter a valid email',
            length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
            required: v => !!v || 'This field is required',
        },
        userId: undefined,
        editFirstName: undefined,
        editLastName: undefined,
        editEmail: undefined,
        editPhone: undefined,
        editSelectedClass: undefined,
        editContentFull: undefined,
        editUser: undefined,
        lazy: false
    }),
    computed: {
        ...mapGetters({
            getUser: 'user'
        }),
        userData () {
            if (!this.getUser.data) return [];
            return this.getUser.data[0];
        },
        selectedGenderOption: {
            get () {
                return this.genderOptions
            },
            set (value) {
                this.editSelectedClass = value;
            }
        },
        getGender () {
             if (this.userData.gender === 'female') {
                return 'Damenhaarschnitt'
            } else {
                return 'Herrenhaarschnitt'
            }
        }
    },
    methods: {
        showUserDialogHandler (id) {
            this.showUserDialog = true
            this.$store.dispatch('getUser', id);
        },
        closeUserDialogHandler () {
            this.showUserEditDialog = false
            this.showUserDialog = false
        },
        editUserHandler () {
            this.showUserEditDialog = true;
            this.userId = this.userData.id;
            this.editFirstName = this.userData.firstName;
            this.editLastName = this.userData.lastName;
            this.editEmail = this.userData.email;
            this.editPhone = this.userData.phone;
            this.editSelectedClass = this.userData.gender;
            this.editContentFull = this.userData.info;
        },
        editUserConfirm () {
            this.user = {
                id: this.userId,
                firstName: this.editFirstName,
                lastName: this.editLastName,
                email: this.editEmail,
                phone: this.editPhone,
                gender: this.editSelectedClass,
                contentFull: this.editContentFull
            }
            this.$store.dispatch('updateUser', this.user);
            this.showUserEditDialog = false;
            this.showUserDialog = false;
            setTimeout(function() { window.location.reload(); }, 300);
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