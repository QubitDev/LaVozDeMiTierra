//import { datos } from "./registro.js";

const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("doc");
const docIdHome = urlParams.get("docHome");

console.log("id:: ",docId);

const tipo = document.getElementById("tipo__audio");
const  titulo = document.getElementById("titulo__audio");
const narradorAudio = document.getElementById("narrador");
const musicaF = document.getElementById("musica");

const audioElement = document.getElementById("audioE");

const textContentElement = document.getElementById("text_content");
const xhr = new XMLHttpRequest()

db.collection("audio").doc(docId).get().then((doc) => {
  if (doc.exists) {
      const data = doc.data();
      tipo.innerText = data.tipoAudio;
      titulo.innerText = data.titulo;
      narradorAudio.innerText = `Narrado por: ${data.narrador}`;
      musicaF.innerText = `Música de Fondo: ${data.musica}`;
      const textURL = data.textURL;
      xhr.open("GET", textURL, true);

      audioElement.src = data.audioURL;
  } else {
      console.log("No se encontró el documento en Firestore.");
  }
}).catch((error) => {
  console.error("Error al obtener el documento:", error);
});

xhr.onload = function() {
  if (xhr.status === 200) {
    // El archivo se cargó exitosamente
    const contenido = xhr.responseText;
    // Mostrar el contenido en el elemento HTML
    textContentElement.textContent = contenido;
  } else {
    // Hubo un error al cargar el archivo
    console.error("Error al cargar el archivo de texto:", xhr.status, xhr.statusText);
  }
};

// Manejar errores de red
xhr.onerror = function() {
  console.error("Error de red al cargar el archivo de texto.");
};

// Enviar la solicitud
xhr.send();