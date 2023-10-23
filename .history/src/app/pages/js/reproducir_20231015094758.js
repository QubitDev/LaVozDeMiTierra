//import { datos } from "./registro.js";

const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("doc");
const docIdHome = urlParams.get("docHome");
console.log("id:: ",docId);

const tipo = document.getElementById("tipo__audio");
const  titulo = document.getElementById("titulo__audio");
const narradorAudio = document.getElementById("narrador");
const musicaF = document.getElementById("musica__fondo");

const audioElement = document.getElementById("audioElement");

db.collection("audio").doc(docId).get().then((doc) => {
  if (doc.exists) {
      const data = doc.data();
      tipo.innerText = data.tipoAudio;
      titulo.innerText = data.titulo;
      narradorAudio.innerText = `Narrado por: ${data.narrador}`;
      musicaF.innerText = `Música de Fondo: ${data.musica}`

      // Ahora, puedes reproducir el audio (asegúrate de proporcionar la URL correcta)
      audioElement.src = data.audioURL;
  } else {
      console.log("No se encontró el documento en Firestore.");
  }
}).catch((error) => {
  console.error("Error al obtener el documento:", error);
});

/*
const datos = JSON.parse(sessionStorage.getItem("misDatos"));
if (datos) {
  // Usa los datos como necesites
  console.log(datos);
  console.log();
}

Object.assign(datos.arguments,{titulo, musica, procedencia, formato, tipoAudio, narrador, duracion});
function datos(){
console.log(datos.titulo);
console.log(datos.musica);
console.log(datos.procedencia);
console.log(datos.formato);
console.log(datos.tipoAudio);
console.log(datos.narrador);
console.log(datos.dura)
}
*/