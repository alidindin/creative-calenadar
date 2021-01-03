<template>
    <v-dialog v-model="showTextDialog" :max-width="1200">
            <v-card>
                <div v-if="userData.gender === 'male'" class="male" style="padding-left: 30px; padding-right: 25px;">
                    <v-card-title style="height: 110px">
                        <span>{{ userData.lastName }}, {{ userData.firstName }}</span>
                        <v-spacer/>
                        <v-btn
                                v-on:click="closeWhatsAppDialog"
                                depressed
                        >
                            <v-icon>{{ closeIcon }}</v-icon>
                        </v-btn>
                    </v-card-title>
                </div>
                <div v-else class="female" style="padding-left: 30px; padding-right: 30px;">
                    <v-card-title style="height: 110px">
                        <span>{{ userData.lastName }}, {{ userData.firstName }}</span>
                        <v-spacer/>
                        <v-btn
                                v-on:click="closeWhatsAppDialog"
                                depressed
                        >
                            <v-icon>{{ closeIcon }}</v-icon>
                        </v-btn>
                    </v-card-title>
                </div>
                <v-row style="max-width: 100%; padding-left: 50px; padding-right: 25px; padding-top: 30px">
                    <v-col cols="12" md="12" style="background: #F8F9F9;">
                        <v-card-text>
                            <v-icon style="margin-top: -5px">{{ iconNote }}</v-icon>
                            <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Nachricht</p>
                            <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px">
                                <v-textarea
                                        v-model="message"
                                        counter
                                        maxlength="120"
                                        full-width
                                        style="font-size: 16px"
                                ></v-textarea>
                            </div>
                        </v-card-text>
                    </v-col>
                </v-row>
                <div style="padding-right: 20px">
                <v-card-title>
                    <v-spacer/>
                    <v-btn
                            v-on:click="sendWhatsAppMessage"
                            text
                    >
                        <span class="mr-2">Senden</span>
                        <v-icon
                                color="green darken-1"
                                right
                        >{{ waIcon }}</v-icon>
                    </v-btn>
                </v-card-title>
                </div>
            </v-card>
    </v-dialog>
</template>

<script>
    import { mapGetters } from 'vuex'
    import {
        mdiClose,
        mdiWhatsapp,
        mdiNoteOutline
    } from '@mdi/js'
    export default {
        name: "WhatsAppDialog",
        data: vm => ({
            showTextDialog: false,
            closeIcon: mdiClose,
            waIcon: mdiWhatsapp,
            iconNote: mdiNoteOutline,
            message: undefined
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
            showWhatsAppDialog (id) {
                this.showTextDialog = true
                this.$store.dispatch('getUser', id);
            },
            closeWhatsAppDialog () {
                this.showTextDialog = false
            },
            sendWhatsAppMessage () {
                let url = `https://wa.me/` + this.userData.phone + `/?text=` + this.message;
                window.open(url, '_blank');
                this.message = undefined;
                this.closeWhatsAppDialog();
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
</style>