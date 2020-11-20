import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBrNvbrRvwyrNXVNVAY8DCOygOHd1uClb0",
  authDomain: "roomtracker-60ee1.firebaseapp.com",
  databaseURL: "https://roomtracker-60ee1.firebaseio.com",
  projectId: "roomtracker-60ee1",
  storageBucket: "roomtracker-60ee1.appspot.com",
  messagingSenderId: "112905204027",
  appId: "1:112905204027:web:ec13ff81331a7be02b871e"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
