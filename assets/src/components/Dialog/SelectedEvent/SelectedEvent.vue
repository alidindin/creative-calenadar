<template>
    <div>
        <!-- Delete Event -->
        <delete-event ref="callShowDeleteEventDialog" :actual-event-for-delete="actualEvent" />
        <!-- Show Edit Event -->
        <v-dialog v-model="showEventDialog" :max-width="1200">
            <div v-if="showEditEvent">
                <v-card>
                    <div class="edit-div" style="padding-left: 30px; padding-right: 30px">
                        <v-card-title style="height: 110px">
                            <span>{{ actualEvent.title }}</span>
                            <v-spacer/>
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
                                            hint=""
                                            persistent-hint
                                            prepend-icon="mdi-calendar-export"
                                            @blur="dateStart = parseDate(dateFormattedStart)"
                                            v-on="on"
                                            style="max-width: 150px; margin-right: 100px"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                        v-model="dateStart"
                                        no-title
                                        @input="menuStart = false"
                                ></v-date-picker>
                            </v-menu>
                            <v-spacer/>
                            <v-btn
                                    v-on:click="closeEvent"
                                    depressed
                            >
                                <v-icon>{{ cancel }}</v-icon>
                            </v-btn>
                        </v-card-title>
                    </div>
                    <v-row style="max-width: 100%; padding-left: 50px; padding-right: 25px; padding-top: 30px">
                        <v-col cols="6" md="6" style="background: #F8F9F9;">
                            <v-card-text style="height: 150px">
                                <v-icon style="margin-top: -5px">{{ iconCalendarToday }}</v-icon>
                                <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Termin</p>
                                <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px;">
                                    <div class="d-inline-flex">
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
                                                    label="Beginn ?"
                                                    prepend-icon="mdi-clock-in"
                                                    readonly
                                                    v-on="on"
                                                    style="max-width: 100px"
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
                                    </div>
                                    <div class="d-inline-flex">
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
                                                    v-model="timeEnd"
                                                    label="Ende ?"
                                                    prepend-icon="mdi-clock-out"
                                                    readonly
                                                    v-on="on"
                                                    style="max-width: 100px"
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
                                    </div>
                                </div>
                            </v-card-text>
                            <v-card-text>
                                <v-icon style="margin-top: -5px">{{ iconUpdate }}</v-icon>
                                <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Dauer<p/>
                                <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px;">
                                    <p style="font-size: 16px">{{ actualEvent.endTimeMinutes - actualEvent.startTimeMinutes }} min</p>
                                </div>
                            </v-card-text>
                        </v-col>
                        <v-col cols="6" md="6" style="background: #F8F9F9;">
                            <v-card-text style="min-height: 150px">
                                <v-icon style="margin-top: -5px">{{ iconInfo }}</v-icon>
                                <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Info</p>
                                <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px;">
                                    <p style="font-size: 16px">{{ actualEvent.content }}</p>
                                </div>
                            </v-card-text>
                            <v-card-text>
                                <v-icon style="margin-top: -5px">{{ iconNote }}</v-icon>
                                <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Notiz</p>
                                <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px">
                                    <v-textarea
                                            v-model="notice"
                                            counter
                                            maxlength="120"
                                            full-width
                                            style="font-size: 16px"
                                            height="50px"
                                    ></v-textarea>
                                </div>
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <v-card-title>
                        <v-spacer/>
                        <v-btn
                                v-on:click="cancelEditEvent"
                                text
                        >
                            <span class="mr-2">Zurück</span>
                            <v-icon>{{ iconBack }}</v-icon>
                        </v-btn>
                        <v-btn
                                v-on:click="editEventConfirm"
                                text
                        >
                            <span class="mr-2">Speichern</span>
                            <v-icon>{{ iconCheck }}</v-icon>
                        </v-btn>
                    </v-card-title>
                </v-card>
            </div>
            <!-- Show Event Dialog -->
            <div v-else>
                <v-card>
                    <div v-if="actualEvent.class === 'male'" class="male" style="padding-left: 30px; padding-right: 25px;">
                        <v-card-title style="height: 110px">
