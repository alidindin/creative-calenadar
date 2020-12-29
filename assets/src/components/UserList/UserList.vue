<template>
    <div>
    <v-container>
        <v-row class="text-center">
            <h1 class="mb-10">Kundenstamm</h1>
        </v-row>
        <v-row class="text-center">
            <v-virtual-scroll
                    :items="usersData"
                    :item-height="50"
                    height="600"
            >
                <template v-slot:default="{ item }">
                    <v-list-item>
                        <div v-if="item.gender === 'male'">
                        <v-list-item-avatar v-on:click="showUserDialog(item.id)">
                            <v-avatar
                                    color="blue lighten-1"
                                    size="56"
                                    class="white--text"
                            >
                                {{ item.initals }}
                            </v-avatar>
                        </v-list-item-avatar>
                        </div>
                        <div v-else>
                            <v-list-item-avatar v-on:click="showUserDialog(item.id)">
                                <v-avatar
                                        color="pink lighten-1"
                                        size="56"
                                        class="white--text"
                                >
                                    {{ item.initals }}
                                </v-avatar>
                            </v-list-item-avatar>
                        </div>
                        <v-list-item-content v-on:click="showUserDialog(item.id)">
                            <v-list-item-title class="text-left">{{ item.lastName }}, {{ item.firstName }}</v-list-item-title>
                        </v-list-item-content>
                        <v-icon
                                color="black"
                                left
                        >
                            {{ phoneIcon }}
                        </v-icon>
                        <v-list-item-content v-on:click="showUserDialog(item.id)">
                            <v-list-item-title class="text-left">{{ item.phone }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn
                                    depressed
                                    small
                            >
                                E-Mail
                                <v-icon
                                        color="orange darken-3"
                                        right
                                >
                                    {{ iconEmail }}
                                </v-icon>
                            </v-btn>
                        </v-list-item-action>
                        <v-list-item-action>
                            <v-btn
                                    depressed
                                    small
                                    v-on:click="showWhatsAppDialog(item.id)"
                            >
                                WhatsApp
                                <v-icon
                                        color="green darken-1"
                                        right
                                >
                                    {{ waIcon }}
                                </v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </template>
            </v-virtual-scroll>
        </v-row>
    </v-container>
        <user-dialog ref="callUserDialog" />
        <whats-app-dialog ref="callWhatsAppDialog" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mdiOpenInNew, mdiPhone, mdiWhatsapp, mdiEmail } from '@mdi/js'
import UserDialog from './UserDialog/UserDialog'
import WhatsAppDialog from './UserDialog/WhatsAppDialog'

export default {
name: "UserList",
    components: {WhatsAppDialog, UserDialog},
    data: vm => ({
        openIcon: mdiOpenInNew,
        phoneIcon: mdiPhone,
        waIcon: mdiWhatsapp,
        iconEmail: mdiEmail
    }),
    computed: {
    ...mapGetters({
        getUsers: 'users',
        getUser: 'user'
    }),
    usersData () {
    if (!this.getUsers.data) return [];
    return this.getUsers.data.map((item) => {
        return {
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            initals: item.firstName.charAt(0).toUpperCase() + item.lastName.charAt(0).toUpperCase(),
            email: item.email,
            phone: item.phone,
            info: item.info,
            gender: item.gender
        }
    })
    }
    },
    methods: {
    showUserDialog (id) {
        this.$refs.callUserDialog.showUserDialogHandler(id)
    },
    showWhatsAppDialog (id) {
        this.$refs.callWhatsAppDialog.showWhatsAppDialog(id)
    }
}
}
</script>

<style scoped>
</style>
