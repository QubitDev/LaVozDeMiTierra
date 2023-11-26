
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
    numberList = 1;
        const audio = audioDoc.data();
        const audioItem = document.createElement("div");
        audioItem.classList.add("audio-item");
        audioItem.innerHTML = `
        <h1>${numberList}</h1>
        <div class="caja">
            <a onclick="enviar('${doc.id}')">
                <div class="imagen" id="imagen${index}">
                <img src="${audio.imageURL}" alt="" height="100px" width="100px" class="imageF">
                </div>
            </a>
        </div> 
        <div class="descripcion">
            <h3 id="titulo${index}" style="text-align: right;">${audio.titulo}</h3>
            <h5 id="procedencia${index}" style="text-align: right;">${audio.procedencia}</h5>
            <h4 id="narrador${index}" style="text-align: right;">${audio.narrador}</h4>
            <h6 id="reproducciones${index}" style="text-align: right;">${audio.duracion}</h6>
        </div>
        `;
        audioList.appendChild(audioItem);
        numberList++;
    });
  });
}).catch((error) => {
  console.error("Error al obtener datos de Firebase:", error);
});