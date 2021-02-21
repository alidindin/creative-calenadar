<template>
    <!-- Create Event Dialog -->
    <v-form
            ref="form"
            v-model="eventInputsValid"
            :lazy-validation="lazy"
    >
        <v-dialog v-model="showEventInputDialog" :max-width="1200">
            <v-card>
                <div class="new-meeting-div">
                    <v-card-title style="height: 110px; padding-left: 30px; padding-right: 30px">
                        <h1>Neuer Termin</h1>
                        <v-icon></v-icon>
                        <span></span>
                        <v-spacer/>
                        <v-btn
                                v-on:click="closeEventInputDialog"
                                depressed
                        >
                            <v-icon>{{ cancel }}</v-icon>
                        </v-btn>
                    </v-card-title>
                </div>
                <div style="padding-left: 30px; padding-right: 30px">
                    <v-card-text>
                        <v-row>
                            <v-col cols="3" md="3">
                                <div class="d-flex align-center" style="margin-top: 30px">
                                    <v-icon>{{ calendarExport }}</v-icon>
                                    <div style="margin-left: 20px">
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
                                                    color="blue-grey lighten-1"
                                                    v-model="dateStart"
                                                    label="Date"
                                                    hint="MM/DD/YYYY"
                                                    persistent-hint
                                                    @blur="dateStart = parseDate(dateFormattedStart)"
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                                color="blue-grey lighten-1"
                                                v-model="dateStart"
                                                no-title @input="menuStart = false"
                                        ></v-date-picker>
                                    </v-menu>
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="3" md="3">
<!--                                <div v-if="selectedUser[3] === 'male'" style="max-width: 500px; height: 50px; margin-left: 30px; background-color: deepskyblue"></div>-->
<!--                                <div v-if="selectedUser[3] === 'female'" style="max-width: 500px; height: 50px; margin-left: 30px; background-color: deeppink"></div>-->
<!--                                <div v-else></div>-->
                            </v-col>
                            <v-col cols="6" md="6">
<!--                                <div v-if="selectedUser[3] === 'male'" style="max-width: 500px; height: 50px; margin-left: 30px; background-color: deepskyblue"></div>-->
<!--                                <div v-if="selectedUser[3] === 'female'" style="max-width: 500px; height: 50px; margin-left: 30px; background-color: deeppink"></div>-->
<!--                                <div v-else></div>-->
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" md="3">
                                <div class="d-flex align-center">
                                    <v-icon>{{ clockStart }}</v-icon>
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
                                                    color="blue-grey lighten-1"
                                                    v-model="timeStart"
                                                    label="Beginn"
                                                    prepend-icon="mdi-clock-in"
                                                    readonly
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-time-picker
                                                color="blue-grey lighten-3"
                                                v-if="menuTimeStart"
                                                v-model="timeStart"
                                                full-width
                                                format="24hr"
                                                @click:minute="$refs.menuTimeStart.save(timeStart)"
                                        ></v-time-picker>
                                    </v-menu>
                                </div>
                            </v-col>
                            <v-col cols="3" md="3">
                                <div class="d-flex align-center">
                                    <v-icon>{{ clockEnd }}</v-icon>
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
                                                        color="blue-grey lighten-1"
                                                        style="width: 100%"
                                                        v-model="timeEnd"
                                                        label="Ende"
                                                        prepend-icon="mdi-clock-out"
                                                        readonly
                                                        v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                    color="blue-grey lighten-3"
                                                    v-if="menuTimeEnd"
                                                    v-model="timeEnd"
                                                    full-width
                                                    format="24hr"
                                                    @click:minute="$refs.menuTimeEnd.save(timeEnd)"
                                            ></v-time-picker>
                                        </v-menu>
                                </div>
                            </v-col>
                            <v-col cols="4" md="4">
                                <div class="d-flex">
                                    <button @click="endTimeFilter(30)" type="button" style="margin-left: 20px" class="btn-timeEndFilter">30 Min</button>
                                    <button @click="endTimeFilter(45)" type="button" style="margin-left: 20px" class="btn-timeEndFilter">45 Min</button>
                                    <button @click="endTimeFilter(60)" type="button" style="margin-left: 20px" class="btn-timeEndFilter">60 Min</button>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <div v-if="usersOptions" class="d-flex align-center">
                                    <v-icon style="margin-top: -25px">{{ newUSer }}</v-icon>
                                    <v-select
                                            filled
                                            color="blue-grey lighten-1"
                                            v-model="selectedUser"
                                            :items="usersOptions"
                                            :rules="itemRules"
                                            label="Kunde"
                                            required
                                            style="margin-left: 20px"
                                    ></v-select>
                                </div>
                            </v-col>
                        </v-row>
                        <div class="d-flex align-center">
                            <v-icon style="margin-top: -25px">{{ information }}</v-icon>
                                <v-text-field
                                        v-model="selectedUser[3]"
                                        :rules="inputRules"
                                        filled
                                        color="blue-grey lighten-1"
                                        label="Info"
                                        style="min-height: 96px; margin-left: 20px"
                                        type="text"
                                ></v-text-field>
                        </div>
                        <div class="d-flex align-center">
                            <v-icon style="margin-top: -25px">{{ note }}</v-icon>
                            <v-text-field
                                    v-model="notice"
                                    :rules="[rules.length(6)]"
                                    filled
                                    color="blue-grey lighten-1"
                                    label="Notiz"
                                    style="min-height: 96px; margin-left: 20px"
                                    type="text"
                            ></v-text-field>
                        </div>
                        <v-card-title>
                            <v-spacer/>
                            <v-btn
                                    :disabled="!eventInputsValid"
                                    @click="postEvent"
                                    text
                            >
                                <span class="mr-2">Hinzufügen</span>
                                <v-icon>{{ create }}</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
        <!-- Sende Email Dialog -->
        <event-confirmation-email ref="callShowSendConfirmMessage" :actual-event="event" />
    </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import 'vue-cal/dist/vuecal.css'
