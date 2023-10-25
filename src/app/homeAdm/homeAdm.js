//import { deleteTaks } from "../../api/configuracion";
/*Actualizamos el contenido de la base de datos*/
const campc1 =document.getElementById('campoUno');
const deleteCs = document.querySelectorAll(".deleteC");
const eliminacion = document.getElementById('confirmacion')
const campc2 =document.getElementById('campoDos');


//boton1.addEventListener("click", hideConfirma);
for(let i = 0;i<deleteCs.length;i++){
    deleteCs[i].addEventListener('click',genConfirmar());
}

db.collection('audio').orderBy('titulo','asc').onSnapshot((snapshot) => {
    //console.log(snapshot.docs.id);
    cargarCuentos(snapshot.docs);
})
let i=0;
const cargarCuentos = (documentos) => {
    if (documentos.length > 0){  
        let llaves = new Array(documentos.length);      
        documentos.forEach(documento => {
            llaves[i] = documento.id;
            
            
            if(documento.data().tipoAudio == "Cuento"){                
                campc1.innerHTML += ` 
                <div class="campC1" id="campC1">
                    <div class="imageUno">
                        <button class="reproducirUno" onclick ="enviar('${documento.id}')">
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
                    <div id="confirmacion">
                        <h3 class="texto">Estas seguro de eliminar?</h3>
                        <button class="boton1" id="boton1" onclick ="hideConfirma()">Cancelar</button>
                        <button class='boton' id="campc1"  data-id="${documento.id}">Confirmar</button>
                    </div>
                    <div id="all"></div>

                    
                </div>
                
            `;           
            
            }else{
                campc2.innerHTML += ` 
                <div class="campL1" id="campL1" data-id="${documento.id}"> 
                    <div class="imageUno">
                        <button class="reproducirUno" onclick ="enviar('${documento.id}')">
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
                    <div id="confirmacion">
                        <h3 class="texto">Estas seguro de eliminar?</h3>
                        <button class="boton1" id="boton1" onclick ="hideConfirma()">Cancelar</button>
                        <button class='boton' id="campc1" data-id="${documento.id}" >Confirmar</button>
                    </div>
                    <div id="all"></div>

                    
                </div>
                
            `;
            
            }
            const eliminarCL = campc1.querySelectorAll('.boton'); 
            eliminarCL.forEach(btm =>{
            btm.addEventListener('click',(event)=>{
                hideConfirma();
             })
            })
            i++;

        });      
        console.log(llaves)

    }
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
function enviar(doc) {
    window.location.href = `./../pages/html/reproducir.html?doc=${doc}`;
}