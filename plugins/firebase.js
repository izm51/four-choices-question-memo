import firebase from "firebase"

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDZV9wu_NL5-6d6Kyqs4hW6YSZTWE8DwL4",
    authDomain: "choices-memo.firebaseapp.com",
    databaseURL: "https://choices-memo.firebaseio.com",
    projectId: "choices-memo",
    storageBucket: "choices-memo.appspot.com",
    messagingSenderId: "711549813364"
  })
}

export default firebase