const firebaseConfig = {
    apiKey: "AIzaSyAldLR7JcdW58mZ_Dtr7HQku8Pn648_3f4",
    authDomain: "qubit-2499b.firebaseapp.com",
    projectId: "qubit-2499b",
    storageBucket: "qubit-2499b.appspot.com",
    messagingSenderId: "154442139152",
    appId: "1:154442139152:web:14a0201532e21545006c95"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
d