
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

// Obtener y mostrar los datos de los audios almacenados en el campo 'audios'
playlistCollection.get().then((querySnapshot) => {
  const audioList = document.querySelector('.container_audios');

  querySnapshot.forEach((doc, index) => {
    const playlist = doc.data();
    const audioIds = playlist.audios;

    audioIds.forEach(async (audioId) => {
      // Obtener referencia al documento de audio
      const audioDoc = await db.collection("audio").doc(audioId).get();

      if (audioDoc.exists) {
        const audioData = audioDoc.data();
        const audioItem = document.createElement("div");
        audioItem.classList.add("audio-item");
        audioItem.innerHTML = `
          <div class="contenido" id="contenido">
          <a onclick="enviar('${doc.id}')">
            <figure class="image"><img src="${audioData.imageURL}" width="80px" height="80px" id="imagenLis"></figure>
          </a>
            <p class="part1" id="titulo">${audioData.titulo}</p>
            <p class="part2" id="Cultura">${audioData.procedencia}</p>
            <p class="part3" id="narrador">${audioData.narrador}</p>
            <p class="part4" id="duracion">${audioData.duracion}</p>
            <button class="deleteC">
                <i class="fas fa-trash-can fa-2x" id="deleteLis"></i>
            </button>
          </div>
        `;

        audioList.appendChild(audioItem);
      } else {
        console.error(`El documento de audio con ID ${audioId} no existe.`);
      }
    });
  });
}).catch((error) => {
  console.error("Error al obtener datos de Firebase:", error);
});

function enviar(doc) {
    window.location.href = `./reproducir.html?doc=${doc}`;
  }