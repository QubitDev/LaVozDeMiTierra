
db.collection('audio').onSnapshot((snapshot) => {
    cargarDocumentoCuento(snapshot.docs);
});

const cargarDocumentoCuento = (documentos) => {
    const contenedorCards = document.getElementById('card');
    if (documentos.length > 0) {
        
        documentos.forEach(documento => {
            if (documento.data().tipoAudio == "Cuento" && contenedorCards !== null) {
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


const cargarDocumentoLeyenda = (documentos) => {
    const contenedorCards1 = document.getElementById('card1');
    if (documentos.length > 0) {
        
        documentos.forEach(documento => {
            if (documento.data().tipoAudio == "Leyenda" && contenedorCards1 !== null) {
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
  const data = [doc, user]
  const encodedArray = data.map(item => encodeURIComponent(item)).join(",");
  window.location.href = `./html/reproducir.html?data=${encodedArray}`;
}

