const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("text-content");
const docIdHome = urlParams.get("docHome");
const contenedorCards = document.getElementById('card');

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
    
      //textURL.URLt = data.textURL;
      
      //console.log("url: ",textURL);
      
      audioElement.src = data.audioURL;
    fetch(textURL.URLt)
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

  } else {
      console.log("No se encontró el documento en Firestore.");
  }
}).catch((error) => {
  console.error("Error al obtener el documento:", error);
});


//console.log("url: ",textURL.URLt);
/*
if(doc){
  showFile(doc);
}

function showFile(file){
   fetch(`./assets/${documentacion}.txt`).then((response) =>{
      if(!response.ok){
        throw new Error(`Error en la solicitud : ${response.status}`);
      }
      return response.text();
   })
   .then((data) =>{
      contentMain.innerHTML=data;
      loadCSS(file);
      loadJS(file);
   })
   .catch((error) =>{
     console.error("Error al cargar el contenido:", error);
   });

}

function loadCSS(file){
  const link = document.createElement("link");
  link.rel="stylesheet";
  link.type="text/css";
  link.href = './css/${file}.css';
}

fetch("./assets/documentacion/El abuelo y el raton.txt").then(response=> response.text().then(TEXT => writeToConsole(TEXT));
function writeToConsole(TEXT){
  console.log(TEXT);
}*/

const fs = require('fs');
const path = require('path');

// Construct the file path to El origen del guajojo.txt
const filePath = path.join(__dirname, 'assets', 'documentacion', 'El origen del guajojo.txt');

fs.readFile(filePath, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data.toString());
    }
});





/*

const fs = require('fs')
        fs.readFile('El origen del guajojo.txt', (err, inputD) => {
           if (err) throw err;
              console.log(inputD.toString());
        })
*/
//barra lateral


db.collection('audio').limit(4).onSnapshot((snapshot) => {
  //console.log(snapshot.docs[0].data());

  cargarDocumentos(snapshot.docs);
});

const iddoc = {};

const cargarDocumentos = (documentos) => {
  if (documentos.length > 0) {
      ultimoDoc = documentos[documentos.length - 1];
      primerDoc = documentos[0];

      contenedorCards.innerHTML = '';

      documentos.forEach(documento => {
          //iddoc1.doc1 = documento.data().id;
          contenedorCards.innerHTML += `
          <div class="carta" id="carta" onClick="enviar('${documento.id}')">
              <figure>
        <img src="./../../../assets/images/CuentoUno.jpg"
          alt="La-leyenda-de-la-quinua-y-la-sal" height="110px" width="220px">
      </figure>
      
        
      
      <div class="contenido-card" style="margin-top: 0%;">
        <h4 style="margin: 1%;">${documento.data().titulo}</h4>
      </div>
                </div>
          </div>
          `;
      });
  }
}


function enviar(doc) {
  window.location.href = `../html/reproducir.html?doc=${doc}`;
}
