
const container = document.querySelector('.play');
const rain = () => {
    let j = 0;
    while (j <= 80){
        let gout = document.createElement('o');
        let x = innerWidth * Math.random();
        let time = 1 * Math.random();
        gout.style.animationDuration = time <= 0.4 ? (time + 0.4) + 's'  : time + 's';
        gout.style.animationDelay = time + 's';
        gout.style.left = x + 'px';
        container.appendChild(gout);
        j++;
    }
}
rain();

const emailRef = localStorage.getItem("email");

searchUsu(emailRef);
//Cargamos los datos del usario;
function searchUsu(correoUsu){
  var usuariosRef = db.collection('users');
  usuariosRef.get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
          var datosUsuario = doc.data().correoElectronico;
          if(datosUsuario == correoUsu){
            if(doc.data().imagenURL != ""){
              document.getElementById('imagenUsu').src = doc.data().imagenURL;
            }
          }          
      });
    }).catch(function(error) {
      console.error("Error al leer la colección 'usuarios':", error);
    });
  }

const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("doc");
const docIdHome = urlParams.get("docHome");
const contenedorCards = document.getElementById('card');
const imagCen = document.querySelector(".imagenLC");
const tipo = document.getElementById("tipo__audio");
const titulo = document.getElementById("titulo__audio");
const narradorAudio = document.getElementById("narrador");
const musicaF = document.getElementById("musica");
const audioElement = document.getElementById("audioE");
const textContentElement = document.getElementById("text_content");
const endSesion = document.querySelector(".sesion");
endSesion.addEventListener('click', cerrarSesion);

const emptyHeart = document.getElementById('__empty_heart');
const fullHeart = document.getElementById('__full_heart');
const receivedEmail = localStorage.getItem('email');


document.addEventListener('DOMContentLoaded', function () {

  function actualizarEstadoCorazon() {
    db.collection('favorito')
      .where('idNarracion', '==', docId)
      .where('email', '==', receivedEmail)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          emptyHeart.style.display = 'inline';
          fullHeart.style.display = 'none';
        } else {
          emptyHeart.style.display = 'none';
          fullHeart.style.display = 'inline';
        }
      })
      .catch((error) => {
        console.error('Error al obtener datos de Firestore:', error);
      });
  }
  actualizarEstadoCorazon();
});


let cont = 1;
function cerrarSesion() {
  if (cont % 2 == 0) {
    document.getElementById('sesionMenu').style.display = 'none';
  }
  else {
    document.getElementById('sesionMenu').style.display = 'block';
  }
  cont++;
}



db.collection("audio").doc(docId).get().then((doc) => {
  if (doc.exists) {
    tipo.innerText = doc.data().tipoAudio;
    titulo.innerText = doc.data().titulo;
    narradorAudio.innerText = `Narrado por: ${doc.data().narrador}`;
    musicaF.innerText = `Música de Fondo: ${doc.data().musica}`;
    audioElement.src = doc.data().audioURL;
    imagCen.src = doc.data().imageURL;

    const fileData = new Blob(['Contenido de prueba'], { type: 'text/plain' });
    const textoLO = new File([fileData], doc.data().textURL, { type: 'text/plain', lastModified: Date.now() });

    console.log(textoLO);
    const peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", () => {
      if (peticion.readyState == 4) {
        textContentElement.textContent = peticion.response;
      }
    })
    peticion.open("GET", getDocument(doc.data().titulo));
    peticion.send()
    console.log(peticion)

  } else {
    console.log("No se encontró el documento en Firestore.");
  }
});



//barra lateral

