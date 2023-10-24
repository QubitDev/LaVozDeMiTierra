// const contenedorSearch = document.getElementById("coincident__container");
// const searchInput = document.getElementById("search");

// db.collection('audio').onSnapshot((snapshot) => {
//     //console.log(snapshot.docs[0].data());
//     documentos = snapshot.docs;
//     // cargarDocumentos(snapshot.docs);

        
//     searchInput.addEventListener('input', () => {
//         const searchTerm = searchInput.value.trim().toLowerCase();
//         const filteredDocumentos = documentos.filter(documento => {
//             const titulo = documento.data().titulo.toLowerCase();
//             const procedencia = documento.data().procedencia.toLowerCase();
//             const narrador = documento.data().narrador.toLowerCase();
//             const duracion = documento.data().duracion.toLowerCase();
//             return (
//                 titulo.includes(searchTerm) ||
//                 procedencia.includes(searchTerm) ||
//                 narrador.includes(searchTerm) ||
//                 duracion.includes(searchTerm)
//             );
//         });

//         cargarDocumentos(filteredDocumentos);
//     });
// });

// // searchInput.addEventListener('input', () => {
// //     const searchTerm = searchInput.value.trim().toLowerCase();
// //     const filteredDocumentos = documentos.filter(documento => {
// //         const titulo = documento.data().titulo.toLowerCase();
// //         const procedencia = documento.data().procedencia.toLowerCase();
// //         const narrador = documento.data().narrador.toLowerCase();
// //         const duracion = documento.data().duracion.toLowerCase();
// //         return (
// //             titulo.includes(searchTerm) ||
// //             procedencia.includes(searchTerm) ||
// //             narrador.includes(searchTerm) ||
// //             duracion.includes(searchTerm)
// //         );
// //     });
// //     cargarDocumentos(filteredDocumentos);
// // });

// const cargarDocumentos = (documentos) => {
//     contenedorSearch.innerHTML = '';

//     if (documentos.length > 0) {
//         documentos.forEach(documento => {
//             contenedorSearch.innerHTML += `
//                 <div class="card">
//                     <figure class="image"><img src="./../../../assets/images/CuentoDos.jpg" width="60px" height="70px"></figure>
//                     <p class="card__c" id="titulo">${documento.data().titulo}</p>
//                     <p class="card__c" id="Cultura">${documento.data().procedencia}</p>
//                     <p class="card__c" id="narrador">${documento.data().narrador}</p>
//                     <p class="card__c" id="duracion">${documento.data().duracion}</p>
//                 </div>
//             `;
//         });
//     } else {
//         contenedorSearch.innerHTML = 'No se encontraron resultados.';
//     }
// }

const contenedorSearch = document.getElementById("coincident__container");
const searchInput = document.getElementById("search");

let documentos = []; // Almacena todos los documentos

db.collection('audio').onSnapshot((snapshot) => {
    documentos = snapshot.docs;
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    
    // Verificar si el término de búsqueda contiene números o caracteres especiales
    if (/[\d~`!@#$%\^&*+=\[\]\\';,/{}|\\":<>\?()\._]/.test(searchTerm)) {
        mostrarError("El término de búsqueda contiene números o caracteres especiales.");
    } else {
        const filteredDocumentos = documentos.filter(documento => {
            const searchTermLowerCase = searchTerm.toLowerCase();
            const titulo = documento.data().titulo.toLowerCase();
            const procedencia = documento.data().procedencia.toLowerCase();
            const narrador = documento.data().narrador.toLowerCase();
            const duracion = documento.data().duracion.toLowerCase();
            return (
                titulo.includes(searchTermLowerCase) ||
                procedencia.includes(searchTermLowerCase) ||
                narrador.includes(searchTermLowerCase) ||
                duracion.includes(searchTermLowerCase)
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
                <div class="card">
                    <figure class="image"><img src="./../../../assets/images/CuentoDos.jpg" width="60px" height="70px"></figure>
                    <p class="card__c" id="titulo">${documento.data().titulo}</p>
                    <p class="card__c" id="Cultura">${documento.data().procedencia}</p>
                    <p class="card__c" id="narrador">${documento.data().narrador}</p>
                    <p class="card__c" id="duracion">${documento.data().duracion}</p>
                </div>
            `;
        });
    } else {
        contenedorSearch.innerHTML = 'No se encontraron resultados.';
    }
}

function mostrarError(mensaje) {
    contenedorSearch.innerHTML = `<div class="error">${mensaje}</div>`;
}
const contenedorSearch = document.getElementById("coincident__container");
const searchInput = document.getElementById("search");

let documentos = []; // Almacena todos los documentos

db.collection('audio').onSnapshot((snapshot) => {
    documentos = snapshot.docs;
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredDocumentos = documentos.filter(documento => {
        const titulo = documento.data().titulo.toLowerCase();
        const procedencia = documento.data().procedencia.toLowerCase();
        const narrador = documento.data().narrador.toLowerCase();
        return (
            titulo.includes(searchTerm) ||
            procedencia.includes(searchTerm) ||
            narrador.includes(searchTerm)
        );
    });

    cargarDocumentos(filteredDocumentos);
});

const cargarDocumentos = (documentos) => {
    if (documentos.length > 0) {
        contenedorSearch.innerHTML = '';
        documentos.forEach(documento => {
            contenedorSearch.innerHTML += `
                <div class="card">
                    <figure class="image"><img src="./../../../assets/images/CuentoDos.jpg" width="60px" height="70px"></figure>
                    <p class="card__c" id="titulo">${documento.data().titulo}</p>
                    <p class="card__c" id="Cultura">${documento.data().procedencia}</p>
                    <p class="card__c" id="narrador">${documento.data().narrador}</p>
                    <p class="card__c" id="duracion">${documento.data().duracion}</p>
                </div>
            `;
        });
    } else {
        contenedorSearch.innerHTML = 'No se encontraron resultados.';
    }
}
