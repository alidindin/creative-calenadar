<template>
    <v-dialog v-model="showSendEmailDialog" :max-width="800">
        <v-card>
            <v-card-title> Schicke deinen Kunden eine Terminbestätigung ...</v-card-title>
            <div class="d-flex justify-center" style="padding: 30px">
                <button @click="sendEmail" type="button" style="margin-right: 20px" class="btn-ok">Ok</button>
                <button @click="closeSendEmail" type="button" style="margin-left: 20px" class="btn-later">Später</button>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "SendEmail",
        data: vm => ({
            showSendEmailDialog: false,
            email: undefined
        }),
        props: {
            actualEvent: {
                type: Object,
                required: false
            }
        },
        methods: {
            showSendMailDialog () {
                this.showSendEmailDialog = true;
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
                this.showSendEmailDialog = false;
                setTimeout(function() { window.location.reload(); }, 300);
            },
            closeSendEmail () {
                // this.$refs.form.reset();
                this.showSendEmailDialog = false;
                setTimeout(function() { window.location.reload(); }, 300);
            }
        }
    }
</script>

<style scoped>

</style>