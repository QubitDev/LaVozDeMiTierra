

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
var textURL='';
const textContentElement = document.getElementById("text_content");

db.collection("audio").doc(docId).get().then((doc) => {
  if (doc.exists) {
      const data = doc.data();
      tipo.innerText = data.tipoAudio;
      titulo.innerText = data.titulo;
      narradorAudio.innerText = `Narrado por: ${data.narrador}`;
      musicaF.innerText = `Música de Fondo: ${data.musica}`;
      

      textURL = data.textURL;
      // console.log(textURL);
      audioElement.src = data.audioURL;
  } else {
      console.log("No se encontró el documento en Firestore.");
  }
}).catch((error) => {
  console.error("Error al obtener el documento:", error);
});

function readText(texto){
  
}

fetch(textURL)
.then(response => {
  if (!response.ok) {
    throw new Error(`Error al cargar el archivo de texto: ${response.status} - ${response.statusText}`);
  }
  return response.text();
})
.then(text => {
  textContentElement.textContent = text;
})
.catch(error => {
  console.error(error);
});