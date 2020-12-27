<template>
    <div>
    <v-container>
        <v-row class="text-center">
            <h1 class="mb-10">Kundenstamm</h1>
        </v-row>
        <v-row class="text-center">
            <v-virtual-scroll
                    :items="userData"
                    :item-height="50"
                    height="600"
            >
                <template v-slot:default="{ item }">
                    <v-list-item v-on:click="showUserDialogHandler(item.id)">
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
        <v-dialog v-model="showUserDialog" :max-width="1200">
            <!-- User Edit -->
            <div v-if="showUserEditDialog">
                <v-card>
                    <v-card-title>
                        <h1>Kunde bearbeiten</h1>
                        <v-icon></v-icon>
                        <span></span>
                        <v-spacer/>
                        <v-btn
                                v-on:click="closeUserDialogHandler"
                                depressed
                        >
                            <v-icon>{{ closeIcon }}</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-form
                                ref="form"
                                v-model="userInputsValid"
                                :lazy-validation="lazy"
                        >
                            <v-row>
                                <v-col cols="6" md="6">
                                    <v-text-field
                                            v-model="firstName"
                                            :rules="nameRules"
                                            filled
                                            color="deep-purple"
                                            label="Vorname"
                                            style="min-height: 96px"
                                            type="text"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" md="6">
                                    <v-text-field
                                            v-model="lastName"
                                            :rules="nameRules"
                                            filled
                                            color="deep-purple"
                                            label="Nachname"
                                            style="min-height: 96px"
                                            type="text"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6" md="6">
                                    <v-text-field
                                            v-model="email"
                                            :rules="emailRules"
                                            filled
                                            color="deep-purple"
                                            label="E-Mail"
                                            style="min-height: 96px"
                                            type="text"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" md="6">
                                    <v-text-field
                                            v-model="phone"
                                            :rules="phoneRules"
                                            filled
                                            color="deep-purple"
                                            label="Telefon"
                                            style="min-height: 96px"
                                            type="number"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-select
                                    filled
                                    color="deep-purple"
                                    v-model="selectedClass"
                                    :items="genderOptions"
                                    :rules="itemRules"
                                    label="Haartyp"
                                    required
                            ></v-select>
                            <v-text-field
                                    v-model="contentFull"
                                    :rules="textRules"
                                    filled
                                    color="deep-purple"
                                    label="Info"
                                    style="min-height: 96px"
                                    type="text"
                            ></v-text-field>
                            <v-btn
                                    :disabled="!userInputsValid"
                                    @click="postUser"
                                    text
                            >
                                <span class="mr-2">Hinzufügen</span>
                                <v-icon>mdi-calendar-plus</v-icon>
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </div>
            <div v-else>
                <v-card>
                    <v-card-title>
                        {{ getUser }}
                        <h1>{{ }}</h1>
                        <v-icon></v-icon>
                        <span></span>
                        <v-spacer/>
                        <v-btn
                                v-on:click="closeUserDialogHandler"
                                depressed
                        >
                            <v-icon>{{ closeIcon }}</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-form
                                ref="form"
                                v-model="userInputsValid"
                                :lazy-validation="lazy"
                        >
<!--                            <v-row>-->
<!--                                <v-col cols="6" md="6">-->
<!--                                    <v-text-field-->
<!--                                            v-model="firstName"-->
<!--                                            :rules="nameRules"-->
<!--                                            filled-->
<!--                                            color="deep-purple"-->
<!--                                            label="Vorname"-->
<!--                                            style="min-height: 96px"-->
<!--                                            type="text"-->
<!--                                    ></v-text-field>-->
<!--                                </v-col>-->
<!--                                <v-col cols="6" md="6">-->
<!--                                    <v-text-field-->
<!--                                            v-model="lastName"-->
<!--                                            :rules="nameRules"-->
<!--                                            filled-->
<!--                                            color="deep-purple"-->
<!--                                            label="Nachname"-->
<!--                                            style="min-height: 96px"-->
<!--                                            type="text"-->
<!--                                    ></v-text-field>-->
<!--                                </v-col>-->
<!--                            </v-row>-->
                            <v-row>
                                <v-col cols="6" md="6">
                                    <v-text-field
                                            v-model="email"
                                            :rules="emailRules"
                                            filled
                                            color="deep-purple"
                                            label="E-Mail"
                                            style="min-height: 96px"
                                            type="text"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" md="6">
                                    <v-text-field
                                            v-model="phone"
                                            :rules="phoneRules"
                                            filled
                                            color="deep-purple"
                                            label="Telefon"
                                            style="min-height: 96px"
                                            type="number"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-select
                                    filled
                                    color="deep-purple"
                                    v-model="selectedClass"
                                    :items="genderOptions"
                                    :rules="itemRules"
                                    label="Haartyp"
                                    required
                            ></v-select>
                            <v-text-field
                                    v-model="contentFull"
                                    :rules="textRules"
                                    filled
                                    color="deep-purple"
                                    label="Info"
                                    style="min-height: 96px"
                                    type="text"
                            ></v-text-field>
                            <v-card-title style="padding-right: 25px;">
                                <v-spacer/>
                                <v-btn
                                        v-on:click="editEvent"
                                        text
                                >
                                    <span class="mr-2">Bearbeiten</span>
                                    <v-icon>{{ iconCreate }}</v-icon>
                                </v-btn>
                                <v-btn
                                        @click="showDeleteUserDialog"
                                        text
                                >
                                    <span class="mr-2">Löschen</span>
                                    <v-icon>{{ iconDelete }}</v-icon>
                                </v-btn>
                            </v-card-title>
<!--                            <v-btn-->
<!--                                    :disabled="!userInputsValid"-->
<!--                                    @click="postUser"-->
<!--                                    text-->
<!--                            >-->
<!--                                <span class="mr-2">Hinzufügen</span>-->
<!--                                <v-icon>mdi-calendar-plus</v-icon>-->
<!--                            </v-btn>-->
                        </v-form>
                    </v-card-text>
                </v-card>
            </div>
        </v-dialog>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mdiOpenInNew, mdiClose, mdiDeleteForever, mdiCalendarEdit } from '@mdi/js'

  export default {
    name: "UserList",
      data: vm => ({
          openIcon: mdiOpenInNew,
          closeIcon: mdiClose,
          iconDelete: mdiDeleteForever,
          iconCreate: mdiCalendarEdit,
          showUserDialog: false,
          showUserEditDialog: false
      }),
      computed: {
      ...mapGetters({
        getUsers: 'users',
        getUser: 'user'
      }),
      userData () {
        if (!this.getUsers.data) return [];
           return this.getUsers.data.map((item) => {
                return {
                    id: item.id,
                    firstName: item.firstName,
                    lastName: item.firstName,
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
        showUserDialogHandler (id) {
            this.showUserDialog = true
            this.$store.dispatch('getUser', id);
            console.log('id',id)
        },
        closeUserDialogHandler () {
            this.showUserDialog = false
        },
        showDeleteUserDialog () {
            console.log('delete User')
        }
    }
  }
</script>

<style scoped>

</style>
