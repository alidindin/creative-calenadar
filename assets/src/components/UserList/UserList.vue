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
                    <v-list-item v-on:click="showUserDialog(item.id)">
                        <div v-if="item.gender === 'male'">
                        <v-list-item-avatar>
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
                            <v-list-item-avatar>
                                <v-avatar
                                        color="pink lighten-1"
                                        size="56"
                                        class="white--text"
                                >
                                    {{ item.initals }}
                                </v-avatar>
                            </v-list-item-avatar>
                        </div>
                        <v-list-item-content width="200">
                            <v-list-item-title class="text-left">{{ item.lastName }}, {{ item.firstName }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content width="200">
                            <v-list-item-title class="text-left">{{ item.phone }}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn
                                    depressed
                                    small
                            >
                                View User

                                <v-icon
                                        color="orange darken-4"
                                        right
                                >
                                    {{ openIcon }}
                                </v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </template>
            </v-virtual-scroll>
        </v-row>
    </v-container>
        <user-dialog ref="callUserDialog" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mdiOpenInNew } from '@mdi/js'
import UserDialog from './UserDialog/UserDialog'

export default {
name: "UserList",
    components: {UserDialog},
    data: vm => ({
        openIcon: mdiOpenInNew,
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
}
}
</script>

<style scoped>
</style>
