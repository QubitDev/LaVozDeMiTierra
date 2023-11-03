const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("doc");
const docIdHome = urlParams.get("docHome");
const contenedorCards = document.getElementById('card');
<<<<<<< HEAD
const imagCen = document.querySelector(".imageF");

=======

const imagenC = documento.getElementById("imagen__C")
>>>>>>> 50ca5790cb1e47d7404bfabb5a530f960fcf4b92
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
      const data = doc.data();
      tipo.innerText = data.tipoAudio;
      titulo.innerText = data.titulo;
      narradorAudio.innerText = `Narrado por: ${data.narrador}`;
      musicaF.innerText = `Música de Fondo: ${data.musica}`;
      audioElement.src = data.audioURL;      
      textContentElement.src = data.textURL;
      imagCen = data.imageURL;      
  } else {
      console.log("No se encontró el documento en Firestore.");
  }
});


console.log("url: ",textURL.URLt);

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



