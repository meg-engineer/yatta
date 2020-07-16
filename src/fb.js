import firebase from "firebase";
const config = {
  apiKey: "AIzaSyD0TU14mqKyiyLcDKLgclnY4VWKw6LizJw",
  authDomain: "oiwai-9b69a.firebaseapp.com",
  databaseURL: "https://oiwai-9b69a.firebaseio.com",
  projectId: "oiwai-9b69a",
  storageBucket: "oiwai-9b69a.appspot.com",
  messagingSenderId: "1030179767804",
  appId: "1:1030179767804:web:a900934de34384ffd49e79",
  measurementId: "G-TVQKNYJFQW"
};
// firebase.initializeApp(config);

export default {
  init() {
    firebase.initializeApp(config);
  }
};
