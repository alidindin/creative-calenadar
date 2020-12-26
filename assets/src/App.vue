<template>
  <v-app>
    <div v-if="user">
      <v-navigation-drawer
              class="nav"
              v-model="drawer"
              absolute
              :mini-variant.sync="mini"
              dark
              right
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
              <img v-bind:src="myLogo" @click.stop="mini = !mini" />
          </v-list-item-avatar>
          <v-list-item-title>Creative Coiffeur</v-list-item-title>
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
            <h6 class="text-center">Because someone wants your left-over cheese.</h6>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-xs-12 col-md-6 px-5" style="background-color: #659dbd; padding-bottom: 150px;">
            <h2 class="text-center mb-5 pt-5 text-white">API</h2>
            <p class="text-white">
              You are currently
              <span v-if="user">
                              authenticated as {{ user.username }}

                              <a href="/logout" class="btn btn-warning btn-sm">Log out</a>
                          </span>
              <span v-else>not authenticated</span>
            </p>
            <p class="text-white">
              Check out the API Docs: <a v-bind:href="entrypoint" class="text-white"><u>{{ entrypoint }}</u></a>
            </p>
          </div>
          <div class="col-xs-12 col-md-6 px-5" style="background-color: #7FB7D7; padding-bottom: 150px;">
            <h2 class="text-center mb-5 pt-5 text-white">Or, login!</h2>
            <auth-login
                    v-on:user-authenticated="onUserAuthenticated"
            ></auth-login>
          </div>
        </div>
        <footer class="footer">

          <p class="text-muted my-5 text-center">Made with ❤️ by the <a style="text-decoration: underline; color: #6c757d; font-weight: bold;" href="http://www.symfonycasts.com">SymfonyCasts</a> Team</p>

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
import { mdiHome, mdiCalendarClock, mdiAccountPlus, mdiAccountGroupOutline, mdiAccountSupervisor, mdiReload } from '@mdi/js'
import NewUser from './components/Dialog/NewUser'
import NewEvent from './components/Dialog/NewEvent'
import UserDialog from './components/Dialog/UserDialog'

export default {
  components: {
    AuthLogin,
    NewUser,
    NewEvent,
    UserDialog
  },
  data() {
    return {
      myLogo: Logo,
      user: null,
      drawer: true,
      items: [
        { title: 'Home', icon: mdiHome, click: this.routerLinkHome },
        { title: 'Neuer Termin', icon: mdiCalendarClock, click: this.newEvent },
        { title: 'Neuer Kunde', icon: mdiAccountPlus, click: this.newUser },
        { title: 'Kundenstamm', icon: mdiAccountGroupOutline, click: this.routerLinkUserList },
        { title: 'Reload', icon: mdiReload, click: this.reload },
      ],
      adminIcon: mdiAccountSupervisor,
      mini: true
    }
  },
  props: ['entrypoint'],
  computed: {
    getUserData () {
      if (!this.user) return {}
      return this.user
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
      this.$router.push('/')
    },
    routerLinkUserList () {
      this.$router.push('/user-list')
    },
    showUserDialog () {
      this.$refs.callShowUserDialog.openUserDialog();
    },
    reload () {
      setTimeout(function() { window.location.reload(); }, 300);
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