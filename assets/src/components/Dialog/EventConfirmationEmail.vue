<template>
    <v-dialog v-model="showSendConfirmMessage" :max-width="800">
        <v-card>
            <v-card-title> Schicke deinen Kunden eine Terminbestätigung als ...</v-card-title>
            <div class="d-flex justify-center" style="padding: 30px">
                <v-btn v-on:click="sendEmail" class="btn-wa">
                    <v-icon color="green darken-1" style="margin-right: 5px;">{{ iconWa }}</v-icon>
                    WhatsApp
                </v-btn>
                <v-btn v-on:click="sendEmail" class="btn-email">
                    <v-icon color="cyan lighten-4" style="margin-right: 5px;">{{ iconEmail }}</v-icon>
                    E-Mail
                </v-btn>
                <v-btn v-on:click="closeSendEmail" class="btn-later">
                    <v-icon color="red darken-2" style="margin-right: 5px;">{{ iconClose }}</v-icon>
                    Später
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    import {
        mdiClose,
        mdiEmail,
        mdiWhatsapp
    } from '@mdi/js'
    export default {
        name: "SendEmail",
        data: vm => ({
            showSendConfirmMessage: false,
            email: undefined,
            iconClose: mdiClose,
            iconEmail: mdiEmail,
            iconWa: mdiWhatsapp
        }),
        props: {
            actualEvent: {
                type: Object,
                required: false
            }
        },
        methods: {
            showSendConfirmMessageDialog () {
                this.showSendConfirmMessage = true;
            },
            sendEmail () {
                let name = this.actualEvent.title.split(",")[1];
                let dateStart = this.actualEvent.start.split(" ")[0];
                let time = this.actualEvent.start.split(" ")[1];
                let newDate = new Date(dateStart);
                let day = newDate.getDate();
                let month = newDate.getMonth() + 1;
                let year = newDate.getFullYear();
                this.email = {
                    email: this.actualEvent.email,
                    subject: 'Dein Termin bei Creative Coiffeur!',
                    body: '<p> Hey ' + name + ',</p>' +
                        '<p> am ' + '<strong>' + day + '.' + month + '.' + year + '</strong>' +' gegen ' + '<strong>' + time + '</strong>' + ' haben wir einen Termin.</p>' +
                        '<p> Ich freu mich darauf. Bitte sage rechtzeitig den Termin ab falls du ihn nicht wahrnehmen kannst.</p>' +
                        '<p> Bleib Gesund</p>' +
                        '<p> Dein Creative Coiffeur</p>' +
                        '<p> Sükrü Demir</p>' +
                        '<br>' +
                        '<br>' +
                        '<p>Creative Coiffeur</p>' +
                        '<p>Sükrü Demir</p>' +
                        '<p>Viktoriastraße 2</p>' +
                        '<p>48565 Steinfurt</p>' +
                        '<p>Tel: 02 55 1 / 98 80 19 6</p>'
                }
                this.$store.dispatch('sendEmail', this.email);
                // this.$refs.form.reset();
                this.showSendConfirmMessage = false;
                setTimeout(function() { window.location.reload(); }, 300);
            },
            closeSendEmail () {
                // this.$refs.form.reset();
                this.showSendConfirmMessage = false;
                setTimeout(function() { window.location.reload(); }, 300);
            }
        }
    }
</script>

<style scoped>
    .btn-wa {
        border: 2px solid #43A047;
        border-radius: 5px;
        margin-right: 20px;
    }
    .btn-email {
        border: 2px solid #26C6DA;
        border-radius: 5px;
    }
    .btn-later {
        border: 2px solid #D32F2F;
        border-radius: 5px;
        margin-left: 20px;
    }
</style>