import '../../css/cal.css'
import {
    mdiClose,
    mdiCalendarExport,
    mdiInformationOutline,
    mdiNoteOutline,
    mdiAccountPlus,
    mdiClockStart,
    mdiClockEnd,
    mdiCalendarEdit
} from '@mdi/js'
import EventConfirmationEmail from './EventConfirmationEmail'

export default {
    name: 'NewEvent',
    components: {
        EventConfirmationEmail
    },
    data: vm => ({
        cancel: mdiClose,
        calendarExport: mdiCalendarExport,
        information: mdiInformationOutline,
        note: mdiNoteOutline,
        newUSer: mdiAccountPlus,
        clockStart: mdiClockStart,
        clockEnd: mdiClockEnd,
        create: mdiCalendarEdit,
        showEventInputDialog: false,
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
        eventInputsValid: true,
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
                    value: [item.firstName, item.lastName, item.email, item.info, item.gender, item.phone],
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
        addEvent () {
            this.showEventInputDialog = true
        },
        postEvent () {
            this.event = {
                start: this.dateStart + ' ' + this.timeStart,
                end:this.dateStart + ' ' + this.timeEnd,
                title: this.selectedUser[1] + ', ' + this.selectedUser[0],
                email: this.selectedUser[2],
                content: this.selectedUser[3],
                contentFull: this.notice,
                gender: this.selectedUser[4],
                phone: this.selectedUser[5],
                owner: ['/api/users/5']
            };
            this.$store.dispatch('postEvents', this.event);
            this.showEventInputDialog = false;
            this.$refs.form.reset();
            this.$refs.callShowSendConfirmMessage.showSendConfirmMessageDialog()
        },
        endTimeFilter(value) {
            if (!this.timeStart) return null
            const timeStartHours = this.timeStart.slice(0,2);
            const timeStartMinutes = this.timeStart.slice(-2);
            const newTimeEnd = new Date();
            newTimeEnd.setHours(timeStartHours);
            newTimeEnd.setMinutes(timeStartMinutes);
            const time = newTimeEnd.getTime() + value * 60000;
            const hours = `0${new Date(time).getHours()}`.slice(-2);
            const minutes = `0${new Date(time).getMinutes()}`.slice(-2);
            this.timeEnd = `${hours}:${minutes}`
        },
        closeEventInputDialog () {
            this.showEventInputDialog = false;
        }
    }
}
</script>

<style scoped>
    .btn-timeEndFilter {
        height: 50px;
        width: 100px;
        border: 2px solid #575757;
        border-radius: 5px;
        text-decoration: none;
        outline: none;
    }
    .btn-timeEndFilter:hover {
        background-color: #ECEFF1;
        border: 2px solid #78909C;
    }
    .btn-timeEndFilter:active {
        background-color: #CFD8DC;
        border: 2px solid #37474F;
    }
    .new-meeting-div {
        border-bottom: 5px solid #575757;
    }
</style>