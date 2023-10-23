

const cargarDocumentos = (documentos) => {
    if (documentos.length > 0) {
        ultimoDoc = documentos[documentos.length - 1];
        primerDoc = documentos[0];

        contenedorCards.innerHTML = '';

        documentos.forEach(documento => {
            //iddoc1.doc1 = documento.data().id;
            contenedorCards.innerHTML += `
                
            <div class="card">
                <figure class="image"><img src="./../../../assets/images/CuentoDos.jpg" width="60px" height="70px"></figure>
                <p class="card__c" id="titulo">${</p>
                <p class="card__c" id="Cultura">Procedencia Cultural</p>
                <p class="card__c" id="narrador">Narrado por</p>
                <p class="card__c" id="duracion">duracion</p>
            </div>
            `;
        });
    }
}








