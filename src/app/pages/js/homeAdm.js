const campc1 =document.getElementById('campoUno');
const eliminacion = document.getElementById('confirmacion');
const cancelarEdi = document.getElementById('cancelBtn');
const eliminacionDos = document.getElementById('confirmacionDos');
const campc2 =document.getElementById('campoDos');
const contenedorAll = document.getElementById('contenedor');





const cargarCuentos = (documentos) => {

    if (documentos.length > 0){  
        
        documentos.forEach(documento => {
            
            if(documento.data().tipoAudio == "Cuento"){                
                if (campc1 !== null) {
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
                                <button class="editC"  onclick ="editar('${documento.id}','${documento.data().titulo}','${documento.data().procedencia}',
                                '${documento.data().narrador}','${documento.data().musica}')">
                                    <i class="fa-regular fa-pen-to-square"></i>
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
                }
            }else{
                if (campc2 !== null) {
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
                                <button class="editC" onclick ="editar('${documento.id}','${documento.data().titulo}','${documento.data().procedencia}',
                                '${documento.data().narrador}','${documento.data().musica}')">
                                    <i class="fa-regular fa-pen-to-square"></i>
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
            }           
        }); 

        if (contenedorAll !== null) {
            contenedorAll.innerHTML += `
            <div id="all"></div> 
        `;    
        }
    }
}
function eliminar(id,cadena){
    db.collection("audio").doc(id).delete();
    hideConfirma(cadena);
    window.location.href("homeAdm.html");
}

function editar(id,titulo,procedenciaSE,narradorSE,muscia_fondoSE){
    document.getElementById('editarAll').style.display = 'block';
    document.getElementById('all').style.display = 'block';
    document.getElementById('all').style.background = 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0, 0.5))';
    
    document.getElementById('titulo_audio').value = titulo;
    document.getElementById('procedenciaCul').value = procedenciaSE;
    document.getElementById('narradorE').value = narradorSE;
    document.getElementById('musicafondo').value = muscia_fondoSE;

    const subirAc =document.getElementById('submitBtn');
    subirAc.onclick=function(){
        var cambio = db.collection('audio').doc(id);
        var tituloT = document.getElementById('titulo_audio').value;
        var procedenciaP = document.getElementById('procedenciaCul').value;
        var narradorN = document.getElementById('narradorE').value;
        var muscia_fondoM = document.getElementById('musicafondo').value;
        return cambio.update({
        titulo: tituloT,
        procedencia: procedenciaP,
        narrador: narradorN,
        muscia_fondo: muscia_fondoM
    })
    
    }
    
}
function genConfirmar(cadena){
    if(cadena=="Cuento"){
        document.getElementById('confirmacion').style.display = 'block'; 
        document.getElementById('confirmacion').style.zIndex = '9999';
    }else
    {
        if(cadena=="Leyenda"){
            document.getElementById('confirmacionDos').style.display = 'block'; 
            document.getElementById('confirmacionDos').style.zIndex = '9999';
        }
        
    }
   
    document.getElementById('all').style.display = 'block';
    document.getElementById('all').style.background = 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0, 0.5))';
}

function hideConfirma(cadena){ 
    if(cadena=="Cuento"){
        document.getElementById('confirmacion').style.display = 'none';
        document.getElementById('confirmacion').style.zIndex = '0';

    }   
    else{
        document.getElementById('confirmacionDos').style.display = 'none';
        document.getElementById('confirmacionDos').style.zIndex = '0';


    }
    document.getElementById('all').style.display = 'none';    
    document.getElementById('all').style.background = '';
    document.getElementById('all').style.zIndex = '0';

    
}
function hideEdita(){
    document.getElementById('editarAll').style.display = 'none';
    document.getElementById('all').style.display = 'none';    
    document.getElementById('all').style.background = '';

}
function enviar(doc) {
    window.location.href = `./html/reproducir.html?doc=${doc}`;
}

if (cancelarEdi !== null) {
    cancelarEdi.addEventListener('click',hideEdita);
}


db.collection('audio').orderBy('titulo', 'asc').onSnapshot((snapshot) => {
    cargarCuentos(snapshot.docs);
});


