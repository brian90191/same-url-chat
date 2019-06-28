import firebase from 'firebase/app'
import 'firebase/database'

/* firebase */
const firebaseConfig = {
  apiKey: 'AIzaSyCtYAe6swHgsAIxv82GdW_knQLSe0jXv1A',
  authDomain: 'url-notepad.firebaseapp.com',
  databaseURL: 'https://url-notepad.firebaseio.com',
  projectId: 'url-notepad',
  storageBucket: '',
  messagingSenderId: '1077406778649',
  appId: '1:1077406778649:web:6ea1d7c80328d0fe'
}

// Get a Firestore instance
const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.database()
