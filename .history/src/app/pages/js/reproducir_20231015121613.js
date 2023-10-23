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

db.collection("audio").doc(docId).get().then((doc) => {
  if (doc.exists) {
      const data = doc.data();
      tipo.innerText = data.tipoAudio;
      titulo.innerText = data.titulo;
      narradorAudio.innerText = `Narrado por: ${data.narrador}`;
      musicaF.innerText = `Música de Fondo: ${data.musica}`;
      console.log

      const xhr = new XMLHttpRequest();
      xhr.open("GET", data.textURL, true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          const contenido = xhr.responseText;
          textContentElement.textContent = contenido;
        } else {
          console.error("Error al cargar el archivo de texto:", xhr.status, xhr.statusText);
        }
      };
      xhr.onerror = function() {
        console.error("Error de red al cargar el archivo de texto.");
      };
      xhr.send();

      audioElement.src = data.audioURL;
  } else {
      console.log("No se encontró el documento en Firestore.");
  }
}).catch((error) => {
  console.error("Error al obtener el documento:", error);
});


