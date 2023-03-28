import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {initializeApp} from 'firebase/app'
import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/main.css'

const firebaseConfig = {
    apiKey: "AIzaSyBdsck0d2b86g1NHdlRmURr1ZISDhl4OVI",
    authDomain: "moviereview-ac5ae.firebaseapp.com",
    projectId: "moviereview-ac5ae",
    storageBucket: "moviereview-ac5ae.appspot.com",
    messagingSenderId: "685882853708",
    appId: "1:685882853708:web:a30fff6713ed5cee7827e9",
    measurementId: "G-81XKP3FWN5"
};
let app = initializeApp(firebaseConfig)
app = createApp(App).use(router).mount('#app')

