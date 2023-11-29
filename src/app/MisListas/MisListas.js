const containerFon = document.querySelector('.contenedor');
const rain = () => {
    let j = 0;
    while (j <= 80){
        let gout = document.createElement('o');
        let x = innerWidth * Math.random();
        let time = 1 * Math.random();
        gout.style.animationDuration = time <= 0.4 ? (time + 0.4) + 's'  : time + 's';
        gout.style.animationDelay = time + 's';
        gout.style.left = x + 'px';
        containerFon.appendChild(gout);
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


const endSesion = document.querySelector(".sesion");
endSesion.addEventListener('click', cerrarSesion);

let cont = 1;
function cerrarSesion() {
    if (cont % 2 == 0) {
        document.getElementById('sesionMenu').style.display = 'none';
    } else {
        document.getElementById('sesionMenu').style.display = 'block';
    }
    cont++;
}

const addList = document.getElementById("newList");
const container = document.getElementById("container_list");

addList.addEventListener("click", addLista);

function addLista() {
  const playlistName = prompt("Ingresa el nombre de la lista:");

  if (!playlistName) {
    return;
  }

  const playlistData = {
    name: playlistName,
    userId: auth.currentUser.uid,
    audios: [] // Inicialmente, la lista de audios está vacía
  };

  // Añade la lista a Firebase
  db.collection("playlists")
    .add(playlistData)
    .then(docRef => {
      // Almacena el ID del documento en el contenedor HTML
      renderPlaylist({ ...playlistData, id: docRef.id });
    })
    .catch(error => {
      console.error("Error al agregar la lista:", error);
    });
}

function loadUserPlaylists(userId) {
  db.collection("playlists")
    .where("userId", "==", userId)
    .get()
    .then(querySnapshot => {
      console.log("Listas cargadas correctamente.");
      querySnapshot.forEach(doc => {
        const playlistData = doc.data();
        // Almacena el ID del documento en el contenedor HTML
        renderPlaylist({ ...playlistData, id: doc.id });
      });
    })
    .catch(error => {
      console.error("Error al cargar las listas del usuario:", error);
    });
}

function renderPlaylist(playlistData) {
  container.innerHTML += `
    <div class="list" data-doc-id="${playlistData.id}">
        <div class="imageList" onclick="showListL('${playlistData.id}', '${playlistData.name}')">
            <i class="fa-solid fa-headphones fa-3x"></i>
        </div>
        <h1 class="titleLi" contenteditable="true" oninput="updatePlaylistName('${playlistData.id}', this)" id="nameList">${playlistData.name}</h1>
        <h1 class="Audios" id="numberList">Número de audios:</h1>
        <h1 class="number" type="number" id="numberOfAudios_${playlistData.id}">${playlistData.audios.length || 0}</h1>
        <button class="deleteC" onclick="eliminarLista('${playlistData.id}')">
            <i class="fa-solid fa-trash-can fa-2x" id="eliminar"></i>
        </button>
    </div>`;
}

function updatePlaylistName(docId, element) {
  const playlistName = element.textContent;

  db.collection("playlists")
    .doc(docId)
    .update({ name: playlistName })
    .catch(error => {
      console.error("Error al actualizar el nombre de la lista:", error);
    });
}

function eliminarLista(docId) {
  // Elimina la lista de Firebase
  db.collection("playlists")
    .doc(docId)
    .delete()
    .then(() => {
      // Elimina la lista del contenedor HTML
      const listItem = document.querySelector(`[data-doc-id="${docId}"]`);
      listItem.remove();
      console.log("Lista eliminada correctamente.");
    })
    .catch(error => {
      console.error("Error al eliminar la lista:", error);
    });
}

function showListL(docId, playlistName) {
  // Escapa el nombre de la lista para asegurar que no haya caracteres problemáticos en la URL
  const escapedPlaylistName = encodeURIComponent(playlistName);

  // Construye la URL con el ID del documento y el nombre de la lista
  const url = `lista.html?docId=${docId}&playlistName=${escapedPlaylistName}`;

  // Redirige a la nueva URL
  window.location.href = url;
  console.log("Redirige a lista.html con el ID del documento y el nombre de la lista:", docId, playlistName);
}