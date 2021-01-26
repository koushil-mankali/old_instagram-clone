import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDIr2yRRrDWYxxkzoC-TATZIj9LWDS-z9c",
    authDomain: "instagram-clone-1255b.firebaseapp.com",
    databaseURL: "https://instagram-clone-1255b-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-1255b",
    storageBucket: "instagram-clone-1255b.appspot.com",
    messagingSenderId: "904065602672",
    appId: "1:904065602672:web:397ba27e178b19cb3750b5",
    measurementId: "G-F9GC9PHHFM"
});

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};