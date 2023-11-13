const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("user");
const contentMain = document.getElementById("app-content");
const buttonBuscar = document.getElementById("searchButton");
const buttonRegister = document.getElementById("registrar_audio");
// const endSesion = document.querySelector(".sesion");
const uploadedfiles = [];
let pantallaActual = null;



if(user){
	showFile(user);
	
	if(user === 'homeUsu'){
		buttonRegister.style.display='none';
		buttonBuscar.style.display ='block';
		document.title = `La Voz De Mi Tierra - ${user}`;
	}

	if(user === 'homeAdm'){
		buttonBuscar.style.display ='none';
		buttonRegister.style.display='block';
		document.title = `La Voz De Mi Tierra - ${user}`;
	}
}

function showFile(file) {

	console.log("pant = ",pantallaActual)
	if (file === "home") {
		// window.location.reload();
		if (user === "homeUsu") {
		  file = "homeUsu"; 
		} else if (user === "homeAdm") {
		  file = "homeAdm";
		}
		window.location.reload();
	}

	if (file === pantallaActual) {
		return; 
	}
	removeScript(pantallaActual);
	// uploadedfiles = uploadedfiles.filter(item => item !== pantallaActual);
	
	  pantallaActual = file; 
	
	  contentMain.innerHTML = "";

	
	  fetch(`./html/${file}.html`)
		.then((response) => {
		  if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.status}`);
		  }
		  return response.text();
		})
		  .then((data) => {
		  	if (contentMain !== null) {
   				 contentMain.innerHTML = data;
			}
		})
		.catch((error) => {
		  console.error("Error al cargar el contenido:", error);
		});
	
	
	console.log(`xd-> uploadedFiles: ${uploadedfiles}`);
	if (!contentMain.innerHTML) {
		if (!document.querySelector(`script[src='./js/${file}.js']`)) {
			loadJS(file);
		}

		if (!document.querySelector(`link[href='./css/${file}.css']`)) {
			loadCSS(file);
		}
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
    script.setAttribute("data-script-id", file);
    document.body.appendChild(script);
}
  

//   cerrar secion

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

function removeScript(scriptId) {
	const scripts = document.querySelectorAll(`[data-script-id="${scriptId}"]`);
    scripts.forEach((script) => {
        script.parentNode.removeChild(script);
	});
	// uploadedfiles = uploadedfiles.filter(item => item !== scriptId);
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // El usuario ha iniciado sesión, redirige a pagina principal
      console.log("El usuario ha iniciado sesión:", user);
      window.location.href = "homeUsu.html";
    } else {
      // El usuario no ha iniciado sesión, redirige a login.
      console.log("El usuario no ha iniciado sesión");
      window.location.href = "Login.html";
    }
});
