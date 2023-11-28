const containerFon = document.querySelector('.container_main');
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

// Obtener referencia a la colección 'playlists'
const playlistCollection = db.collection("playlists");

// Obtener el ID de la lista de reproducción desde los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const docId = params.get('docId');

// Verificar si se proporcionó un ID de lista de reproducción
if (!docId) {
  console.error("No se proporcionó un ID de lista de reproducción.");
} else {
  // Obtener la lista de reproducción específica
  playlistCollection.doc(docId).get().then((playlistDoc) => {
    if (playlistDoc.exists) {
      const playlist = playlistDoc.data();
      const audioList = document.querySelector('.container_audios');

      const audioIds = playlist.audios || [];

      if (audioIds.length === 0) {
        console.warn("La lista de reproducción no tiene audios.");
      }

      audioIds.forEach(async (audioId) => {
        try {
          // Obtener referencia al documento de audio
          const audioDoc = await db.collection("audio").doc(audioId).get();

          if (audioDoc.exists) {
            const audioData = audioDoc.data();
            const audioItem = document.createElement("div");
            audioItem.classList.add("audio-item");
            audioItem.innerHTML = `
              <div class="contenido" id="contenido">
                <a onclick="redirigirReproducir('${audioDoc.id}')">
                  <figure class="image"><img src="${audioData.imageURL}" width="80px" height="80px" id="imagenLis"></figure>
                </a>
                <p class="part1" id="titulo">${audioData.titulo}</p>
                <p class="part2" id="Cultura">${audioData.procedencia}</p>
                <p class="part3" id="narrador">${audioData.narrador}</p>
                <p class="part4" id="duracion">${audioData.duracion}</p>
                <button class="deleteC" onclick="eliminarAudio('${audioId}')">
                  <i class="fas fa-trash-can fa-2x" id="deleteLis"></i>
                </button>
              </div>
            `;

            audioList.appendChild(audioItem);
          } else {
            console.error(`El documento de audio con ID ${audioId} no existe.`);
          }
        } catch (error) {
          console.error("Error al obtener datos de Firebase:", error);
        }
      });
    } else {
      console.error(`El documento de lista con ID ${docId} no existe.`);
    }
  }).catch((error) => {
    console.error("Error al obtener datos de Firebase:", error);
  });
}

// Función para redirigir a la página de reproducción
function redirigirReproducir(audioId) {
  window.location.href = `../../app/pages/html/reproducir.html?doc=${audioId}`;
}

// Función para eliminar un audio de la lista de reproducción
function eliminarAudio(audioId) {
    // Obtener referencia al documento de la lista de reproducción
    const playlistDocRef = db.collection("playlists").doc(docId);
  
    // Obtener la lista de reproducción actual
    playlistDocRef.get().then((playlistDoc) => {
      if (playlistDoc.exists) {
        // Obtener los IDs actuales de audios
        const audioIds = playlistDoc.data().audios || [];
  
        // Filtrar el audio que se va a eliminar
        const nuevosAudios = audioIds.filter((id) => id !== audioId);
  
        // Actualizar la lista de reproducción con los nuevos audios
        playlistDocRef.update({ audios: nuevosAudios }).then(() => {
          console.log(`Audio con ID ${audioId} eliminado de la lista.`);
          
          // Actualizar la interfaz de usuario eliminando el elemento correspondiente
          const audioItem = document.querySelector(`[data-audio-id="${audioId}"]`);
          if (audioItem) {
            audioItem.remove();
          } else {
            console.warn(`Elemento del audio con ID ${audioId} no encontrado en la interfaz.`);
          }
          location.reload();
        }).catch((error) => {
          console.error("Error al actualizar la lista de reproducción:", error);
        });
      } else {
        console.error(`El documento de lista con ID ${docId} no existe.`);
      }
    }).catch((error) => {
      console.error("Error al obtener datos de Firebase:", error);
    });
  }

// Obtiene los parámetros de la URL
const playlistName = decodeURIComponent(params.get('playlistName'));
// Muestra la información en el elemento h1
const playlistInfoElement = document.getElementById('playlistInfo');
 playlistInfoElement.textContent = `${playlistName}`;