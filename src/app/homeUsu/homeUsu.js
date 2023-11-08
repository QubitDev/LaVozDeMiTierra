const contenedorCards = document.getElementById('card');
const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');
const endSesion = document.querySelector(".sesion");
endSesion.addEventListener('click',cerrarSesion);

db.collection('audio').onSnapshot((snapshot) => {
    cargarDocumentoCuento(snapshot.docs);
});

const iddoc = {};

const cargarDocumentoCuento = (documentos) => {
    if (documentos.length > 0) {
        
        documentos.forEach(documento => {
            if (documento.data().tipoAudio == "Cuento") {
                contenedorCards.innerHTML += `
            <div class="carta" id="carta" onClick="enviar('${documento.id}')">
                <figure>
					<img src="${documento.data().imageURL}"
						alt="La-leyenda-de-la-quinua-y-la-sal">
				</figure>
			
				<div class="contenido-card">
					<h3>${documento.data().titulo}</h3>
					<p>${documento.data().musica}</p>

				</div>

            </div>
            `;
            }

        });

    }
}
db.collection('audio').onSnapshot((snapshot) => {

    cargarDocumentoLeyenda(snapshot.docs);
});
const contenedorCards1 = document.getElementById('card1');
const cargarDocumentoLeyenda = (documentos) => {
    if (documentos.length > 0) {
        
        documentos.forEach(documento => {
            if (documento.data().tipoAudio == "Leyenda") {
                contenedorCards1.innerHTML += `
            <div class="carta" id="carta" onClick="enviar('${documento.id}')">
                <figure>
			<img src="${documento.data().imageURL}"
				alt="La-leyenda-de-la-quinua-y-la-sal">
		</figure>
		<div class="contenido-card">
			<h3>${documento.data().titulo}</h3>
			<p>${documento.data().musica}</p>
		</div>
            </div>
            `;
           }
        });
    }
}


function enviar(doc) {
    window.location.href = `./../pages/html/reproducir.html?doc=${doc}`;
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
  //**/////////////////////////////////////// */



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