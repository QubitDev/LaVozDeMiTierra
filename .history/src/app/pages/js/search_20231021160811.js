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

// function highlightMatch(text, term) {
//     const regex = new RegExp(`(${term})`, 'gi');
//     return text.replace(regex, '<span class="highlighted">$1</span>');
// }


const contenedorSearch = document.getElementById("coincident__container");
const searchInput = document.getElementById("search");

db.collection('audio').onSnapshot((snapshot) => {
    documentos = snapshot.docs;
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredDocumentos = documentos.filter(documento => {
            const titulo = documento.data().titulo.toLowerCase();
            const procedencia = documento.data().procedencia.toLowerCase();
            const narrador = documento.data().narrador.toLowerCase();
            const duracion = documento.data().duracion.toLowerCase();
            return (
                titulo.includes(searchTerm) ||
                procedencia.includes(searchTerm) ||
                narrador.includes(searchTerm) ||
                duracion.includes(searchTerm)
            );
        });

        cargarDocumentos(filteredDocumentos, searchTerm);
    });
});

const cargarDocumentos = (documentos, searchTerm) => {
    contenedorSearch.innerHTML = '';

    if (documentos.length > 0) {
        documentos.forEach(documento => {
            const titulo = highlightMatch(documento.data().titulo, searchTerm);
            const procedencia = highlightMatch(documento.data().procedencia, searchTerm);
            const narrador = highlightMatch(documento.data().narrador, searchTerm);
            const duracion = highlightMatch(documento.data().duracion, searchTerm);

            contenedorSearch.innerHTML += `
                <div class="card">
                    <figure class="image"><img src="./../../../assets/images/CuentoDos.jpg" width="60px" height="70px"></figure>
                    <p class="card__c" id="titulo">${titulo}</p>
                    <p class="card__c" id="Cultura">${procedencia}</p>
                    <p class="card__c" id="narrador">${narrador}</p>
                    <p class="card__c" id="duracion">${duracion}</p>
                </div>
            `;
        });
    } else {
        contenedorSearch.innerHTML = 'No se encontraron resultados.';
    }
}

function highlightMatch(text, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="highlighted">$1</span>');
}
