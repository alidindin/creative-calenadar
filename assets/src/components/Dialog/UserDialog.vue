<template>
    <v-dialog v-model="showUserDialog" :max-width="1200" :max-height="1200">
        <v-card v-if="userData">
            <div class="user-div">
                <v-card-title style="height: 110px; padding-left: 30px; padding-right: 30px">
                    <v-icon></v-icon>
                    <span>{{ userData.username }}</span>
                    <v-spacer/>
                    <span>{{ userData.email }}</span>
                    <v-spacer/>
                    <v-btn
                            color="red"
                            href="http://127.0.0.1:8000/logout"
                            depressed
                            style="margin-right: 30px"
                    >
                        <v-icon>power_settings_new</v-icon>
                        <span>Log Out</span>
                    </v-btn>
                    <v-btn
                            v-on:click="closeUserDialog"
                            depressed
                    >
                        <v-icon>{{ cancel }}</v-icon>
                    </v-btn>
                </v-card-title>
            </div>
            <div style="padding-left: 30px; padding-right: 30px">
            <v-row style="margin-top: 20px">
                <v-col cols="3">
                    <div style="line-height: 0.4; padding-left: 5px;">
                    <v-icon></v-icon>
                    <strong>Termin</strong>
                    </div>
                </v-col>
                <v-col cols="3">
                    <div style="line-height: 0.4; padding-left: 5px;">
                    <v-icon></v-icon>
                    <strong>Name</strong>
                    </div>
                </v-col>
                <v-col cols="3">
                    <div style="line-height: 0.4; padding-left: 5px;">
                    <v-icon></v-icon>
                    <strong>Typ</strong>
                    </div>
                </v-col>
                <v-col cols="3">
                    <div style="line-height: 0.4; padding-left: 5px;">
                    <v-icon></v-icon>
                    <strong>Info</strong>
                    </div>
                </v-col>
            </v-row>
            <v-row v-for="item in userData.events" :key="item.id" style="border-bottom: 1px solid #b9bbbe;">
                <v-col cols="3" md="3">
                    <v-card-text>
                        <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px;">

                                {{ item.start }}
                        </div>
                    </v-card-text>
                </v-col>
                <v-col cols="3" md="3">
                    <v-card-text>
                        <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px">
                            {{ item.title }}
                        </div>
                    </v-card-text>
                </v-col>
                <v-col cols="3" md="3">
                    <v-card-text>
                        <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px">
                            <div v-if="item.gender === 'male'">
                                <p>Herrenhaarschnitt</p>
                            </div>
                            <div v-else>
                                <p>Damenhaarschnitt</p>
                            </div>
                        </div>
                    </v-card-text>
                </v-col>
                <v-col cols="3" md="3">
                    <v-card-text>
                        <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px">
                            <p>{{ item.content }}</p>
                        </div>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-card-title>
                <v-spacer/>

            </v-card-title>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js'
export default {
    name: "UserDialog",
    data() {
        return {
            cancel: mdiClose,
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
        },
        closeUserDialog () {
            this.showUserDialog = false
        }
    }
}
</script>

<style scoped>
    .user-div {
        border-bottom: 5px solid #575757;
    }
</style>