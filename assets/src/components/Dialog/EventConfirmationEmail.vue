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
                console.log('send', this.actualEvent);
                this.$store.dispatch('sendEmail', this.actualEvent);
                // this.$refs.form.reset();
                this.showSendEmailDialog = false;
                setTimeout(function() { window.location.reload(); }, 300);
            },
            closeSendEmail () {
                console.log('close', this.actualEvent);
                // this.$refs.form.reset();
                this.showSendEmailDialog = false;
                setTimeout(function() { window.location.reload(); }, 300);
            }
        }
    }
</script>

<style scoped>

</style>