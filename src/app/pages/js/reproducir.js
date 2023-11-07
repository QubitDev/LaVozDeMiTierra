const urlParams = new URLSearchParams(window.location.search);
const docId= urlParams.get("id-doc");
const texto = urlParams.get("text-content");
//const docIdHome = urlParams.get("docHome");
const contenedorCards = document.getElementById('card');
const imagCen = document.querySelector(".imageF");


const tipo = document.getElementById("tipo__audio");
const  titulo = document.getElementById("titulo__audio");
const narradorAudio = document.getElementById("narrador");
const musicaF = document.getElementById("musica");

const audioElement = document.getElementById("audioE");
const uploadedfiles = [];

if(texto){
  showFile(texto);
}


function showFile(file) {

	console.log("pant = ",pantallaActual)
	if (file === "home") {
		window.location.reload();
		window.location.reload();
		if (user === "homeUsu") {
		  file = "homeUsu"; 
		} else if (user === "homeAdm") {
		  file = "homeAdm";
		}
	}

	if (file === pantallaActual) {
		return; 
	}
	// removeScript(file);
	
	  pantallaActual = file; 
	
	  contentMain.innerHTML = "";

	
	  fetch(`./assets/documentcion/${file}.txt`)
		.then((response) => {
		  if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.status}`);
		  }
		  return response.text();
		})
		  .then((data) => {
		  contentMain.innerHTML = data;
		})
		.catch((error) => {
		  console.error("Error al cargar el contenido:", error);
		});
	
	if (!uploadedfiles.includes(file)) {
	  	loadJS(file);
		loadCSS(file);
		uploadedfiles.push(file);
	}
	
}

function loadCSS(file) {
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = `./css/${file}.css`; 
	document.head.appendChild(link);
}
  
function loadJS(file) {
	const script = document.createElement("script");
	script.src = `./js/${file}.js`; 
	document.body.appendChild(script);
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


