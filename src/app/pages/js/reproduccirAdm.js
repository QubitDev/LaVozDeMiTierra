const container = document.querySelector('.play');
const rain = () => {
    let j = 0;
    while (j <= 80){
        let gout = document.createElement('o');
        let x = innerWidth * Math.random();
        let time = 1 * Math.random();
        gout.style.animationDuration = time <= 0.4 ? (time + 0.4) + 's'  : time + 's';
        gout.style.animationDelay = time + 's';
        gout.style.left = x + 'px';
        container.appendChild(gout);
        j++;
    }
}
rain();

const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("doc");
const docIdHome = urlParams.get("docHome");
const contenedorCards = document.getElementById('card');
const imagCen = document.querySelector(".imagenLC");
const tipo = document.getElementById("tipo__audio");
const  titulo = document.getElementById("titulo__audio");
const narradorAudio = document.getElementById("narrador");
const musicaF = document.getElementById("musica");
const audioElement = document.getElementById("audioE");
const textContentElement = document.getElementById("text_content");
const endSesion = document.querySelector(".sesion");
endSesion.addEventListener('click',cerrarSesion);

let cont = 1;
function cerrarSesion(){
    if(cont % 2 == 0){
        document.getElementById('sesionMenu').style.display= 'none';
    }
    else{
        document.getElementById('sesionMenu').style.display= 'block';
    }
    cont++;
}

db.collection("audio").doc(docId).get().then((doc) => {
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
  "Laleyendadelcóndorylacholita","Leyendadelayuca","leyendaweenhayekdelorigendelfuegoylosvegetales",
  "Laleyendadelsajama","LaleyendadelToborochi","Laabuelagrillo","Laleyendadeeltíodelamina","Cuandomarchabanlasmontañas","Elbibosienmotacú",
  "Elcuentodelhilodeagua","Eljichi","Elpájarodefuego","Eltigreylashormigas","Laabuelasolitariaylospájaros",
  "Laleyendadelapapa","Laleyendadelaquena","Laleyendadelsajjrawhipina","Laleyendademancocapacymamaocllo","Lanoviadeláguila",
  "Laviudita","Lazorrayelcóndor","Leyenda del maíz","Leyendadelavirgendeurkupiña","Leyendadelosmonolitos",
  "LeyendadePapat","Ruperta","Topacorderito"]
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
  cargarDocumentos(snapshot.docs);
});

const iddoc = {};

const cargarDocumentos = (documentos) => {
  if (documentos.length > 0) {     

      contenedorCards.innerHTML = '';
      documentos.forEach(documento => {
          //iddoc1.doc1 = documento.data().id;
          contenedorCards.innerHTML += `
          <div class="carta" id="carta" onClick="enviar('${documento.id}')">
          <div class="contenido-card" style="margin-top: 0%;">
              <h4 style="margin: 1%;">${documento.data().titulo}</h4>
            </div>
            <figure>
              <img src="${documento.data().imageURL}" width="160px" height="160px" id="imagenesCard">
            </figure>            
          </div>          
          `;
      });
  }
}

function enviar(doc) {
  window.location.href = `../html/reproduccirAdm.html?doc=${doc}`;
}

