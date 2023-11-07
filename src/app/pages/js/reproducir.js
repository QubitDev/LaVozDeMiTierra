const urlParams = new URLSearchParams(window.location.search);
const docId= urlParams.get("id-doc");
const texto = urlParams.get("text-content");
//const docIdHome = urlParams.get("docHome");
const contenedorCards = document.getElementById('card');

const imagenC = documento.getElementById("imagen__C")
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
      //const textContentElement = document.getElementById("text-content");
      //textContentElement.innerText = data.textURL;
      //textURL.URLt = data.textURL;
      
      //console.log("url: ",textURL);
      
      audioElement.src = data.audioURL;
      //textContentElement.innerText = data.textURL;
      //Imagen.src = data.imageURL;      
  } else {
      console.log("No se encontró el documento en Firestore.");
  }
});


const fs = require('fs')
        fs.readFile('El origen del guajojo.txt', (err, inputD) => {
           if (err) throw err;
              console.log(inputD.toString());
        })

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
