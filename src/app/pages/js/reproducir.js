const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("doc");
const docIdHome = urlParams.get("docHome");
const contenedorCards = document.getElementById('card');
const imagCen = document.querySelector(".imageF");


const tipo = document.getElementById("tipo__audio");
const  titulo = document.getElementById("titulo__audio");
const narradorAudio = document.getElementById("narrador");
const musicaF = document.getElementById("musica");

const audioElement = document.getElementById("audioE");
const textContentElement = document.getElementById("text_content");

imagenC.addEventListener("change", function () {
  const selectedImage = this.files[0]; // Obtén el archivo de imagen seleccionado

  const imagePreview = document.getElementById("imagePreview");
  const frase = document.getElementById("frase");

  frase.style.display = "none";
  imagePreview.style.display = "block";

  if (selectedImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(selectedImage);
  } else {
    imagePreview.src = "";
  }
});

db.collection("audio").doc(docId).get().then((doc) => {
  if (doc.exists) {
      tipo.innerText = doc.data().tipoAudio;
      titulo.innerText = doc.data().titulo;
      narradorAudio.innerText = `Narrado por: ${doc.data().narrador}`;
      musicaF.innerText = `Música de Fondo: ${doc.data().musica}`;
      audioElement.src = doc.data().audioURL;      
      imagCen.src = doc.data().imageURL;  

      const peticion = new XMLHttpRequest();
      peticion.addEventListener("readystatechange",()=>{
        if(peticion.readyState == 4){
          textContentElement.textContent = peticion.response;
        }
      })
      peticion.open("GET",doc.data().textURL);
      peticion.send()
      console.log(peticion)     
  } else {
      console.log("No se encontró el documento en Firestore.");
  }
});



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
              <img src="${documento.data().imageURL}" width="90px" height="90px">
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


const fs = require('fs');
      const path = require('path');

      // Construct the file path to El origen del guajojo.txt
      const filePath = path.join(__dirname, 'assets', 'documentacion', 'El origen del guajojo.txt');

      fs.readFile(filePath, (err, data) => {
      if (err) {
          console.error(err);
        } else {
          document.getElementById("text_content").value = data.toString();
        }
});

      textContentElement.innerText = data.textURL;