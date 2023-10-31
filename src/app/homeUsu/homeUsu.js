const contenedorCards = document.getElementById('card');
const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');

let ultimoDoc = null;
let primerDoc = null;
db.collection('audio').onSnapshot((snapshot) => {

    cargarDocumentoCuento(snapshot.docs);
});

const iddoc = {};
const cargarDocumentoCuento = (documentos) => {
    if (documentos.length > 0) {
        // ultimoDoc = documentos[documentos.length - 1];
        // primerDoc = documentos[0];

        // contenedorCards.innerHTML = '';

        documentos.forEach(documento => {
            if (documento.data().tipoAudio == "Cuento") {
                contenedorCards.innerHTML += `
            <div class="carta" id="carta" onClick="enviar('${documento.id}')">
                <figure>
                <img src="${documento.data().imageURL}" width="60px" height="70px">
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
// leyenda
const contenedorCards1 = document.getElementById('card1');
const cargarDocumentoLeyenda = (documentos) => {
    if (documentos.length > 0) {
        // ultimoDoc = documentos[documentos.length - 1];
        // primerDoc = documentos[0];

        // contenedorCards1.innerHTML = '';

        documentos.forEach(documento => {
            if (documento.data().tipoAudio == "Leyenda") {
                contenedorCards1.innerHTML += `
            <div class="carta" id="carta" onClick="enviar('${documento.id}')">
                <figure>
                     <img src="${documento.data().imageURL}" width="90px" height="90px">
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

botonSiguiente.addEventListener('click', () => {
    db
        .collection('audio')
        // .orderBy('numero', 'asc')
        .limit(4)
        .startAfter(ultimoDoc)
        .onSnapshot((snapshot) => {
            cargarDocumentos(snapshot.docs);
        }
        );
});

botonAnterior.addEventListener('click', () => {
    db
        .collection('audio')
        // .orderBy('numero', 'desc')
        .limit(4)
        .startAfter(primerDoc)
        .onSnapshot((snapshot) => {
            // // const documentos = snapshot.docs.reverse();
            // cargarDocumentos(documentos);
            cargarDocumentos(snapshot.docs);
        }
        );
});

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