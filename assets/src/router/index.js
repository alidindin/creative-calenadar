import Vue from 'vue'
import Router from 'vue-router'
import MainCal from '../components/MainCal/MainCal';
import UserList from '../components/UserList/UserList';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainCal',
      component: MainCal
    },
    {
      path: '/user-list',
      name: 'UserList',
      component: UserList

    }
  ]
})
