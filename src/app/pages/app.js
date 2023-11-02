function showFile(file) {
    const contentMain = document.getElementById("app-content");
    fetch(`./html/${file}.html`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Error en la solicitud: ${response.status}`);
			}
			return response.text();
		})
		.then((data) => {
			contentMain.innerHTML = data;
            loadCSS(file);
            loadJS(file);
  
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
  

  