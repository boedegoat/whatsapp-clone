import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDWvbbPbWUKPM1REt2k3U2SDiwI9hYZb6U',
  authDomain: 'whatsapp-clone-30703.firebaseapp.com',
  projectId: 'whatsapp-clone-30703',
  storageBucket: 'whatsapp-clone-30703.appspot.com',
  messagingSenderId: '336214072758',
  appId: '1:336214072758:web:5d982718b568455346b517',
}

// init app
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export const db = app.firestore()
export const auth = app.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
