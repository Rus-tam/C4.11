import Vue from 'vue';
import store from './store';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import * as fb from 'firebase'
import '@babel/polyfill'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    fb.initializeApp({
      apiKey: "AIzaSyBRrWgYS18hojPO0YHgFVXn-A-YeDr_I70",
      authDomain: "todo-app-c8dbb.firebaseapp.com",
      databaseURL: "https://todo-app-c8dbb.firebaseio.com",
      projectId: "todo-app-c8dbb",
      storageBucket: "todo-app-c8dbb.appspot.com",
      messagingSenderId: "339985342116",
      appId: "1:339985342116:web:a044f98d359de8be9d1031",
      measurementId: "G-MSF32YSZEL"
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLogginUser', user)
      }
    })

    this.$store.dispatch('fetchTodo')
  }
}).$mount('#app');
