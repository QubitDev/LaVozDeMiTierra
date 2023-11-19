
const showList = document.querySelectorAll(".imageList");
showList.addEventListener("click", showListL);

const addList = document.getElementById("newList");
const conteiner = document.getElementById("container_list");
addList.addEventListener("click",addLista);
let number = 1;
function addLista(){
    conteiner.innerHTML +=`
    <div class="list">
        <i class="fa-solid fa-headphones fa-3x" class="imageList"></i>
        <h1 class="titleLi">Lista numero ${number}</h1>
        <h1 class="Audios">Numero de audios:</h1>
        <h1 class="number" type="number">0</h1>
        <button class="deleteC">
            <i class="fa-solid fa-trash-can fa-2x"></i>
        </button>
    </div>
    
    `;
    number++;
}
function showListL(){
    document.getElementById("contenedor").style.display = 'none';
    document.getElementById("contenedor_Lista").style.display = 'block';
}

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
}