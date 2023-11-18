const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("user");

const contentMain = document.getElementById("app-content");
const buttonBuscar = document.getElementById("searchButton");
const buttonRegister = document.getElementById("registrar_audio");
const ranking = document.getElementById("ranking_audios");
const favoritos = document.getElementById("favoritos");
const listas = document.getElementById("mis_listas");

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

let pantallaActual = null;



if (user) {
	showFile(user);
	
	if(user === 'homeUsu' || user === 'ranking' || user === 'favorito' || user === 'misListas'){
		buttonRegister.style.display='none';
		buttonBuscar.style.display = 'block';
		ranking.style.display = 'block';
		favoritos.style.display = 'block';
		listas.style.display = 'block'; 
		user = 'homeUsu';
		document.title = `La Voz De Mi Tierra - ${user}`;
		
	}

	if (user === 'homeAdm' || user === 'registro') {
		// if(user === 'registro') user = 'homeAdm';
		buttonBuscar.style.display ='none';
		buttonRegister.style.display = 'block';
		ranking.style.display = 'none';
		favoritos.style.display = 'none';
		listas.style.display = 'none'; 
		user = 'homeAdm';
		document.title = `La Voz De Mi Tierra - ${user}`;

	}
}

function showFile(file) {
	removeScript(user);
	removeScript(pantallaActual);
	
	console.log("showFile ejecutado. file:", file, "pantallaActual:", pantallaActual);

	if (file === "home") {
		if (user === "homeUsu" || user === 'ranking' || user === 'favorito' || user === 'misListas') {
			file = "homeUsu";
			window.location.href = `./app.html?user=${'homeUsu'}`
		} else if (user === "homeAdm" || user === 'registro') {
			file = "homeAdm";
			window.location.href = `./app.html?user=${'homeAdm'}`
		}
	}
	

	if (file === pantallaActual) {
		return; 
	}
	
	pantallaActual = file; 
	  	console.log("pant = ",pantallaActual)
   	contentMain.innerHTML = "";
	
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
  

//   cerrar sesion
function removeScript(scriptId) {
	const scripts = document.querySelectorAll(`[data-script-id="${scriptId}"]`);
    scripts.forEach((script) => {
        script.parentNode.removeChild(script);
	});
}

firebase.auth().onAuthStateChanged(function(user1) {
    if (user1) {
      window.location.href = `${user}.html`;
    } else {
      window.location.href = "Login.html";
    }
});