function getDocument(direccion) {
  const direccionT = restriccion(direccion);
  const fileList = ["Elorigendelguajojó", "Elabueloyelraton", "Elabueloylaquinuita", "Elquirquinchomúsico", "ElSapoyelCóndor",
    "Elzorroyelcuy", "Laancianayelsapo", "Lahijadelricoyelcondenado", "Laleyendadelacoca", "Laleyendadelapapa", "Laleyendadelaquinuaylasal",
    "Laleyendadelcóndorylacholita", "Leyendadelayuca", "leyendaweenhayekdelorigendelfuegoylosvegetales",
    "Laleyendadelsajama", "LaleyendadelToborochi", "Laabuelagrillo", "Laleyendadeeltíodelamina", "Cuandomarchabanlasmontañas", "Elbibosienmotacú",
    "Elcuentodelhilodeagua", "Eljichi", "Elpájarodefuego", "Eltigreylashormigas", "Laabuelasolitariaylospájaros",
    "Laleyendadelapapa", "Laleyendadelaquena", "Laleyendadelsajjrawhipina", "Laleyendademancocapacymamaocllo", "Lanoviadeláguila",
    "Laviudita", "Lazorrayelcóndor", "Leyenda del maíz", "Leyendadelavirgendeurkupiña", "Leyendadelosmonolitos",
    "LeyendadePapat", "Ruperta", "Topacorderito"]
  for (let i = 0; i < fileList.length; i++) {
    if (direccionT == restriccion(fileList[i])) {
      return "./../../../assets/textos/" + direccionT + ".txt";
    }
  }

}
function restriccion(cadena) {
  const answer = cadena.replace(/\s/g, "");
  const answerDos = answer.toLowerCase();
  return answerDos;
}

db.collection('audio').onSnapshot((snapshot) => {
  //console.log(snapshot.docs[0].data());
  cargarDocumentos(snapshot.docs);
});


const iddoc = {};

const cargarDocumentos = (documentos) => {
  if (documentos.length > 0) {
      contenedorCards.innerHTML = '';
      documentos.forEach(documento => {
          contenedorCards.innerHTML += `

          <div class="carta" id="carta" onClick="enviar('${documento.id}')">
          <div class="contenido-card" style="margin-top: 0%;">
              <h4 style="margin: 1%;">${documento.data().titulo}</h4>
            </div>
            <figure>
              <img src="${documento.data().imageURL}" width="160px" height="160px" id="imagenesCard">
            </figure>            
          </div>          
          `;
      });
    
  };
}
  

function enviar(doc) {
  window.location.href = `../html/reproducir.html?doc=${doc}`;
}

// ------------------------------------------------- Button Favorite --------------------------------------------

async function toggleHeart() {
  const favoritosCollection = db.collection('favorito');

  const creationDate = generationDate();

  const snapshot = await favoritosCollection
    .where('email', '==', receivedEmail)
    .where('idNarracion', '==', docId)
    .get();
  if (snapshot.empty) {
    emptyHeart.style.display = 'none';
    fullHeart.style.display = 'inline';
    // No existe un favorito similar, agregarlo
    const datos = {
      email: receivedEmail,
      idNarracion: docId,
      fechaCreacion: creationDate
    };

    favoritosCollection.add(datos)
      .then(function (docRef) {
        console.log('Favorito agregado con ID:', docRef.id);
      })
      .catch(function (error) {
        console.error('Error al agregar favorito:', error);
      });
  } else {
    // Ya existe un favorito similar, eliminarlo
    emptyHeart.style.display = 'inline';
    fullHeart.style.display = 'none';
    const docIdToDelete = snapshot.docs[0].id;
    favoritosCollection.doc(docIdToDelete).delete()
      .then(() => {
        console.log(`Favorito eliminado con ID: ${docIdToDelete}`);
      })
      .catch(function (error) {
        console.error('Error al eliminar favorito:', error);
      });
  }
}

const generationDate = () => {
  return new Date();
}




//---------------------------------CONTADOR DE REPRODUCCIONES-------------------------------
db.collection("audio").doc(docId).get().then((doc) => {
  if (doc.exists) {
    // Incrementar el contador de reproducciones cuando se reproduzca el audio
    const audioDocRef = db.collection("audio").doc(docId);
    audioDocRef.update({
      reproducciones: firebase.firestore.FieldValue.increment(1)
    });
  } else {
    console.log("No se encontró el documento en Firestore.");
  }
});
//-------------------------------ENVIAR A UNA PLAYLIST--------------------------------------
// Variable para almacenar el ID del audio seleccionado
let audioIdSeleccionado;

