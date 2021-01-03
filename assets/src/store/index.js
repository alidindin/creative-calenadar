import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import { StoreUtil } from "../utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: StoreUtil.state(),
    postEvents: StoreUtil.state(),
    deleteEvent: StoreUtil.state(),
    updateEvent: StoreUtil.state(),
    users: StoreUtil.state(),
    user: StoreUtil.state(),
    postUsers: StoreUtil.state(),
    deleteUser: StoreUtil.state(),
    updateUser: StoreUtil.state(),
    email: StoreUtil.state()
  },
  mutations: {
    [types.SET_CCCAL_GETEVENTS](state, payload) {
      state.events = StoreUtil.updateState(state.events, payload);
    },
    [types.SET_CCCAL_POSTEVENTS](state, payload) {
      state.postEvents = StoreUtil.updateState(state.postEvents, payload);
    },
    [types.SET_CCCAL_DELETEEVENTS](state, payload) {
      state.deleteEvent = StoreUtil.updateState(state.deleteEvent, payload);
    },
    [types.SET_CCCAL_UPDATEEVENT](state, payload) {
      state.updateEvent = StoreUtil.updateState(state.updateEvent, payload);
    },
    [types.SET_CCCAL_GETUSERS](state, payload) {
      state.users = StoreUtil.updateState(state.users, payload);
    },
    [types.SET_CCCAL_GETUSER](state, payload) {
      state.user = StoreUtil.updateState(state.user, payload);
    },
    [types.SET_CCCAL_POSTUSERS](state, payload) {
      state.postUsers = StoreUtil.updateState(state.postUsers, payload);
    },
    [types.SET_CCCAL_DELETEUSERS](state, payload) {
      state.deleteUser = StoreUtil.updateState(state.deleteUser, payload);
    },
    [types.SET_CCCAL_UPDATEUSER](state, payload) {
      state.updateUser = StoreUtil.updateState(state.updateUser, payload);
    },
    [types.SET_CCCAL_EMAIL](state, payload) {
      state.email = StoreUtil.updateState(state.email, payload);
    }
  },
  actions: {
    getEvents ({ commit }) {
      commit(types.SET_CCCAL_GETEVENTS);

      let url = 'https://127.0.0.1:8000/api/events'
      return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
              return res.json()
          })
          .then(res => {
            commit(types.SET_CCCAL_GETEVENTS, res);
          })
          .catch(e => {
            commit(types.SET_CCCAL_GETEVENTS, e);
          })
    },
    postEvents ({ commit }, events) {
      let url = 'https://127.0.0.1:8000/api/events'
      return fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(events),
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
            return res.json()
          })
          .then(res => {
            commit(types.SET_CCCAL_POSTEVENTS, (res.result));
          })
          .catch(e => {
            commit(types.SET_CCCAL_POSTEVENTS, e);
          })
    },
    deleteEvents ({ commit }, id) {
      let url = `https://127.0.0.1:8000/api/events/` + id;
      return fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
          .then(() => {
            console.log('removed')
          })
          .catch(e => {
            commit(types.SET_CCCAL_DELETEEVENTS, e);
          })
    },
    updateEvent ({ commit }, event) {
      let url = `https://127.0.0.1:8000/api/events/` + event.id;
      delete event.id;
      console.log('event', event)
      return fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(event),
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
            return res.json()
          })
          .then(res => {
            commit(types.SET_CCCAL_UPDATEEVENT, (res.result));
          })
          .catch(e => {
            commit(types.SET_CCCAL_UPDATEEVENT, e);
          })
    },
    getUsers ({ commit }) {
      commit(types.SET_CCCAL_GETUSERS);

      let url = 'https://127.0.0.1:8000/api/customers';
      return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
            return res.json()
          })
          .then(res => {
            commit(types.SET_CCCAL_GETUSERS, res);
          })
          .catch(e => {
            commit(types.SET_CCCAL_GETUSERS, e);
          })
    },
    getUser ({ commit }, id) {
      commit(types.SET_CCCAL_GETUSER);

      let url = 'https://127.0.0.1:8000/api/customers/' + id;
      return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
            return res.json()
          })
          .then(res => {
            commit(types.SET_CCCAL_GETUSER, res);
          })
          .catch(e => {
            commit(types.SET_CCCAL_GETUSER, e);
          })
    },
    postUsers ({ commit }, user) {
      let url = 'https://127.0.0.1:8000/api/customers';
      return fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
            return res.json()
          })
          .then(res => {
            commit(types.SET_CCCAL_POSTUSERS, (res.result));
          })
          .catch(e => {
            commit(types.SET_CCCAL_POSTUSERS, e);
          })
    },
    deleteUsers ({ commit }, id) {
      let url = `https://127.0.0.1:8000/api/customers/` + id;
      return fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
          .then(() => {
            console.log('removed')
          })
          .catch(e => {
            commit(types.SET_CCCAL_DELETEUSERS, e);
          })
    },
    updateUser ({ commit }, user) {
      let url = `https://127.0.0.1:8000/api/customers/` + user.id;
      delete user.id;
      console.log('event', user)
      return fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
            return res.json()
          })
          .then(res => {
            commit(types.SET_CCCAL_UPDATEUSER, (res.result));
          })
          .catch(e => {
            commit(types.SET_CCCAL_UPDATEUSER, e);
          })
    },
    sendEmail ({ commit }, email) {
      let url = `https://127.0.0.1:8000/email`;
      console.log('store email', email)
      return fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(email),
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
          .then(() => {
            console.log('Email send!')
          })
          .catch(e => {
            commit(types.SET_CCCAL_EMAIL, e);
          })
    }
  },
  getters: {
    events: state => state.events,
    postEvents: state => state.postEvents,
    deleteEvent: state => state.deleteEvent,
    updateEvent: state => state.updateEvent,
    users: state => state.users,
    user: state => state.user,
    postUsers: state => state.postUsers,
    deleteUser: state => state.deleteUser,
    updateUser: state => state.updateUser,
    email: state => state.email
  }
});
