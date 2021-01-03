  import firebase from "firebase"

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAFowKe5bkd9BjTUXo5kDJ6FpUTfwByZuU",
    authDomain: "insta-clone-38637.firebaseapp.com",
    databaseURL: "https://insta-clone-38637.firebaseio.com",
    projectId: "insta-clone-38637",
    storageBucket: "insta-clone-38637.appspot.com",
    messagingSenderId: "992798264917",
    appId: "1:992798264917:web:81df400a2df80a6dc20edc"
  })

  const db =firebaseApp.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()

  export {db, auth, storage}