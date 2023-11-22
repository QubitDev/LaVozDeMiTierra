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

/* --------------------- la lista de los favoritos ----------------------------------------------------*/ 
db.collection('audio').onSnapshot((snapshot) => {
    cargarDocumentoCuento(snapshot.docs);
});

const cargarDocumentoCuento = (documentos) => {
    const contenedorCards = document.getElementById('card');
    if (documentos.length > 0) {
        
        documentos.forEach(documento => {
            contenedorCards.innerHTML += `
                <div class="contenedora">
                    <div class="contenedor_div">
                      <img src="${documento.data().imageURL}">
                    </div>
            
                    <div class="contenedor_div">
                       <h2>${documento.data().titulo}</h2>
                    </div>
                    <div class="contenedor_div">
                        <h2>${documento.data().procedencia}</h2>
                    </div>
                    <div class="contenedor_div">
                       <h2>${documento.data().narrador}</h2>
                    </div>
                    <div class="contenedor_div">
                       <h2>${documento.data().duracion}</h2>
                    </div>
                    <div class="contenedor_div">
                       <h2>♥️</h2>
                    </div>
                </div>
            
                `;
            if (/*documento.data().tipoAudio == "Cuento" && */ contenedorCards !== null) {
                
            }
        });

    }
}