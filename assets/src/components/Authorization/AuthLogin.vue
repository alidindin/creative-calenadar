<template>
    <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
    >
        <v-container>
            <v-row>
                <v-alert
                        v-if="showError"
                        border="bottom"
                        colored-border
                        type="error"
                        elevation="2"
                        max-width
                >
                    <v-row>{{ error }}
                    </v-row>
                    <v-btn
                        color="error"
                        class="mr-4"
                        @click="hideError"
                >
                    Ok
                </v-btn>
                </v-alert>
            </v-row>
            <v-row>
                <v-col
                        cols="12"
                        md="12"
                >
                    <v-text-field
                            style="min-width: 200px"
                            color="blue-grey darken-4"
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                    ></v-text-field>
                </v-col>

                <v-col
                        cols="12"
                        md="12"
                >
                    <v-text-field
                            style="min-width: 200px"
                            color="blue-grey darken-4"
                            v-model="password"
                            :rules="nameRules"
                            :counter="3"
                            label="Password"
                            required
                    ></v-text-field>
                </v-col>

                <v-col
                        cols="12"
                        md="4"
                >
                </v-col>
            </v-row>
            <v-row>
                <v-btn
                        :disabled="!valid"
                        color="blue-grey lighten-2"
                        class="mr-4"
                        @click="handleSubmit"
                        v-bind:class="{ disabled: isLoading }"
                >
                    Log In
                </v-btn>

                <v-btn
                        color="blue-grey lighten-2"
                        class="mr-4"
                        @click="reset"
                >
                    Reset Form
                </v-btn>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                valid: true,
                lazy: true,
                email: '',
                password: '',
                error: '',
                showError: false,
                isLoading: false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
            }
        },
        props: ['user'],
        methods: {
            handleSubmit() {
                this.isLoading = true;
                this.error = '';

                axios
                    .post('/login', {
                        email: this.email,
                        password: this.password
                    })
                    .then(response => {
                        this.$emit('user-authenticated', response.headers.location);
                        this.email = '';
                        this.password = '';
                    }).catch(error => {
                    if (error.response.data.error) {
                        this.showError = true;
                        this.error = error.response.data.error;
                    } else {
                        this.showError = true;
                        this.error = 'Unknown error';
                    }
                }).finally(() => {
                    this.isLoading = false;
                })
            },
            reset () {
                this.$refs.form.reset()
            },
            hideError () {
                this.showError = false;
            }
        },
    }
</script>

<style scoped lang="scss">
    .center-v-h {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>

