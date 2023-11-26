
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
        const audio = audioDoc.data();
        const audioItem = document.createElement("div");
        audioItem.classList.add("audio-item");
        audioItem.innerHTML = `
        <div class="imagen" id="imagen${index}>
            <img src="${audio.imageURL}" alt="" height="100px" width="100px" class="imageF">
        </div>
        <h3 class="part1" id="titulo${index}">${audio.titulo}</h3>
        <h4 class="part2" id="Cultura">${audio.procedencia}</h4>
        <h5 class="part3" id="narrador">${audio.narrador}</h5>
        <h6 class="part4" id="duracion">${audio.duracion}</h6>
        <button class="deleteC">
            <i class="fas fa-trash-can fa-2x" id="deleteLis"></i>
       </button> 
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