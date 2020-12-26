<template>
    <v-dialog v-model="deleteEventDialog" :max-width="800">
        <v-card>
            <v-card-title>Termin löschen ?</v-card-title>
            <div class="d-flex justify-center" style="padding: 30px">
                <button v-on:click="deleteEvent(actualEventForDelete.id)" type="button" style="margin-right: 20px" class="btn-ok">Ja</button>
                <button @click="closeDeleteEventDialog" type="button" style="margin-left: 20px" class="btn-later">Nein</button>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "DeleteEvent",
        props: {
            actualEventForDelete: {
                type: Object,
                required: true
            }
        },
        data: vm => ({
            deleteEventDialog: false
        }),
        methods: {
            deleteEvent(id) {
                console.log('selected', this.actualEvent);
                this.$store.dispatch('deleteEvents', id);
                setTimeout(function () {
                    window.location.reload();
                }, 500);
            },
            showDeleteDialog () {
                this.deleteEventDialog = true;
            },
            closeDeleteEventDialog () {
                this.deleteEventDialog = false;
            }
        }
    }
</script>

<style scoped>

</style>