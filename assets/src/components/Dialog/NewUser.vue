<template>
    <v-form
            ref="form"
            v-model="userInputsValid"
            :lazy-validation="lazy"
    >
    <v-dialog v-model="showUserInputDialog" :max-width="800">
        <v-card>
            <div class="new-user-div">
                <v-card-title style="height: 110px; padding-left: 30px; padding-right: 30px">
                    <div v-if="firstName">
                        <h1>Neuer Kunde  {{ firstName }} {{ lastName }}</h1>
                    </div>
                    <div v-else>
                        <h1>Neuer Kunde</h1>
                    </div>
                        <v-icon></v-icon>
                            <span></span>
                                <v-spacer/>
                                <v-btn
                                        v-on:click="closeNewUserDialog"
                                        depressed
                                >
                                    <v-icon>{{ cancel }}</v-icon>
                                </v-btn>
                </v-card-title>
            </div>
            <div style="padding-left: 30px; padding-right: 30px">
                <v-card-text>
                    <v-form
                            style="margin-top: 20px"
                            ref="form"
                            v-model="userInputsValid"
                            :lazy-validation="lazy"
                    >
                        <v-row>
                            <v-col cols="6" class="d-flex">
                                <v-icon style="margin-top: 10px">{{ nameIcon }}</v-icon>
                                <v-text-field
                                        v-model="firstName"
                                        :rules="nameRules"
                                        filled
                                        color="blue-grey lighten-1"
                                        label="Vorname"
                                        style="min-height: 96px; margin-left: 20px"
                                        type="text"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="d-flex">
                                <v-icon style="margin-top: 10px">{{ nameIcon }}</v-icon>
                                    <v-text-field
                                            v-model="lastName"
                                            :rules="nameRules"
                                            filled
                                            color="blue-grey lighten-1"
                                            label="Nachname"
                                            style="min-height: 96px; margin-left: 20px"
                                            type="text"
                                    ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="d-flex">
                                <v-icon style="margin-top: 10px">{{ emailIcon }}</v-icon>
                                    <v-text-field
                                            v-model="email"
                                            :rules="emailRules"
                                            filled
                                            color="blue-grey lighten-1"
                                            label="E-Mail"
                                            style="min-height: 96px; margin-left: 20px"
                                            type="text"
                                    ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="d-flex">
                                <v-icon style="margin-top: 10px">{{ phoneIcon }}</v-icon>
                                    <v-text-field
                                            v-model="phone"
                                            :rules="phoneRules"
                                            filled
                                            color="blue-grey lighten-1"
                                            label="Telefon"
                                            style="min-height: 96px; margin-left: 20px"
                                            type="number"
                                    ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="d-flex">
                                <v-icon style="margin-top: 10px">{{ iconGender }}</v-icon>
                                    <v-select
                                            filled
                                            color="blue-grey lighten-1"
                                            v-model="selectedClass"
                                            :items="genderOptions"
                                            :rules="itemRules"
                                            label="Haartyp"
                                            style="margin-left: 20px"
                                            required
                                    ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="d-flex">
                                <v-icon style="margin-top: 10px">{{ info }}</v-icon>
                                <v-text-field
                                        v-model="contentFull"
                                        :rules="textRules"
                                        filled
                                        color="blue-grey lighten-1"
                                        label="Info"
                                        style="min-height: 96px; margin-left: 20px"
                                        type="text"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-card-title>
                            <v-spacer/>
                            <v-btn
                                    :disabled="!userInputsValid"
                                    @click="postUser"
                                    text
                            >
                                <span class="mr-2">Hinzufügen</span>
                                <v-icon>{{ user }}</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-form>
                </v-card-text>
            </div>
        </v-card>
    </v-dialog>
    </v-form>
</template>

<script>
import {
    mdiClose,
    mdiAccountBadge,
    mdiAccountPlus,
    mdiInformationOutline,
    mdiEmail,
    mdiPhone,
    mdiGenderMaleFemale
} from '@mdi/js'

export default {
    name: "NewUser",
    data: vm => ({
        nameIcon: mdiAccountBadge,
        cancel: mdiClose,
        info: mdiInformationOutline,
        user: mdiAccountPlus,
        emailIcon: mdiEmail,
        phoneIcon: mdiPhone,
        iconGender: mdiGenderMaleFemale,
        showUserInputDialog: false,
        userInputsValid: true,
        contentFull: undefined,
        gender: undefined,
        selectedClass: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        phone: undefined,
        lazy: false,
        genderOptions : [
            'Damenhaarschnitt',
            'Herrenhaarschnitt'
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
        }
    }),
    methods: {
        addUser () {
            this.showUserInputDialog = true

            // Prevent navigating to narrower view (default vue-cal behavior).
            // e.stopPropagation()
        },
        postUser () {
            if(this.selectedClass === 'Herrenhaarschnitt') {
                this.selectedClass = 'male';
            } else {
                this.selectedClass = 'female';
            }
            let user = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phone: this.phone,
                gender: this.selectedClass,
                info: this.contentFull
            };
            console.log(user);
            this.$store.dispatch('postUsers', user);
            this.$refs.form.reset();
            this.showUserInputDialog = false;
            this.$router.go(0);
        },
        closeNewUserDialog () {
            this.showUserInputDialog = false;
        }
    }
}
</script>

<style scoped>
    .new-user-div {
        border-bottom: 5px solid #575757;
    }
</style>