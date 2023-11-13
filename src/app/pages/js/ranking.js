const endSesion = document.querySelector(".sesion");
endSesion.addEventListener('click',cerrarSesion);
let cont = 1;
function cerrarSesion(){
    if(cont % 2 == 0){
        document.getElementById('sesionMenu').style.display= 'none';
    }
    else{
        document.getElementById('sesionMenu').style.display= 'block';
    }
    cont++;
}
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


// Obtener referencia a la colección 'audio'
const audioCollection = db.collection("audio");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM completamente cargado");
  // Obtener y mostrar los 10 mejores en reproducciones
  audioCollection.orderBy("reproducciones", "desc").limit(10).get().then((querySnapshot) => {
    const rankingList = document.querySelector('.ranking-list');
    querySnapshot.forEach((doc, index) => {
      const audio = doc.data();
      const rankingItem = document.createElement("li");
      rankingItem.classList.add("ranking-item");
      rankingItem.innerHTML = `
        <span>${index + 1}</span>
        <div class="caja">
          <div class="imagen" id="imagen${index}">
            <img src="${audio.imageURL}" alt="" height="90px" width="100px" class="imageF">
          </div>
        </div> 
        <div class="descripcion">
          <h3 id="titulo${index}">${audio.titulo}</h3>
         
          <h5 id="narrador${index}">${audio.narrador}</h5>
          <h3 id="reproducciones${index}">${audio.reproducciones}</h3>
        </div>
      `;

      rankingList.appendChild(rankingItem);
    });
  }).catch((error) => {
    console.error("Error al obtener datos de Firebase:", error);
  });
});