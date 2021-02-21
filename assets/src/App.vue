<template>
  <v-app>
    <div v-if="user">
<!--      <div style="display: flex">-->
      <div class="container">
        <v-card-title>
          <v-spacer/>
          <strong class="d-flex justify-center">{{ today }}</strong>
          <v-spacer/>
                  <v-app-bar-nav-icon
                          @click.stop="drawer = !drawer"
                  ></v-app-bar-nav-icon>
        </v-card-title>
<!--        <v-app-bar-nav-icon-->
<!--                @click.stop="drawer = !drawer"-->
<!--        ></v-app-bar-nav-icon>-->
      </div>
      <v-navigation-drawer
              v-model="drawer"
              absolute
              dark
              left
              temporary
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
              <img v-bind:src="myLogo" @click.stop="drawer = !drawer" />
          </v-list-item-avatar>
          <v-list-item-title  @click.stop="drawer = !drawer">Creative Coiffeur</v-list-item-title>
        </v-list-item>
<!--        <v-list-item class="px-2">-->
<!--          <v-btn @click="showUserDialog" class="d-flex justify-center"><strong>{{ user.username }}</strong></v-btn>-->
<!--        </v-list-item>-->
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item  @click="showUserDialog">
            <v-list-item-icon>
              <v-icon>{{ adminIcon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ this.user.username }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
                  v-for="item in items"
                  :key="item.title"
                  @click="item.click"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view></router-view>
        <new-user ref="callNewUserDialog" />
        <new-event ref="callNewEventDialog" />
      </v-main>
    </div>
    <div v-else class="wrapper">
      <div style="position:relative;">
        <div class="row no-gutters" style="box-shadow: 0 3px 7px 1px rgba(0,0,0,0.06);">
          <div class="col py-5">
            <h1 class="text-center">Creative Calendar</h1>
            <h6 class="text-center">Creative Coiffeur Şükrü Demir</h6>
          </div>
        </div>
        <div class="row no-gutters con">
          <div class="col-xs-12 col-md-6 px-5 con" style="background-color: #ECEFF1;">
              <v-img
                      class="center-v-h"
                      :src="ccLogo"
                      max-height="400"
                      max-width="400"
                  ></v-img>
<!--            <h2 class="text-center mb-5 pt-5 text-white">API</h2>-->
<!--            <p class="text-white">-->
<!--              You are currently-->
<!--              <span v-if="user">-->
<!--                              authenticated as {{ user.username }}-->

<!--                              <a href="/logout" class="btn btn-warning btn-sm">Log out</a>-->
<!--                          </span>-->
<!--              <span v-else>not authenticated</span>-->
<!--            </p>-->
<!--            <p class="text-white">-->
<!--              Check out the API Docs: <a v-bind:href="entrypoint" class="text-white"><u>{{ entrypoint }}</u></a>-->
<!--            </p>-->
          </div>
          <div class="col-xs-12 col-md-6 px-5 con" style="background-color: #CFD8DC;">
            <div class="center-v-h">
              <h2 class="mb-5 pt-5 text-white">Please login...</h2>
              <auth-login
                      v-on:user-authenticated="onUserAuthenticated"
              ></auth-login>
            </div>
          </div>
        </div>
        <footer class="footer">

          <p class="my-5 text-center">©2021 Şükrü Demir</p>

        </footer>
      </div>
  </div>
    <user-dialog
            :user-data="getUserData"
            ref="callShowUserDialog"
    />
  </v-app>
</template>

<script>
import axios from 'axios';
import AuthLogin from './components/Authorization/AuthLogin'
import Logo from './assets/logo-60x60.png';
import {
  mdiHome,
  mdiCalendarClock,
  mdiAccountPlus,
  mdiAccountGroupOutline,
  mdiAccountSupervisor,
  mdiReload,
  mdiMenu } from '@mdi/js'
import NewUser from './components/Dialog/NewUser'
import NewEvent from './components/Dialog/NewEvent'
import UserDialog from './components/Dialog/UserDialog'
import Weekdays from './resource/weekdays'
import Months from './resource/months'
import CcLogo from  "./assets/cc-logo-info.png"

export default {
  components: {
    AuthLogin,
    NewUser,
    NewEvent,
    UserDialog
  },
  data() {
    return {
      weekDaysData: Weekdays,
      monthsData: Months,
      myLogo: Logo,
      menu: mdiMenu,
      user: null,
      drawer: false,
      items: [
        { title: 'Home', icon: mdiHome, click: this.routerLinkHome },
        { title: 'Neuer Termin', icon: mdiCalendarClock, click: this.newEvent },
        { title: 'Neuer Kunde', icon: mdiAccountPlus, click: this.newUser },
        { title: 'Kundenstamm', icon: mdiAccountGroupOutline, click: this.routerLinkUserList },
        { title: 'Reload', icon: mdiReload, click: this.reload },
      ],
      adminIcon: mdiAccountSupervisor,
      mini: true,
      ccLogo: CcLogo,
    }
  },
  props: ['entrypoint'],
  computed: {
    getUserData () {
      if (!this.user) return {}
      return this.user
    },
    weekDay () {
      let currentDate = new Date();
      let day = currentDate.getDay()
      return this.weekDaysData.find(item => item.value === day);
    },
    month () {
      let currentDate = new Date();
      let month = currentDate.getMonth()
      return this.monthsData.find(item => item.value === month);
    },
    today () {
      let currentDate = new Date();
      let day = currentDate.getDate()
      return this.weekDay.day + ' ' + day + '.' + this.month.month
    }
  },
  methods: {
    onUserAuthenticated (userUri) {
      axios
              .get(userUri)
              .then(response => (this.user = response.data))
    },
    newUser () {
      this.$refs.callNewUserDialog.addUser();
    },
    newEvent () {
      this.$refs.callNewEventDialog.addEvent();
    },
    routerLinkHome () {
      this.$router.push('/', () => {})
    },
    routerLinkUserList () {
      this.$router.push('/user-list', () => {})
    },
    showUserDialog () {
      this.$refs.callShowUserDialog.openUserDialog();
    },
    reload () {
      this.$router.go(0);
      // setTimeout(function() { window.location.reload(); }, 300);
    }
  },
  mounted() {
    if (window.user) {
      this.user = window.user;
    }
  }
}
</script>

<style scoped lang="scss">
  .con {
    height: 1000px;
    position: relative;
  }
  .center-v-h {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    min-height: 60px;
    background-color: #f5f5f5;
  }
  .nav {
    z-index: 100;
  }
</style>