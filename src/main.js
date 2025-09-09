//import './assets/main.css'
//import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Your web app's Firebase configuration.
const firebaseConfig = {
  apiKey: 'AIzaSyDW9Kim7er-x7bsLqGUHWNwMGwGEwyie8Q',
  authDomain: 'week7-peeradon.firebaseapp.com',
  projectId: 'week7-peeradon',
  storageBucket: 'week7-peeradon.firebasestorage.app',
  messagingSenderId: '123424790073',
  appId: '1:123424790073:web:62dd6b572455853f051fe8',
  measurementId: 'G-GP7295S7GC',
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(router)

app.mount('#app')
