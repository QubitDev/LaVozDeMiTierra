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
      numberOfAudios: 0,
      userId: auth.currentUser.uid
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
    db.collection("playlists").where("userId", "==", userId).get().then(querySnapshot => {
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
          <div class="imageList" onclick="showListL('${playlistData.id}')">
              <i class="fa-solid fa-headphones fa-3x"></i>
          </div>
          <h1 class="titleLi" contenteditable="true" oninput="updatePlaylistName('${playlistData.id}', this)">${playlistData.name}</h1>
          <h1 class="Audios">Número de audios:</h1>
          <h1 class="number" type="number">${playlistData.numberOfAudios}</h1>
          <button class="deleteC" onclick="eliminarLista('${playlistData.id}')">
              <i class="fa-solid fa-trash-can fa-2x" id = "eliminar"></i>
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

  function showListL(docId) {
    // Implementa la lógica para redirigir a lista.html
    window.location.href = "lista.html"
    console.log("Redirige a lista.html con el ID del documento:", docId);
  }

/*
const db = firebase.firestore();
const auth = firebase.auth();

// Referencia a las colecciones 'audio' y 'playlist'
const audioCollection = db.collection("audio");
const playlistCollection = db.collection("playlist");

// Función para cargar y mostrar los audios disponibles
function cargarAudiosDisponibles() {
    const audioListElement = document.getElementById('audioList');

    audioCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const audio = doc.data();
        const audioItem = document.createElement('div');
        audioItem.classList.add('audio-item');
        audioItem.innerHTML = `
            <input type="checkbox" id="audio_${doc.id}">
            <label for="audio_${doc.id}">${audio.titulo}</label>
            `;
            audioListElement.appendChild(audioItem);
        });
    }).catch((error) => {
        console.error("Error al obtener audios:", error);
    });
}

// Llama a la función para cargar los audios cuando se carga la página
document.addEventListener("DOMContentLoaded", cargarAudiosDisponibles);

// Función para crear una playlist con los audios seleccionados
function crearPlaylist() {
    const playlistName = document.getElementById('playlistName').value;

    if (!playlistName) {
        alert("Por favor, ingrese un nombre para la playlist.");
        return;
    }

    const selectedAudios = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
        const audioId = checkbox.id.split('_')[1];
        selectedAudios.push(audioId);
    });

    if (selectedAudios.length === 0) {
        alert("Seleccione al menos un audio para la playlist.");
        return;
    }

    // Obtiene el usuario actualmente autenticado
    const user = auth.currentUser;

    if (user) {
        // Crea la playlist en la base de datos
        playlistCollection.add({
          nombre: playlistName,
          userId: user.uid,
          audios: selectedAudios
        })
        .then(() => {
          alert("Playlist creada con éxito.");
        })
        .catch((error) => {
          console.error("Error al crear la playlist:", error);
        });
    } else {
        alert("Usuario no autenticado. Inicie sesión para crear una playlist.");
    }
}*/