// Obtener el ID del primer documento de la colección 'audio'
db.collection('audio')
  .limit(1)
  .get()
  .then(querySnapshot => {
    if (!querySnapshot.empty) {
      const primerDocumento = db.collection("audio").doc(docId);
      audioIdSeleccionado = primerDocumento.id;
    } else {
      console.error("La colección 'audio' está vacía.");
    }
  })
  .catch(error => {
    console.error("Error al obtener el primer documento de la colección 'audio':", error);
  });

function mostrarPlaylists() {
  // Obtiene todas las playlists desde Firebase
  const userId = localStorage.getItem('userId');
  db.collection("playlists")
    .where("userId", "==", userId)
    .get()
    .then(querySnapshot => {
      const playlistsList = document.getElementById("playlistsList");

      // Limpia la lista existente
      playlistsList.innerHTML = "";

      // Llena la lista con las playlists disponibles
      querySnapshot.forEach(doc => {
        const playlistData = doc.data();
        const listItem = document.createElement("li");
        listItem.classList.add("playlist-item");
        listItem.textContent = playlistData.name;
        listItem.dataset.playlistId = doc.id;

        // Agrega un check mark para indicar la selección
        const checkMark = document.createElement("span");
        checkMark.classList.add("check-mark");
        checkMark.innerHTML = "&#10003;"; // Símbolo de check

        listItem.appendChild(checkMark);

        // Agrega el evento de clic
        listItem.addEventListener("click", () => toggleSeleccionPlaylist(listItem));

        playlistsList.appendChild(listItem);
      });

      // Muestra el modal
      mostrarModal();
    })
    .catch(error => {
      console.error("Error al obtener las playlists:", error);
    });
}

function toggleSeleccionPlaylist(listItem) {
  // Cambia la clase "selected" para cambiar el estado de selección
  listItem.classList.toggle("selected");
}

function aceptarSeleccion() {
  // Encuentra la playlist seleccionada
  const playlistSeleccionada = document.querySelector(".playlist-item.selected");

  if (playlistSeleccionada) {
    // Obtiene el ID de la playlist seleccionada
    const playlistId = playlistSeleccionada.dataset.playlistId;

    // Verifica si el audio ya existe en la playlist
    if (audioIdSeleccionado && playlistId) {
      const playlistRef = db.collection("playlists").doc(playlistId);

      // Obtiene la lista actual de audios en la playlist
      playlistRef.get()
        .then(doc => {
          if (doc.exists) {
            const audiosEnPlaylist = doc.data().audios || [];

            // Verifica si el audio ya está en la playlist
            if (audiosEnPlaylist.includes(audioIdSeleccionado)) {
              alert("El audio ya existe en la playlist.");
              // Puedes mostrar un mensaje o realizar otras acciones según sea necesario
            } else {
              // Agrega el ID del audio a la playlist en Firestore
              playlistRef.update({
                audios: firebase.firestore.FieldValue.arrayUnion(audioIdSeleccionado)
              })
                .then(() => {
                  console.log("ID del audio agregado correctamente a la playlist.");
                  // Restablece la variable de audioIdSeleccionado
                  audioIdSeleccionado = null;
                  // Cierra el modal después de aceptar la selección
                  cerrarModal();
                  // Muestra el mensaje
                  mostrarMensaje("Audio agregado a la lista correctamente.");
                })
                .catch(error => {
                  console.error("Error al agregar el ID del audio a la playlist:", error);
                });
            }
          } else {
            console.warn("La playlist no existe.");
          }
        })
        .catch(error => {
          console.error("Error al obtener la información de la playlist:", error);
        });
    } else {
      console.warn("No hay ID de audio o playlist seleccionada.");
    }
  } else {
    console.warn("Ninguna playlist seleccionada.");
  }
}

function mostrarModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function mostrarMensaje(mensaje) {
  const mensajeElemento = document.getElementById("mensaje");
  mensajeElemento.textContent = mensaje;
  mensajeElemento.style.display = "block";

  // Oculta el mensaje después de unos segundos (ajusta según tus necesidades)
  setTimeout(() => {
    mensajeElemento.style.display = "none";
  }, 3000);
}

