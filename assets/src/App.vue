<template>
  <v-app>
    <div v-if="user">
      <v-navigation-drawer
              v-model="drawer"
              absolute
              permanent
              dark
              right
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
              <img v-bind:src="myLogo" />
          </v-list-item-avatar>
          <v-list-item-title>Creative Coiffeur</v-list-item-title>
        </v-list-item>
        <v-list-item class="px-2">
          <v-list-item-title class="d-flex justify-center"><strong>{{ user.username }}</strong></v-list-item-title>
          <v-btn color="red" href="http://127.0.0.1:8000/logout">
            <v-icon>power_settings_new</v-icon>
            <span>Log Out</span>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item
                  v-for="item in items"
                  :key="item.title"
                  :to="item.link"
                  link
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
  </v-app>
</template>

<script>
  import axios from 'axios';
  import AuthLogin from './components/Authorization/AuthLogin'
  import Logo from './assets/logo-60x60.png';
  import { mdiHome, mdiCalendarClock, mdiAccountPlus, mdiAccountGroupOutline } from '@mdi/js'

  export default {
    components: {
      AuthLogin
    },
    data() {
      return {
        myLogo: Logo,
        user: null,
        drawer: true,
        items: [
          { title: 'Home', icon: mdiHome, link: '/', click: this.newEvent },
          { title: 'Neuer Termin', icon: mdiCalendarClock, link: '/new-event', click: this.newEvent },
          { title: 'Neuer Kunde', icon: mdiAccountPlus, link: '/new-user', click: this.newEvent },
          { title: 'Kundenstamm', icon: mdiAccountGroupOutline, link: '/user-list', click: this.test2 },
        ],
        mini: true
      }
    },
    props: ['entrypoint'],
    methods: {
      onUserAuthenticated (userUri) {
        axios
                .get(userUri)
                .then(response => (this.user = response.data))
      },
      newEvent () {
        this.$root.$emit('addEvent');
      },
      test2 () {
        console.log('test2');
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
</style>