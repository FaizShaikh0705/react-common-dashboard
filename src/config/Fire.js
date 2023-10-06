import firebase from 'firebase';
require("firebase/database");
require("firebase/auth");

const config = {

  apiKey: "AIzaSyCfZpx4zM5kZorht_JbWpfpjjniHNNvVMA",
  authDomain: "react-common-dashboard.firebaseapp.com",
  databaseURL: "https://react-common-dashboard-default-rtdb.firebaseio.com",
  projectId: "react-common-dashboard",
  storageBucket: "react-common-dashboard.appspot.com",
  messagingSenderId: "424934262012",
  appId: "1:424934262012:web:b2ff7cde9f19a4d9b50379",
  measurementId: "G-M9642KKLHS"

};

const fire = firebase.initializeApp(config);

export const auth = firebase.auth();

export const storage = firebase.storage();

export const database = firebase.database();


export default fire;