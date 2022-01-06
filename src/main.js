import { initializeApp } from "firebase/app";
import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router";
import store from "./store";
import './plugins/element.js'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
