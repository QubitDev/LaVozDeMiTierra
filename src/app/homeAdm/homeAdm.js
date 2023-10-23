
/*Actualizamos el contenido de la base de datos*/
const campc1 =document.getElementById('campoUno');
const deleteCs = document.querySelectorAll(".deleteC");
//const boton1 = document.querySelector(".boton1");
const eliminacion = document.getElementById('confirmacion')

//boton1.addEventListener("click", hideConfirma);


db.collection('audio').onSnapshot((snapshot) => {
    console.log(snapshot.docs[0].data());
    cargarMaterial(snapshot.docs);
    cargarMaterialDos(snapshot.docs);
    cargarEliminar(snapshot.docs);
})


var cityRef = db.collection('audio').doc('BJ');

// Remove the 'capital' field from the document
var removeCapital = cityRef.update({
    capital: firebase.firestore.FieldValue.delete()
});

const cargarEliminar = (documentos) => {
    if (documentos.length > 0){ 
        eliminacion.innerHTML +=`
        <button class="boton1" id="boton1" onclick ="hideConfirma()">Cancelar</button>

        `
        for(let i = 0; i<documentos.length;i++){
            eliminacion.innerHTML +=`
        <button class="boton" id="campc1" onclick ="hideConfirma()" data-id= "${documentos[i].id}">Confirmar</button>  `
        }   
    }
}
const cargarMaterial = (documentos) => {
    if (documentos.length > 0){        
        documentos.forEach(documento => {
            if(documento.data().tipoAudio == "Cuento"){                
                campc1.innerHTML += ` 
                <div class="campC1" id="campC1">
                    <div class="imageUno">
                        <button class="reproducirUno">
                            <img src="./../../assets/images/im.jpg" alt="Quechua"/>
                        </button>
                    </div>
                    <div id="iconoUno">
                        <button class="deleteC" onclick ="genConfirmar()">
                             <i class="fas fa-trash-can fa"></i>
                        </button>
                    </div> 
                    <div class="contenidoUno" id="contenidoUno">
                        <h3 id="tituloAudio">${documento.data().titulo}<h3>
                        <h3 id="procedencia">${documento.data().procedencia}<h3>
                        <h3 id="narrador">${documento.data().narrador}<h3>
                        <h3 id="musica_fondo">${documento.data().musica}</h3>
                    </div> 
                    
                </div>
                
            `;
             } 
                      
        });
    }
}
const campc2 =document.getElementById('campoDos');


const cargarMaterialDos = (documentosDos) => {
    if (documentosDos.length > 0){
        documentosDos.forEach(documento => {
            if(documento.data().tipoAudio == "Leyenda"){
                campc2.innerHTML += ` 
                <div class="campL1" id="campL1">           
                    <div class="imageUno">
                        <button class="reproducirUno">
                            <img src="./../../assets/images/im.jpg" alt="Quechua"/>
                        </button>
                    </div>
                    <div id="iconoUno">
                        <button class="deleteC" onclick ="genConfirmar()">
                            <i class="fas fa-trash-can fa"></i>
                        </button>
                    </div> 
                    <div class="contenidoUno" id="contenidoUno">
                        <h3 id="tituloAudio">${documento.data().titulo}<h3>
                        <h3 id="procedencia">${documento.data().procedencia}<h3>
                        <h3 id="narrador">${documento.data().narrador}<h3>
                        <h3 id="musica_fondo">${documento.data().musica}</h3>
                    </div>
                    
                </div>
                            
            `;
            }   
         
        });
    }
}


function remover(){
    FieldValue.delete();
    bd.child(KeyImagen).remove();
    hideConfirma();
}
function genConfirmar(){
    document.getElementById('confirmacion').style.display = 'block'; 
    document.getElementById('confirmacion').style.zIndex = '9999';
    document.getElementById('all').style.display = 'block';
    document.getElementById('all').style.background = 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0, 0.5))';
}

function hideConfirma(){    
    document.getElementById('confirmacion').style.display = 'none';
    document.getElementById('all').style.display = 'none';    
    document.getElementById('all').style.background = '';
}
