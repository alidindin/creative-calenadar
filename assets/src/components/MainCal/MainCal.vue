<template>
    <v-container v-if="this.getUsers" style="margin-top: 100px">
        <v-row v-if="this.$store.state.events.status.pending === true" class="center-v-h">
            <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
        </v-row>
        <v-row class="text-center">
            <h1 v-if="this.$store.state.events.status.fail === true" style="color:red">Error {{
                this.$store.state.events.status.fail }}</h1>
        </v-row>
        <v-row class="text-center">
            <vue-cal
                    v-if="this.$store.state.events.status.pending === false"
                    class="vuecal--blue-theme"
                    default-view="month"
                    click-to-navigate
                    today-button
                    events-on-month-view="short"
                    :events="eventsCal"
                    :on-event-click="onEventClick"
                    :time-from="8 * 60"
                    :time-to="22 * 60"
            >
            </vue-cal>
        </v-row>
            <!-- Show Event Dialog -->
            <selected-event ref="callShowSelectedEvent" :actual-event="selectedEvent" />
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/vuecal.css'
    import '../../css/cal.css'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {
        mdiDeleteForever,
        mdiCalendarEdit,
        mdiCheckBold,
        mdiArrowLeftBox,
        mdiCalendarToday,
        mdiUpdate,
        mdiInformationOutline,
        mdiNoteOutline
    } from '@mdi/js'
    import SelectedEvent from '../Dialog/SelectedEvent/SelectedEvent'

    export default {
        components: {
            VueCal,
            ClipLoader,
            SelectedEvent
        },
        name: 'MainCal',
        data: vm => ({
            // events: [
            //     {
            //         start: '2018-11-21',
            //         end: '2018-11-21',
            //         title: 'Need to go shopping',
            //         content: '<i class="v-icon material-icons">shopping_cart</i>',
            //         class: 'leisure'
            //     },
            //     {
            //         start: '2018-11-21',
            //         end: '2018-11-21',
            //         title: 'Golf with John',
            //         content: '<i class="v-icon material-icons">golf_course</i>',
            //         class: 'sport'
            //     },
            //     {
            //         start: '2018-11-22',
            //         end: '2018-11-22',
            //         title: 'Dad\'s birthday!',
            //         content: '<i class="v-icon material-icons">cake</i>',
            //         class: 'sport'
            //     }
            // ],

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
            genderOptions: [
                'Damenhaarschnitt',
                'Herrenhaarschnitt'
            ],
            nameRules: [
                v => !!v || 'Name is required'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            phoneRules: [
                v => !!v || 'Telefon is required'
            ],
            textRules: [
                v => !!v || 'Text is required'
            ],
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
            showSendEmailDialog: false,
            notice: undefined,
            event: undefined,
            lazy: false,
            showEditEvent: false,
            reDate: undefined
        }),
        computed: {
            ...mapGetters({
                getEvents: 'events',
                getUsers: 'users'
            }),
            // computedDateFormatted () {
            //   return this.formatDate(this.date)
            // },
            eventsCal() {
                if (!this.getEvents.data) return [];
                return this.getEvents.data.map((item) => {
                    return {
                        id: item.id,
                        start: item.start,
                        end: item.end,
                        title: item.title,
                        content: item.content,
                        info: item.contentFull,
                        class: item.gender
                    }
                })
            },
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
            usersOptions() {
                if (!this.getUsers.data) return [];
                return this.getUsers.data.map((item) => {
                    return {
                        value: [item.firstName, item.lastName, item.email, item.info, item.gender],
                        text: item.lastName + ',' + ' ' + item.firstName
                    }
                })
            },
            weekDay() {
                if (!this.selectedEvent.start) return [];
                return this.weekDaysData.find(item => item.value === this.selectedEvent.start.getDay());
            },
            month() {
                if (!this.selectedEvent.start) return [];
                return this.monthsData.find(item => item.value === this.selectedEvent.start.getMonth());
            }
        },
        watch: {
        },
        props: {
            showUserInputDialog: {
                type: Boolean,
                default: false,
            },
            showEventInputDialog: {
                type: Boolean,
                default: false,
            },
            loading: {
                type: Boolean,
                default: true
            },
            color: {
                type: String,
                default: '#42a3b9'
            },
            size: {
                type: String,
                default: '150px'
            },
            format: {
                type: [String, Number],
                default: '24h'
            }
        },
        methods: {
            postUser() {
                if (this.selectedClass === 'Herrenhaarschnitt') {
                    this.selectedClass = 'male';
                } else {
                    this.selectedClass = 'female';
                }
                let user = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phone: this.phone,
                    gender: this.selectedClass,
                    info: this.contentFull
                };
                console.log(user);
                this.$store.dispatch('postUsers', user);
                this.$refs.form.reset();
                this.showUserInputDialog = false;
            },
            postEvent() {
                this.event = {
                    start: this.dateStart + ' ' + this.timeStart,
                    end: this.dateStart + ' ' + this.timeEnd,
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
            sendEmail() {
                console.log(this.event);
                this.$store.dispatch('sendEmail', this.event);
                this.$refs.form.reset();
                this.showSendEmailDialog = false;
                setTimeout(function () {
                    window.location.reload();
                }, 300);
            },
            closeSendEmail() {
                console.log(this.event);
                this.$refs.form.reset();
                this.showSendEmailDialog = false;
                setTimeout(function () {
                    window.location.reload();
                }, 300);
            },
            // deleteEvent(id) {
            //     console.log('selected', this.selectedEvent);
            //     this.$store.dispatch('deleteEvents', id);
            //     setTimeout(function () {
            //         window.location.reload();
            //     }, 500);
            // },
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
            update() {
                this.$value = this.dateFormatted;
                this.$emit('change', this.dateFormatted);
            },
            onEventClick(event, e) {
                this.selectedEvent = event
                // this.showEventDialog = true
                this.$refs.callShowSelectedEvent.showEvent();

                // Prevent navigating to narrower view (default vue-cal behavior).
                e.stopPropagation()
            },
            endTimeFilter(value) {
                const timeStartHours = this.timeStart.slice(0, 2);
                const timeStartMinutes = this.timeStart.slice(-2);
                const newTimeEnd = new Date();
                newTimeEnd.setHours(timeStartHours);
                newTimeEnd.setMinutes(timeStartMinutes);
                const time = newTimeEnd.getTime() + value * 60000;
                const hours = `0${new Date(time).getHours()}`.slice(-2);
                const minutes = `0${new Date(time).getMinutes()}`.slice(-2);
                this.timeEnd = `${hours}:${minutes}`
            }
            // ,
            // editEvent() {
            //     this.showEditEvent = true
            //     this.dateStart = this.selectedEvent.start.toISOString().substr(0, 10);
            //     this.timeStart = this.selectedEvent.start.formatTime();
            //     this.timeEnd = this.selectedEvent.end.formatTime();
            // },
            // cancelEditEvent() {
            //     this.showEditEvent = false
            // },
            // editEventConfirm() {
            //    console.log('editEventConfirm', this.dateStart);
            //    console.log('editTimeStart', this.timeStart);
            //     console.log('editTimeEnd', this.timeEnd);
            // }
        },
        mounted() {
            this.$store.dispatch('getEvents');
            this.$store.dispatch('getUsers');
        }
    }
</script>

<style>
    .cal {
        z-index: auto;
    }
    .center-v-h {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

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

    .btn-ok {
        height: 40px;
        width: 100px;
        border: 2px solid darkseagreen;
        border-radius: 5px;
        text-decoration: none;
        outline: none;
    }

    .btn-ok:hover {
        background-color: lightgreen;
        border: 2px solid forestgreen;
    }

    .btn-later {
        height: 40px;
        width: 100px;
        border: 2px solid lightcoral;
        border-radius: 5px;
        text-decoration: none;
        outline: none;
    }

    .btn-later:hover {
        background-color: lightcoral;
        border: 2px solid red;
    }
</style>