<!--                            <v-icon>{{ actualEvent.icon }}</v-icon>-->
                            <span>{{ actualEvent.title }}</span>
                            <v-spacer/>
                            <strong>{{ weekDay.day }} {{ actualEvent.start && actualEvent.start.format('DD') }}. {{ month.month }} {{ actualEvent.start && actualEvent.start.format('YYYY') }}</strong>
                            <v-spacer/>
                            <v-btn
                                    v-on:click="closeEvent"
                                    depressed
                            >
                                <v-icon>{{ cancel }}</v-icon>
                            </v-btn>
                        </v-card-title>
                    </div>
                    <div v-else class="female" style="padding-left: 30px; padding-right: 30px;">
                        <v-card-title style="height: 110px">
                            <v-icon>{{ actualEvent.icon }}</v-icon>
                            <span>{{ actualEvent.title }}</span>
                            <v-spacer/>
                            <strong>{{ weekDay.day }} {{ actualEvent.start && actualEvent.start.format('DD') }}. {{ month.month }} {{ actualEvent.start && actualEvent.start.format('YYYY') }}</strong>
                            <v-spacer/>
                            <v-btn
                                    v-on:click="closeEvent"
                                    depressed
                            >
                                <v-icon>{{ cancel }}</v-icon>
                            </v-btn>
                        </v-card-title>
                    </div>
                    <v-row style="max-width: 100%; padding-left: 50px; padding-right: 25px; padding-top: 30px">
                        <v-col cols="6" md="6" style="background: #E8E8E8;">
                            <v-card-text style="min-height: 150px">
                                <v-icon style="margin-top: -5px">{{ iconCalendarToday }}</v-icon>
                                <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Termin</p>
                                <div style="margin-top: 20px; line-height: 0.8; padding-left: 5px; min-height: 70px;">
                                    <p class="d-inline-flex" style="font-size: 16px">Beginn: {{ actualEvent.start && actualEvent.start.formatTime() }}</p>
                                    <p class="d-inline-flex" style="margin-left: 20px; font-size: 16px">Ende: {{ actualEvent.end && actualEvent.end.formatTime() }}</p>
                                </div>
                            </v-card-text>
                            <v-card-text>
                                <v-icon  style="margin-top: -5px">{{ iconUpdate }}</v-icon>
                                <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Dauer</p>
                                <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px; min-height: 70px">
                                    <p style="font-size: 16px">{{ actualEvent.endTimeMinutes - actualEvent.startTimeMinutes }} min</p>
                                </div>
                            </v-card-text>
                        </v-col>
                        <v-col cols="6" md="6" style="background: #E8E8E8;">
                            <v-card-text style="min-height: 150px">
                                <v-icon style="margin-top: -5px">{{ iconInfo }}</v-icon>
                                <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Info</p>
                                <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px; min-height: 70px">
                                    <p style="font-size: 16px">{{ actualEvent.content }}</p>
                                </div>
                            </v-card-text>
                            <v-card-text>
                                <v-icon style="margin-top: -5px">{{ iconNote }}</v-icon>
                                <p style="font-size: 20px; font-weight: bold" class="d-inline-flex">Notiz</p>
                                <div style="margin-top: 20px; line-height: 0.4; padding-left: 5px; min-height: 70px">
                                    <p style="font-size: 16px">{{ actualEvent.info }}</p>
                                </div>
                            </v-card-text>
                        </v-col>
                    </v-row>
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
                                @click="showDeleteEventDialog"
                                text
                        >
                            <span class="mr-2">Löschen</span>
                            <v-icon>{{ iconDelete }}</v-icon>
                        </v-btn>
                    </v-card-title>
                </v-card>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import {
    mdiDeleteForever,
    mdiCalendarEdit,
    mdiCheckBold,
    mdiArrowLeftBox,
    mdiCalendarToday,
    mdiUpdate,
    mdiInformationOutline,
    mdiNoteOutline,
    mdiClose
} from '@mdi/js'
import DeleteEvent from './DeleteEvent';

