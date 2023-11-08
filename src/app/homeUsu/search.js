
const contenedorSearch = document.getElementById("coincident__container");
const searchInput = document.getElementById("search");
let isContainerVisible = false;

let documentos = [];

db.collection('audio').onSnapshot((snapshot) => {
    documentos = snapshot.docs;
});


searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        contenedorSearch.innerHTML = "";
    } else if (contieneCaracteresNoDeseados(searchTerm)) {
        contenedorSearch.innerHTML = `<div class="mensaje-error">
            <p>No se permiten números ni caracteres especiales en el término de búsqueda.</p> 
        </div>`;
        limpiarInput(searchInput);
    } else {
        const searchTermLowerCase = searchTerm.toLowerCase();
        const filteredDocumentos = documentos.filter(documento => {
            const titulo = documento.data().titulo.toLowerCase();
            const procedencia = documento.data().procedencia.toLowerCase();
            const narrador = documento.data().narrador.toLowerCase();

            return (
                titulo.includes(searchTermLowerCase) ||
                procedencia.includes(searchTermLowerCase) ||
                narrador.includes(searchTermLowerCase)
            );
        });
        cargarDocumentosSearch(filteredDocumentos);
    }
});


function resaltar(textoOriginal, searchTerm) {

    const regex = new RegExp(searchTerm, 'gi');
  
    return textoOriginal.replace(regex, coincidencia => {
      return `<span class="resaltado">${coincidencia}</span>`;
    });
  
}


const cargarDocumentosSearch = (documentos) => {
    const searchTerm = searchInput.value.trim();
    if (documentos.length > 0) {
        contenedorSearch.innerHTML = '';
        documentos.forEach(documento => {
            const tituloTexto = resaltar(documento.data().titulo, searchTerm);
             

            const procedenciaTexto = resaltar(documento.data().procedencia, searchTerm);
            
            const narradorTexto = resaltar(documento.data().narrador, searchTerm);

            contenedorSearch.innerHTML += `
                <div class="card__s" id="card__s" onClick="enviarDeSearch('${documento.id}')">
                    <figure class="image"><img src="${documento.data().imageURL}" width="60px" height="70px"></figure>
                    <p class="card__c" id="titulo">${tituloTexto}</p>
                    <p class="card__c" id="Cultura">${procedenciaTexto}</p>
                    <p class="card__c" id="narrador">${narradorTexto}</p>
                    <p class="card__c" id="duracion">${documento.data().duracion}</p>
                </div>
            `;  
        });
        
    } else {
        contenedorSearch.innerHTML =  `<div class="mensaje-error">
            <p> No se encontraron resultados.</p> 
        </div>`;
    }
}

function contieneCaracteresNoDeseados(texto) {
    return /[\d~!@#$%\^&*+-=\[\]\\'´``;,/{}|\\":<>\?()\._]/.test(texto);
}

function limpiarInput(inputElement) {
    inputElement.value = '';
}

function enviarDeSearch(id){
    window.location.href=`./../pages/html/reproducir.html?doc=${id}`;   
    inputElement.value = '';
    contenedorSearch.innerHTML = "";
}


function mostrarBuscar() {
    console.log("Clic en Buscar");
    const container_search = document.querySelector('.container__search');

    if (isContainerVisible) {
        container_search.classList.remove('show-container');
        limpiarInput(searchInput);
    } else {
        container_search.classList.add('show-container');
    }
    isContainerVisible = !isContainerVisible;
}


