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
const auth = firebase.auth();

// Observador de autenticación
auth.onAuthStateChanged(user => {
  if (user) {
    // El usuario ha iniciado sesión, puedes redirigirlo a la página principal o a donde necesites.
    console.log("El usuario ha iniciado sesión:", user);
    const userId = user.uid;
    localStorage.setItem('userId', userId);
    
    loadUserPlaylists(user.uid);
  } else {
    // El usuario no ha iniciado sesión, redirigirlo al formulario de inicio de sesión.
    console.log("El usuario no ha iniciado sesión");
    // Puedes redirigir al usuario a la página de inicio de sesión aquí, por ejemplo:
    window.location.href = "./../pages/html/Login.html";
  }
});


