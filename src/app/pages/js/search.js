

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








