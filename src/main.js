// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase';
import Toasted from 'vue-toasted';
import { FIREBASE_CONFIG } from './config/firebase'; 
import {store} from './store';
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
import 'animate.css/animate.css';
import 'bulma/css/bulma.css';
import '@/assets/css/MathQuestionary.css';
// FIREBASE DATABASES
firebase.initializeApp(FIREBASE_CONFIG,{
  timestampsInSnapshots: true
});
const realtimeDatabase = firebase.database();
const database = firebase.firestore();
database.settings({timestampsInSnapshots: true});
export const db = database;
export const realtimeDb = realtimeDatabase;
// FINISH FIREBASE DATABASES
Vue.config.productionTip = false;
Vue.use(Toasted);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
