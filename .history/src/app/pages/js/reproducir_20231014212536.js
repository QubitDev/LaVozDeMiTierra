//import { datos } from "./registro.js";

const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("doc");
console.log("id:: ",docId);

db.collection("audio").doc(docId).get().then((doc) => {
  if (doc.exists) {
      const data = doc.data();
      document.getElementById("tipo__audio").innerText = data.tipo;
      document.getElementById("titulo__audio").innerText = data.titulo;
      document.getElementById("narrador").innerText = `Narrado por: ${data.narrador}`;
      document.getElementById().innerText = `Procedencia: ${data.procedencia}`

      // Ahora, puedes reproducir el audio (asegúrate de proporcionar la URL correcta)
      document.getElementById("audioElement").src = data.audioURL;
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