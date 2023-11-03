const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("user");
const contentMain = document.getElementById("app-content");
const butttonBuscar = document.getElementById("searchButton");
const buttonRegister = document.getElementById("registrar_audio");
const uploadedfiles = [];
let pantallaActual = null;


if(user){
	showFile(user);
	
	if(user === 'homeUsu'){
		buttonRegister.style.display='none';
		butttonBuscar.style.display ='block';
		document.title = `La Voz De Mi Tierra - ${user}`;
	}

	if(user === 'homeAdm'){
		butttonBuscar.style.display ='none';
		buttonRegister.style.display='block';
		document.title = `La Voz De Mi Tierra - ${user}`;
	}
}

function showFile(file) {
	 if (file === pantallaActual) {
		return; 
	  }
	
	  contentMain.innerHTML = "";

	  pantallaActual = file; 
	
	  if (!uploadedfiles.includes(file)) {
		loadCSS(file);
		loadJS(file);
		uploadedfiles.push(file);
	  }
	
	  fetch(`./html/${file}.html`)
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
  

  