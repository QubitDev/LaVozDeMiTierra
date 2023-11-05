
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
const imagenDe = document.querySelector(".imagenLC");

db.collection("audio").doc(docId).get().then((doc) => {
  if (doc.exists) {
      tipo.innerText = doc.data().tipoAudio;
      titulo.innerText = doc.data().titulo;
      narradorAudio.innerText = `Narrado por: ${doc.data().narrador}`;
      musicaF.innerText = `Música de Fondo: ${doc.data().musica}`;
      audioElement.src = doc.data().audioURL;
      imagenDe.src = doc.data().imageURL; 
      textContentElement.src= doc.data().textoURL;     

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
              <img src="${documento.data().imageURL}" width="110px" height="220px">
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

	
	  fetch(`./html/${file}.txt`)
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