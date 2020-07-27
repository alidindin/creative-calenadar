<template>
    <v-form
            ref="form"
            v-model="userInputsValid"
            :lazy-validation="lazy"
    >
    <v-dialog v-model="showUserInputDialog" :max-width="1200">
        <v-card>
            <v-card-title>
                <h1>Neuer Kunde</h1>
                <v-icon></v-icon>
                <span></span>
                <v-spacer/>
                <strong></strong>
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
                    <v-btn
                            :disabled="!userInputsValid"
                            @click="postUser"
                            text
                    >
                        <span class="mr-2">Hinzufügen</span>
                        <v-icon>mdi-calendar-plus</v-icon>
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
    </v-form>
</template>

<script>
export default {
    name: "NewUser",
    data: vm => ({
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
        },
    }
}
</script>

<style scoped>

</style>