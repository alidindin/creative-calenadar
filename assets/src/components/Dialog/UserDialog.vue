<template>
    <v-dialog v-model="showUserDialog" :max-width="1200" :max-height="1200">
        <v-card v-if="userData">
            <div style="background: lightblue">
                <v-card-title style="height: 110px">
                    <v-icon></v-icon>
                    <span>{{ userData.username }}</span>
                    <v-spacer/>
                    <span>{{ userData.email }}</span>
                    <v-spacer/>
                    <v-btn color="red" href="http://127.0.0.1:8000/logout">
                        <v-icon>power_settings_new</v-icon>
                        <span>Log Out</span>
                    </v-btn>
                </v-card-title>
            </div>
            <v-row style="max-width: 100%; padding-top: 40px; padding-right: 25px">
                <v-col cols="3" md="3" style="background: lightblue;">
                    <v-card-text style="height: 200px">
                        <v-icon></v-icon>
                        <strong>Termin</strong>
                        <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px">
                            <v-list-item
                                    v-for="item in userData.events"
                                    :key="item.id"
                            >
                                {{ item.start }}
                            </v-list-item>
                        </div>
                    </v-card-text>
                </v-col>
                <v-col cols="3" md="3" style="background: lightblue;">
                    <v-card-text>
                        <v-icon></v-icon>
                        <strong>Dauer</strong>
                        <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px">
                            <p></p>
                        </div>
                    </v-card-text>
                </v-col>
                <v-col cols="3" md="3" style="background: lightblue;">
                    <v-card-text>
                        <v-icon></v-icon>
                        <strong>Dauer</strong>
                        <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px">
                            <p></p>
                        </div>
                    </v-card-text>
                </v-col>
                <v-col cols="3" md="3" style="background: lightblue;">
                    <v-card-text>
                        <v-icon></v-icon>
                        <strong>Dauer</strong>
                        <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px">
                            <p></p>
                        </div>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-card-title>
                <v-spacer/>

            </v-card-title>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "UserDialog",
    data() {
        return {
            showUserDialog: false
        }
    },
    props: {
        userData: {
            type: Object,
            required: true
        }
    },
    methods: {
        openUserDialog () {
            this.showUserDialog = true
        }
    }
}
</script>

<style scoped>

</style>