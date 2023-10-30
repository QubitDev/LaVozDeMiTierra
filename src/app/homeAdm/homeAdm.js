const campc1 =document.getElementById('campoUno');
const deleteCs = document.querySelectorAll(".deleteC");
const eliminacion = document.getElementById('confirmacion')

const eliminacionDos = document.getElementById('confirmacionDos');
const campc2 =document.getElementById('campoDos');
const conedorAll = document.getElementById('contenedor');
const endSesion = document.querySelector(".sesion");
endSesion.addEventListener('click',cerrarSesion);

for(let i = 0;i<deleteCs.length;i++){
    deleteCs[i].addEventListener('click',genConfirmar());
}


db.collection('audio').orderBy('titulo','asc').onSnapshot((snapshot) => {
    cargarCuentos(snapshot.docs);
})
const cargarCuentos = (documentos) => {
    if (documentos.length > 0){  
        
        documentos.forEach(documento => {
            
            if(documento.data().tipoAudio == "Cuento"){                
                campc1.innerHTML += ` 
                <div class="campC1" id="campC1">                
                    <div class="imageUno">
                        <button class="reproducirUno" onclick ="enviar('${documento.id}')">
                            <img src="${documento.data().imageURL}" width="90px" height="90px">
                        </button>
                    </div>
                    <div id="iconoUno">
                        <button class="deleteC" onclick ="genConfirmar('${documento.data().tipoAudio}')">
                             <i class="fas fa-trash-can fa"></i>
                        </button>
                    </div> 
                    <div class="contenidoUno" id="contenidoUno">
                        <p id="tituloAudio">${documento.data().titulo}<p>
                        <p id="procedencia">${documento.data().procedencia}<p>
                        <p id="narrador">${documento.data().narrador}<p>
                        <p id="musica_fondo">${documento.data().musica}</p>
                    </div> 
                    <div id="confirmacion">
                        <h3 class="texto">Estas seguro de eliminar?</h3>
                        <button class="boton1" id="boton1" onclick ="hideConfirma('${documento.data().tipoAudio}')">Cancelar</button>
                        <button class='boton' id="campc1" onclick ="eliminar('${documento.id}','${documento.data().tipoAudio}')">Confirmar</button>
                    </div>
                </div>
                
            `;           
            
            }else{
                campc2.innerHTML += ` 
                <div class="campL1" id="campL1"> 
                    <div class="imageDos">
                        <button class="reproducirDos" onclick ="enviar('${documento.id}')">
                            <img src="${documento.data().imageURL}" width="90px" height="90px">
                        </button>
                    </div>
                    <div id="iconoUno">
                        <button class="deleteC" onclick ="genConfirmar('${documento.data().tipoAudio}')">
                             <i class="fas fa-trash-can fa"></i>
                        </button>
                    </div> 
                    <div class="contenidoDos" id="contenidoDos">
                        <p id="tituloAudio">${documento.data().titulo}<p>
                        <p id="procedencia">${documento.data().procedencia}<p>
                        <p id="narrador">${documento.data().narrador}<p>
                        <p id="musica_fondo">${documento.data().musica}</p>
                    </div> 
                    <div id="confirmacionDos">
                        <h3 class="texto">Estas seguro de eliminar?</h3>
                        <button class="boton2" id="boton2" onclick ="hideConfirma('${documento.data().tipoAudio}')">Cancelar</button>
                        <button class='botonDos' id="campc2" onclick ="eliminar('${documento.id}','${documento.data().tipoAudio}')" >Confirmar</button>
                    </div>
                </div>                
            `;            
            }           
        }); 

        conedorAll.innerHTML += `
            <div id="all"></div> 
        `; 
    }
}
function eliminar(id,cadena){
    db.collection("audio").doc(id).delete();
    hideConfirma(cadena);
}

function editar(id){
    var cambio = db.collection("audio").doc(id);
    return cambio.update({
        titulo: nombre,
        procedencia: quechua,
        narrador: alberto,
        muscia_fondo: violin,
        tipoAudio:leyenda
    })
}




function genConfirmar(cadena){
    if(cadena=="Cuento"){
        document.getElementById('confirmacion').style.display = 'block'; 
        document.getElementById('confirmacion').style.zIndex = '9999';
    }else
    {
        document.getElementById('confirmacionDos').style.display = 'block'; 
        document.getElementById('confirmacionDos').style.zIndex = '9999';
    }
   
    document.getElementById('all').style.display = 'block';
    document.getElementById('all').style.background = 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0, 0.5))';
}

function hideConfirma(cadena){ 
    if(cadena=="Cuento"){
        document.getElementById('confirmacion').style.display = 'none';
    }   
    else{
        document.getElementById('confirmacionDos').style.display = 'none';

    }
    document.getElementById('all').style.display = 'none';    
    document.getElementById('all').style.background = '';
    document.getElementById('all').style.zIndex = '0';

    
}
function enviar(doc) {
    window.location.href = `./../pages/html/reproducir.html?doc=${doc}`;
}

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