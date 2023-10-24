
const contenedorSearch = document.getElementById("coincident__container");
const searchInput = document.getElementById("search");
const card = document.getElementById("card");

let documentos = []; // Almacena todos los 

db.collection('audio').onSnapshot((snapshot) => {
    documentos = snapshot.docs;
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        contenedorSearch.innerHTML = "";
    } else if (contieneCaracteresNoDeseados(searchTerm)) {
        mostrarError("No se permiten números ni caracteres especiales en el término de búsqueda.");
        limpiarInput(searchInput);
    } else {
        // Convierte el término de búsqueda en minúsculas
        const searchTermLowerCase = searchTerm.toLowerCase();

        // Filtra documentos que contienen el término de búsqueda
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

        cargarDocumentos(filteredDocumentos);
    }
});


// searchInput.addEventListener('input', () => {
//     const searchTerm = searchInput.value.trim();
    
//     if (searchTerm === '') {
//         contenedorSearch.innerHTML = "";
//     } else if (contieneCaracteresNoDeseados(searchTerm)) {
//         mostrarError("No se permiten números ni caracteres especiales en el término de búsqueda.");
//         limpiarInput(searchInput);
//     } else {
//         const searchTermLowerCase = searchTerm.toLowerCase();
//         const filteredDocumentos = documentos.filter(documento => {
//             const titulo = documento.data().titulo.toLowerCase();
//             const procedencia = documento.data().procedencia.toLowerCase();
//             const narrador = documento.data().narrador.toLowerCase();
//             return (
//                 titulo.includes(searchTermLowerCase) ||
//                 procedencia.includes(searchTermLowerCase) ||
//                 narrador.includes(searchTermLowerCase)
//             );
//         });
//         cargarDocumentos(filteredDocumentos);
//     }
// });

const cargarDocumentos = (documentos) => {
    if (documentos.length > 0) {
        contenedorSearch.innerHTML = '';
        documentos.forEach(documento => {
            contenedorSearch.innerHTML += `
                <div class="card" id="card" onClick="enviar()">
                    <figure class="image"><img src="./../../../assets/images/CuentoDos.jpg" width="60px" height="70px"></figure>
                    <p class="card__c" id="titulo">${documento.data().titulo}</p>
                    <p id="id__doc" style="display: none;">${documento.id}</p>
                    <p class="card__c" id="Cultura">${documento.data().procedencia}</p>
                    <p class="card__c" id="narrador">${documento.data().narrador}</p>
                    <p class="card__c" id="duracion">${documento.data().duracion}</p>
                </div>
            `;
        });
        const iddoc = document.getElementById("id__doc").value;
        console.log("id==> ", iddoc);
    } else {
        contenedorSearch.innerHTML = 'No se encontraron resultados.';
    }
}

function contieneCaracteresNoDeseados(texto) {
    return /[\d~!@#$%\^&*+=\[\]\\';,/{}|\\":<>\?()\._]/.test(texto);
}

function mostrarError(mensaje) {
    contenedorSearch.innerHTML = `<div class="error">${mensaje}</div>`;
}

function limpiarInput(inputElement) {
    inputElement.value = '';
    contenedorSearch.innerHTML = "";
}



function enviar(){
    window.location.href="./../html/reproducir.html";   
    inputElement.value = '';
    contenedorSearch.innerHTML = "";
}


