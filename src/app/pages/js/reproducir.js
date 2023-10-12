import { datos } from "./registro.js";

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