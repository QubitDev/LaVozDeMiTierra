
const contenedorSearch = document.getElementById("coincident__container");
const searchInput = document.getElementById("search");
let isContainerVisible = false;

let documentos = []; // Almacena todos los 

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
        cargarDocumentos(filteredDocumentos);
    }
});

const cargarDocumentos = (documentos) => {
    if (documentos.length > 0) {
        contenedorSearch.innerHTML = '';
        documentos.forEach(documento => {
            contenedorSearch.innerHTML += `
                <div class="card" id="card" onClick="enviar('${documento.id}')">
                    <figure class="image"><img src="./../../../assets/images/CuentoDos.jpg" width="60px" height="70px"></figure>
                    <p class="card__c" id="titulo">${documento.data().titulo}</p>
                    <p class="card__c" id="Cultura">${documento.data().procedencia}</p>
                    <p class="card__c" id="narrador">${documento.data().narrador}</p>
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

function enviar(id){
    window.location.href=`./../html/reproducir.html?doc=${id}`;   
    inputElement.value = '';
    contenedorSearch.innerHTML = "";
}




// function mostrarBuscar() {
//     console.log("Clic en Buscar");
//   if (isContainerVisible) {
//     // Ocultar el contenedor con un efecto de deslizamiento hacia arriba
//     container_search.style.transform = 'translateY(-100%)';
//   } else {
//     // Mostrar el contenedor con un efecto de deslizamiento hacia abajo
//     container_search.style.transform = 'translateY(0)';
//   }
//   isContainerVisible = !isContainerVisible;
// }


function mostrarBuscar() {
    console.log("Clic en Buscar");
    const container_search = document.querySelector('.container__search');

    if (isContainerVisible) {
        // Ocultar el contenedor con un efecto de deslizamiento hacia arriba
        container_search.style.display = 'none'; 
        container_search.style.height = '0';
    } else {
        // Mostrar el contenedor con un efecto de deslizamiento hacia abajo
        container_search.style.display = 'block'; 
        container_search.style.transform = 'translateY(0)';
        // Cambia 'block' para mostrar
    }
    if (isContainerVisible) {
        // Ocultar el contenedor con un efecto de cortina hacia arriba
        
    } else {
        // Mostrar el contenedor con un efecto de cortina hacia abajo
       // Ajusta la altura deseada
    }
    isContainerVisible = !isContainerVisible;
}
