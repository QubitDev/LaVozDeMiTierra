const campc1 =document.getElementById('campoUno');
const cancelarEdi = document.getElementById('cancelButton');
const campc2 = document.getElementById('campoDos');
const conedorAll = document.getElementById('contenedor');


cancelarEdi.addEventListener('click',hideEdita);
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
                            <img src="${documento.data().imageURL}" width="120px" height="120px">
                        </button>
                    </div>
                    <div id="iconoUno">
                        <button class="deleteC" onclick ="genConfirmar('${documento.data().tipoAudio}')">
                             <i class="fas fa-trash-can fa-1x"></i>
                        </button> 
                        <button class="editC"  onclick ="editar('${documento.id}','${documento.data().titulo}','${documento.data().procedencia}',
                        '${documento.data().narrador}','${documento.data().musica}')">
                            <i class="fa-regular fa-pen-to-square fa-1x"></i>
                        </button>                       
                    </div> 
                    
                    <div class="contenidoUno" id="contenidoUno">
                        <p id="tituloAudio">Título del audio: ${documento.data().titulo}<p>
                        <p id="procedencia">Procedencia cultural: ${documento.data().procedencia}<p>
                        <p id="narrador">Nombre del narrador: ${documento.data().narrador}<p>
                        <p id="musica_fondo">Música de fondo: ${documento.data().musica}</p>
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
                            <img src="${documento.data().imageURL}" width="150px" height="150px">
                        </button>
                    </div>
                    <div id="iconoUno">
                        <button class="deleteC" onclick ="genConfirmar('${documento.data().tipoAudio}')">
                             <i class="fas fa-trash-can"></i>
                        </button> 
                        <button class="editC" onclick ="editar('${documento.id}','${documento.data().titulo}','${documento.data().procedencia}',
                        '${documento.data().narrador}','${documento.data().musica}')">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>                          
                    </div> 
                     
                    <div class="contenidoDos" id="contenidoDos">
                        <p id="tituloAudio">Título del audio: ${documento.data().titulo}<p>
                        <p id="procedencia">Procedencia cultural: ${documento.data().procedencia}<p>
                        <p id="narrador">Nombre del narrador: ${documento.data().narrador}<p>
                        <p id="musica_fondo">Música de fondo: ${documento.data().musica}</p>
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
 
    }
}
async function eliminar(id,cadena){
    await db.collection('audio').doc(id).delete();
    hideConfirma(cadena);
    window.location.reload();
}

function editar(id,titulo,procedenciaSE,narradorSE,muscia_fondoSE){
    document.getElementById('editarAll').style.display = 'block';   
    document.getElementById('editarAll').style.zIndex = '9999';   

    document.getElementById('titulo_audio').value = titulo;
    document.getElementById('procedenciaCul').value = procedenciaSE;
    document.getElementById('narradorE').value = narradorSE;
    document.getElementById('musicafondo').value = muscia_fondoSE;
    document.getElementById('pantalla').style.display = 'block';
    document.getElementById('pantalla').style.zIndex = '7';


    const subirAc =document.getElementById('submitButton');
    subirAc.onclick= async function(){
        const cambiar = db.collection('audio').doc(id);
        var tituloT = document.getElementById('titulo_audio').value;
        var procedenciaP = document.getElementById('procedenciaCul').value;
        var narradorN = document.getElementById('narradorE').value;
        var muscia_fondoM = document.getElementById('musicafondo').value;

        await cambiar.update({titulo: tituloT});
        await cambiar.update({procedencia: procedenciaP});
        await cambiar.update({narrador: narradorN});
        await cambiar.update({musica: muscia_fondoM});
        window.location.reload();

    }
    
}
function genConfirmar(cadena){

    if(cadena=="Cuento"){
        document.getElementById('confirmacion').style.display = 'block'; 
        document.getElementById('confirmacion').style.zIndex = '9998';
        document.getElementById('pantalla').style.display = 'block';
        document.getElementById('pantalla').style.zIndex = '7';
    }else{ 
        if(cadena=="Leyenda"){
            document.getElementById('confirmacionDos').style.display = 'block'; 
            document.getElementById('confirmacionDos').style.zIndex = '9998';
            document.getElementById('pantalla').style.display = 'block';
            document.getElementById('pantalla').style.zIndex = '7';
        }
    }
}

function hideConfirma(cadena){ 
    if(cadena=="Cuento"){
        document.getElementById('confirmacion').style.display = 'none';
        document.getElementById('confirmacion').style.zIndex = '10';

    }   
    else{
        if(cadena=="Leyenda"){
            document.getElementById('confirmacionDos').style.display = 'none';
            document.getElementById('confirmacionDos').style.zIndex = '10';


        }   
    }
    document.getElementById('pantalla').style.display = 'none';
    document.getElementById('pantalla').style.zIndex = '0';

}

function hideEdita(){
    document.getElementById('editarAll').style.display = 'none';
    document.getElementById('editarAll').style.zIndex = '';   

    document.getElementById('pantalla').style.display = 'none';
    document.getElementById('pantalla').style.zIndex = '0';

}

function enviar(doc) {
    window.location.href = `./../pages/html/reproduccirAdm.html?doc=${doc}`;
}
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


function validateInput(inputElement) {
    const inputValue = inputElement.value.trim(); // Eliminar espacios en blanco al principio y al final
    const placeholderText = inputElement.getAttribute("placeholder");
  
    if (!inputValue) {
      // // El campo está vacío después de eliminar espacios en blanco
      // onMessagePopup(`❌¡Error!\nFaltan Datos.`, 450);
      inputElement.value = '';
      return;
    }
  
    // Comprueba si el primer carácter es una letra
    if (!/^[a-zA-Z]/.test(inputValue)) {
      onMessagePopup(`❌¡Error!\nNo puede contener caracteres especiales.`, 450);
      inputElement.value = '';
      return;
    }
  
      // Comprueba si el valor contiene números
      if (/\d/.test(inputValue)) {
        onMessagePopup(`❌¡Error!\n${placeholderText} no puede contener números.`, 450);
        inputElement.value = '';
        return;
      }
  
    // Comprueba si el valor contiene caracteres no válidos después de eliminar un carácter
    /*if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
      onMessagePopup(`❌¡Error!\nNo puede contener caracteres especiales.`, 450);
      inputElement.value = '';
      return;
    }*/
  }