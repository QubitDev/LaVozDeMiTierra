const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("doc");
const docIdHome = urlParams.get("docHome");
const contenedorCards = document.getElementById('card');


const tipo = document.getElementById("tipo__audio");
const  titulo = document.getElementById("titulo__audio");
const narradorAudio = document.getElementById("narrador");
const musicaF = document.getElementById("musica");

const audioElement = document.getElementById("audioE");
const textContentElement = document.getElementById("text_content");
const Imagen = document.getElementById("imgenC");

db.collection("audio").doc(docId).get().then((doc) => {
  if (doc.exists) {
      const data = doc.data();
      tipo.innerText = data.tipoAudio;
      titulo.innerText = data.titulo;
      narradorAudio.innerText = `Narrado por: ${data.narrador}`;
      musicaF.innerText = `Música de Fondo: ${data.musica}`;
      audioElement.src = data.audioURL;
      
      textContentElement.src = data.textURL;
      Imagen.src = data.imageURL;      
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

    var arryData = new Array();
      var archivoTxt = new XMLHttpRequest();
      var fileRuta = 'C/\Users/Gabriel/Desktop/Documentos/II-2023/IngeniriaSoftware/LaVozDeMiTierra/src/assets/texto/Cuentos';
      archivoTxt.open("GET",fileRuta,false);
      archivoTxt.send(null);
      var txt =archivoTxt.responseText;
      for(var i =0 ; i<txt.length;i++){
        arryData.push(txt[i]);
      }
      arryData.forEach(function(data){
          console.log(data);
      });