export default {
    name: "SelectedEvent",
    components: {
      DeleteEvent
    },
    props: {
        actualEvent: {
            type: Object,
            required: true
        }
    },
    data: vm => ({
        cancel: mdiClose,
        iconDelete: mdiDeleteForever,
        iconCreate: mdiCalendarEdit,
        iconCheck: mdiCheckBold,
        iconBack: mdiArrowLeftBox,
        iconCalendarToday: mdiCalendarToday,
        iconUpdate: mdiUpdate,
        iconInfo: mdiInformationOutline,
        iconNote: mdiNoteOutline,
        weekDaysData : [
            {
                value: 0,
                day: 'Sonntag'
            },
            {
                value: 1,
                day: 'Montag'
            },
            {
                value: 2,
                day: 'Dienstag'
            },
            {
                value: 3,
                day: 'Mittwoch'
            },
            {
                value: 4,
                day: 'Donnerstag'
            },
            {
                value: 5,
                day: 'Freitag'
            },
            {
                value: 6,
                day: 'Samstag'
            }
        ],
        monthsData : [
            {
                value: 0,
                month: 'Januar'
            },
            {
                value: 1,
                motnh: 'Februar'
            },
            {
                value: 2,
                month: 'März'
            },
            {
                value: 3,
                month: 'April'
            },
            {
                value: 4,
                month: 'Mai'
            },
            {
                value: 5,
                month: 'Juni'
            },
            {
                value: 6,
                month: 'Juli'
            },
            {
                value: 7,
                month: 'August'
            },
            {
                value: 8,
                month: 'September'
            },
            {
                value: 9,
                month: 'Oktober'
            },
            {
                value: 10,
                month: 'November'
            },
            {
                value: 11,
                month: 'Dezember'
            }
        ],
        dateStart: null,
        dateFormattedStart: vm.formatDate(new Date().toISOString().substr(0, 10)),
        menuStart: false,
        menuEnd: false,
        timeStart: null,
        timeEnd: null,
        menuTimeStart: false,
        menuTimeEnd: false,
        agreement: false,
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

        selectedEvent: {},
        userInputsValid: true,
        selectedUser: [],
        showEventDialog: false,
        notice: undefined,
        event: undefined,
        lazy: false,
        showEditEvent: false,
        reDate: undefined
    }),
    computed: {
        weekDay() {
            if (!this.actualEvent.start) return [];
            return this.weekDaysData.find(item => item.value === this.actualEvent.start.getDay());
        },
        month() {
            if (!this.actualEvent.start) return [];
            return this.monthsData.find(item => item.value === this.actualEvent.start.getMonth());
        }
    },
    methods: {
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        parseDate(date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        showEvent() {
            this.showEventDialog = true;
        },
        showDeleteEventDialog () {
            console.log('testtest test test');
            this.showEventDialog = false;
            this.$refs.callShowDeleteEventDialog.showDeleteDialog();
        },
        deleteEvent(id) {
            console.log('selected', this.actualEvent);
            this.$store.dispatch('deleteEvents', id);
            setTimeout(function () {
                window.location.reload();
            }, 500);
        },
        editEvent() {
            this.showEditEvent = true
            this.dateStart = this.actualEvent.start.toISOString().substr(0, 10);
            this.timeStart = this.actualEvent.start.formatTime();
            this.timeEnd = this.actualEvent.end.formatTime();
            this.notice = this.actualEvent.info;
        },
        cancelEditEvent() {
            this.showEditEvent = false
        },
        editEventConfirm() {
            this.event = {
                id: this.actualEvent.id,
                start: this.dateStart + ' ' + this.timeStart,
                end:this.dateStart + ' ' + this.timeEnd,
                title: this.actualEvent.title,
                content: this.actualEvent.content,
                contentFull: this.notice
            }
            this.$store.dispatch('updateEvent', this.event);
            this.showEditEvent = false;
            setTimeout(function() { window.location.reload(); }, 300);
        },
        closeEvent () {
            this.showEditEvent = false
            this.showEventDialog = false;
        }
    }
}
</script>

<style scoped>
    .male {
        border-bottom: 5px solid #42A5F5;
    }
    .female {
        border-bottom: 5px solid #EC407A;
    }
    .edit-div {
        border-bottom: 5px solid #575757;
    }
</style>