const urlParams = new URLSearchParams(window.location.search);
const data = urlParams.get("data");
const receivedArray = data.split(",").map(item => decodeURIComponent(item));
const contenedorCards = document.getElementById('card');
const imagCen = document.querySelector(".imagenLC");
const tipo = document.getElementById("tipo__audio");
const  titulo = document.getElementById("titulo__audio");
const narradorAudio = document.getElementById("narrador");
const musicaF = document.getElementById("musica");

const audioElement = document.getElementById("audioE");
const textContentElement = document.getElementById("text_content");

db.collection("audio").doc(receivedArray[0]).get().then((doc) => {
  if (doc.exists) {
      tipo.innerText = doc.data().tipoAudio;
      titulo.innerText = doc.data().titulo;
      narradorAudio.innerText = `Narrado por: ${doc.data().narrador}`;
      musicaF.innerText = `Música de Fondo: ${doc.data().musica}`;
      audioElement.src = doc.data().audioURL;      
      imagCen.src = doc.data().imageURL;
        
      const fileData = new Blob(['Contenido de prueba'], { type: 'text/plain' });
      const textoLO = new File([fileData], doc.data().textURL, { type: 'text/plain', lastModified: Date.now() });

      console.log(textoLO);
      const peticion = new XMLHttpRequest();
      peticion.addEventListener("readystatechange",()=>{
        if(peticion.readyState == 4){
          textContentElement.textContent = peticion.response;
        }
      })
      peticion.open("GET",getDocument(doc.data().titulo));
      peticion.send()
      console.log(peticion) 

  } else {
      console.log("No se encontró el documento en Firestore.");
  }
});

//barra lateral

function getDocument(direccion){
  const direccionT = restriccion(direccion);
  const fileList = ["Elorigendelguajojó","Elabueloyelraton","Elabueloylaquinuita","Elquirquinchomúsico","ElSapoyelCóndor",
  "Elzorroyelcuy","Laancianayelsapo","Lahijadelricoyelcondenado","Laleyendadelacoca","Laleyendadelapapa","Laleyendadelaquinuaylasal",
  "Laleyendadelcóndorylacholita","Leyendadelayuca","leyendaweenhayekdelorigendelfuegoylosvegetales","Laleyendadelsajama","LaleyendadelToborochi"]
  for(let i=0;i<fileList.length;i++){
    if(direccionT == restriccion(fileList[i])){
      return "./../../../assets/textos/"+ direccionT+".txt";      
    }
  }
  

}
function restriccion(cadena){
  const answer = cadena.replace(/\s/g , "");
  const answerDos = answer.toLowerCase();
  return answerDos;
}

db.collection('audio').onSnapshot((snapshot) => {
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
              <img src="${documento.data().imageURL}" width="160px" height="160px">
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
  const  newData = [doc, receivedArray[1]];
  const encodedArray = newData.map(item => encodeURIComponent(item)).join(",");
  window.location.href = `../html/reproducir.html?data=${newData}`;
}
//---------------------------------CONTADOR DE REPRODUCCIONES-------------------------------
db.collection("audio").doc(receivedArray[0]).get().then((doc) => {
  if (doc.exists) {
    // Incrementar el contador de reproducciones cuando se reproduzca el audio
    const audioDocRef = db.collection("audio").doc(docId);
    audioDocRef.update({
      reproducciones: firebase.firestore.FieldValue.increment(1)
    });
  } else {
    console.log("No se encontró el documento en Firestore.");
  }
});

//-------------------------------------------------- redirecciones
function returnHome() {
     window.location.href = `../app.html?user=${receivedArray[1]}`;
}

function favorite() {
     window.location.href = `../app.html?user=${'favorito'}`;
}

function ranking() {
     window.location.href = `../app.html?user=${'ranking'}`;
}

function myLists() {
     window.location.href = `../app.html?user=${'misListas'}`;
}

