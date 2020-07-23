<template>
    <!-- Create Event Dialog -->
    <v-form
            ref="form"
            v-model="userInputsValid"
            :lazy-validation="lazy"
    >
        <v-dialog v-model="showEventInputDialog" :max-width="1200">
            <v-card>
                <v-card-title>
                    <h1>Neuer Termin</h1>
                    <v-icon></v-icon>
                    <span></span>
                    <v-spacer/>
                    <strong></strong>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6" md="6">
                            <v-menu
                                    ref="menu1"
                                    v-model="menuStart"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            v-model="dateStart"
                                            label="Date"
                                            hint="MM/DD/YYYY format"
                                            persistent-hint
                                            prepend-icon="mdi-calendar-export"
                                            @blur="dateStart = parseDate(dateFormattedStart)"
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="dateStart" no-title @input="menuStart = false"></v-date-picker>
                            </v-menu>

                            <p>Date in ISO format: <strong>{{ dateStart }}</strong></p>
                        </v-col>

                        <v-col cols="6" md="6">
                            <div v-if="selectedUser[3] === 'male'" style="max-width: 500px; height: 50px; margin-left: 30px; background-color: deepskyblue"></div>
                            <div v-if="selectedUser[3] === 'female'" style="max-width: 500px; height: 50px; margin-left: 30px; background-color: deeppink"></div>
                            <div v-else></div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6" md="6">
                            <v-menu
                                    ref="menuTimeStart"
                                    v-model="menuTimeStart"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="timeStart"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            v-model="timeStart"
                                            label="Wann beginnt der Termin ?"
                                            prepend-icon="mdi-clock-in"
                                            readonly
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                        v-if="menuTimeStart"
                                        v-model="timeStart"
                                        full-width
                                        format="24hr"
                                        @click:minute="$refs.menuTimeStart.save(timeStart)"
                                ></v-time-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="6" md="6">
                            <div class="d-flex">
                                <v-menu
                                        ref="menuTimeEnd"
                                        v-model="menuTimeEnd"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="timeEnd"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                style="width: 100%"
                                                v-model="timeEnd"
                                                label="Wann endet der Termin ?"
                                                prepend-icon="mdi-clock-out"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                            v-if="menuTimeEnd"
                                            v-model="timeEnd"
                                            full-width
                                            format="24hr"
                                            @click:minute="$refs.menuTimeEnd.save(timeEnd)"
                                    ></v-time-picker>
                                </v-menu>
                                <button @click="endTimeFilter(30)" type="button" style="margin-left: 20px" class="btn-timeEndFilter">30 Min</button>
                                <button @click="endTimeFilter(45)" type="button" style="margin-left: 20px" class="btn-timeEndFilter">45 Min</button>
                                <button @click="endTimeFilter(60)" type="button" style="margin-left: 20px" class="btn-timeEndFilter">60 Min</button>
                            </div>
                        </v-col>
                    </v-row>
                    {{ selectedUser }}
                    <div v-if="usersOptions">
                        <v-select
                                filled
                                color="deep-purple"
                                v-model="selectedUser"
                                :items="usersOptions"
                                :rules="itemRules"
                                label="Kunde"
                                required
                        ></v-select>
                    </div>
                    <v-text-field
                            v-model="selectedUser[3]"
                            :rules="inputRules"
                            filled
                            color="deep-purple"
                            label="Info"
                            style="min-height: 96px"
                            type="text"
                    ></v-text-field>
                    <v-text-field
                            v-model="notice"
                            :rules="[rules.length(6)]"
                            filled
                            color="deep-purple"
                            label="Notiz"
                            style="min-height: 96px"
                            type="text"
                    ></v-text-field>
                    <v-btn
                            @click="postEvent"
                            text
                    >
                        <span class="mr-2">Hinzufügen</span>
                        <v-icon>mdi-calendar-plus</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<script>
    import { mapGetters } from 'vuex'
    import 'vue-cal/dist/vuecal.css'
    import '../../css/cal.css'


    export default {
        components: {
        },
        name: 'NewEvent',
        data: vm => ({
            showEventInputDialog: true,
            dateStart: new Date().toISOString().substr(0, 10),
            dateFormattedStart: vm.formatDate(new Date().toISOString().substr(0, 10)),
            menuStart: false,
            timeStart: null,
            timeEnd: null,
            menuTimeStart: false,
            menuTimeEnd: false,
            start: undefined,
            end: undefined,
            title: undefined,
            content: undefined,
            contentFull: undefined,
            gender: undefined,
            selectedClass: undefined,
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            phone: undefined,
            itemRules: [
                v => !!v || 'Item is required'
            ],
            inputRules: [
                v => !!v || 'Item is required'
            ],
            rules: {
                email: v => (v || '').match(/@/) || 'Please enter a valid email',
                length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
                required: v => !!v || 'This field is required',
            },
            selectedEvent: {},
            userInputsValid: true,
            selectedUser: [],
            showEventDialog: false,
            notice: undefined,
            event: undefined,
            lazy: false
        }),
        computed: {
            ...mapGetters({
                getEvents: 'events',
                getUsers: 'users'
            }),
            // computedDateFormatted () {
            //   return this.formatDate(this.date)
            // },
            // usersInfo () {
            //   if (!this.getUsers.data) return [];
            //   return this.getUsers.data.map((item) => {
            //     return {
            //       id: item.id,
            //       firstName: item.firstName,
            //       lastName: item.lastName,
            //       email: item.email,
            //       phone: item.phone,
            //       gender: item.gender,
            //       info: item.contentFull
            //     }
            //   })
            // },
            usersOptions () {
                if (!this.getUsers.data) return [];
                return this.getUsers.data.map((item) => {
                    return {
                        value: [item.firstName, item.lastName, item.email, item.info, item.gender],
                        text: item.lastName + ',' + ' ' + item.firstName
                    }
                })
            }
        },
// watch: {
//   date () {
//     this.dateFormatted = this.formatDate(this.date)
//   }
// },
        props: {
            format: {
                type: [String, Number],
                default: '24h'
            }
        },
        methods: {
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            addEvent (e) {
                this.showEventInputDialog = true

                // Prevent navigating to narrower view (default vue-cal behavior).
                e.stopPropagation()
            },
            postEvent () {
                this.event = {
                    start: this.dateStart + ' ' + this.timeStart,
                    end:this.dateStart + ' ' + this.timeEnd,
                    title: this.selectedUser[1] + ', ' + this.selectedUser[0],
                    email: this.selectedUser[2],
                    content: this.selectedUser[3],
                    contentFull: this.notice,
                    gender: this.selectedUser[4]
                };
                console.log('test', this.event);
                this.$store.dispatch('postEvents', this.event);
                this.showEventInputDialog = false;
                this.showSendEmailDialog = true;
            },
            endTimeFilter(value) {
                const timeStartHours = this.timeStart.slice(0,2);
                const timeStartMinutes = this.timeStart.slice(-2);
                const newTimeEnd = new Date();
                newTimeEnd.setHours(timeStartHours);
                newTimeEnd.setMinutes(timeStartMinutes);
                const time = newTimeEnd.getTime() + value * 60000;
                const hours = `0${new Date(time).getHours()}`.slice(-2);
                const minutes = `0${new Date(time).getMinutes()}`.slice(-2);
                this.timeEnd = `${hours}:${minutes}`
            }
        },
        mounted() {
            this.$store.dispatch('getUsers');
        }
    }
</script>

<style scoped>
    .btn-timeEndFilter {
        height: 50px;
        width: 100px;
        border: 2px solid lightgrey;
        border-radius: 5px;
        text-decoration: none;
        outline: none;
    }
    .btn-timeEndFilter:hover {
        background-color: lightgrey;
        border: 2px solid lightskyblue;
    }
    .btn-timeEndFilter:active {
        background-color: lightgrey;
        border: 2px solid lightgreen;
    }
</style>