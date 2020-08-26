import Vue from 'vue';
import Router from 'vue-router';
import AuthGuard from './components/auth_guard';
import Login from './components/Auth/Login.vue';
import Registration from './components/Auth/Registration.vue';
import Logout from './components/Auth/Logout.vue';
import Actualtasks from './components/Tasks/Actualtasks.vue';
import Complited from './components/Tasks/Complitedtasks.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/registration',
      name: 'registration.vue',
      component: Registration,
    },
    {
      path: '/logout',
      name: 'logout.vue',
      component: Logout,
    },
    {
      path: '/',
      name: 'actualtasks.vue',
      component: Actualtasks,
      beforeEnter: AuthGuard
    },
    {
      path:'/complited',
      name: 'complitedtasks.vue',
      component: Complited,
      beforeEnter: AuthGuard
    }
  ],
});
