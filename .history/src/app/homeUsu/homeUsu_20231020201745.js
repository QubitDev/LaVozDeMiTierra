const contenedorCards = document.getElementById('card');
const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');

let ultimoDoc = null;
let primerDoc = null;




db.collection('audio').onSnapshot((snapshot) => {
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
                
                <figure>
					<img src="./../../assets/images/CuentoUno.jpg"
						alt="La-leyenda-de-la-quinua-y-la-sal">
				</figure>
				
					<button >
						<span class="text">▷</span>
					</button>
				
				<div class="contenido-card">
					<h3>${documento.data().titulo}</h3>
					<p>${documento.data().musica}</p>


				</div>
            `;
        });
    }
}

function enviar(doc) {
    window.location.href = `./../pages/html/reproducir.html?iddoc=${doc}`;
}
/*
botonSiguiente.addEventListener('click', () => {
    db
        .collection('audio')
        .orderBy('numero', 'asc')
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
        .orderBy('numero', 'desc')
        .limit(4)
        .startAfter(primerDoc)
        .onSnapshot((snapshot) => {
            const documentos = snapshot.docs.reverse();
            cargarDocumentos(documentos);
        }
        );
});*/