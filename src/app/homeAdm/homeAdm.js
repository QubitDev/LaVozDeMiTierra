
/*Actualizamos el contenido de la base de datos*/
const campc1 =document.getElementById('campoUno');
const deleteCs = document.querySelectorAll(".deleteC");
const boton1 = document.querySelector(".boton1");

boton1.addEventListener("click", hideConfirma);


db.collection('audio').onSnapshot((snapshot) => {
    console.log(snapshot.docs[0].data());
    cargarMaterial(snapshot.docs);
    cargarMaterialDos(snapshot.docs);
})

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

deleteCs.addEventListener("click",remover(documento.key));

function remover(KeyImagen){
    bd.child(KeyImagen).remove();
}
function genConfirmar(){
    document.getElementById('confirmacion').style.display = 'block'; 
    document.getElementById('confirmacion').style.zIndex = '9999';
    document.getElementById('all').style.display = 'block';
    document.getElementById('all').style.background = 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0, 0.5))';
}
function confirmar1(){
    genConfirmar();
    for(let i = 1;i<=8;i++){
        if(i != 1){
            document.getElementById('campc'+(i)).style.display = 'none';
        }else{
            document.getElementById('campc'+(i)).style.display = 'block';
        }
    }  
}
function hideConfirma(){    
    document.getElementById('confirmacion').style.display = 'none';
    document.getElementById('all').style.display = 'none';    
    document.getElementById('all').style.background = '';
    returnBack();
}
/*
const boton1 = document.querySelector(".boton1");
boton1.addEventListener("click", hideConfirma);
/**FALTA APLICAR PROCESO DE REFACTORING*/
/*const botones = document.querySelectorAll(".boton");
botones[0].addEventListener("click",deleteCampc1);
botones[1].addEventListener("click",deleteCampc2);
botones[2].addEventListener("click",deleteCampc3);
botones[3].addEventListener("click",deleteCampc4);
botones[4].addEventListener("click",deleteCampc5);
botones[5].addEventListener("click",deleteCampc6);
botones[6].addEventListener("click",deleteCampc7);
botones[7].addEventListener("click",deleteCampc8);


const deleteCs = document.querySelectorAll(".deleteC");
deleteCs[0].addEventListener("click",confirmar1);
deleteCs[1].addEventListener("click",confirmar2);	
deleteCs[2].addEventListener("click",confirmar3);
deleteCs[3].addEventListener("click",confirmar4);
deleteCs[4].addEventListener("click",confirmar6);
deleteCs[5].addEventListener("click",confirmar7);
deleteCs[6].addEventListener("click",confirmar7);
deleteCs[7].addEventListener("click",confirmar8);



function genConfirmar(){
    document.getElementById('confirmacion').style.display = 'block'; 
    document.getElementById('confirmacion').style.zIndex = '9999';
    document.getElementById('all').style.display = 'block';
    document.getElementById('all').style.background = 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0, 0.5))';
}
function confirmar1(){
    genConfirmar();
    for(let i = 1;i<=8;i++){
        if(i != 1){
            document.getElementById('campc'+(i)).style.display = 'none';
        }else{
            document.getElementById('campc'+(i)).style.display = 'block';
        }
    }  
}
function confirmar2(){
    genConfirmar();
    for(let i = 1;i<=8;i++){
        if(i != 2){
            document.getElementById('campc'+(i)).style.display = 'none';
        }else{
            document.getElementById('campc'+(i)).style.display = 'block';
        }
    }  
}
function confirmar3(){
    genConfirmar();
    for(let i = 1;i<=8;i++){
        if(i != 3){
            document.getElementById('campc'+(i)).style.display = 'none';
        }else{
            document.getElementById('campc'+(i)).style.display = 'block';
        }
    }  
}
function confirmar4(){
    genConfirmar();
    for(let i = 1;i<=8;i++){
        if(i != 4){
            document.getElementById('campc'+(i)).style.display = 'none';
        }else{
            document.getElementById('campc'+(i)).style.display = 'block';
        }
    }  
}
function confirmar5(){
    genConfirmar();
    for(let i = 1;i<=8;i++){
        if(i != 5){
            document.getElementById('campc'+(i)).style.display = 'none';
        }else{
            document.getElementById('campc'+(i)).style.display = 'block';
        }
    }  
}
function confirmar6(){
    genConfirmar();
    for(let i = 1;i<=8;i++){
        if(i != 6){
            document.getElementById('campc'+(i)).style.display = 'none';
        }else{
            document.getElementById('campc'+(i)).style.display = 'block';
        }
    }  
}
function confirmar7(){
    genConfirmar();
    for(let i = 1;i<=8;i++){
        if(i != 7){
            document.getElementById('campc'+(i)).style.display = 'none';
        }else{
            document.getElementById('campc'+(i)).style.display = 'block';
        }
    }  
}
function confirmar8(){
    genConfirmar();
    for(let i = 1;i<=8;i++){
        if(i != 8){
            document.getElementById('campc'+(i)).style.display = 'none';
        }else{
            document.getElementById('campc'+(i)).style.display = 'block';
        }
    }  
}
function hideConfirma(){    
    document.getElementById('confirmacion').style.display = 'none';
    document.getElementById('all').style.display = 'none';    
    document.getElementById('all').style.background = '';
    returnBack();
}

function cambioBack(){
    
}
function returnBack(){
    
}


function deleteCampc1(){
    document.getElementById('campC1').style.display = 'none';
    hideConfirma();       
}
function deleteCampc2(){
    document.getElementById('campC2').style.display = 'none';    
    hideConfirma();  
}  
function deleteCampc3(){
    document.getElementById('campC3').style.display = 'none';
    hideConfirma();
}
function deleteCampc4(){
    document.getElementById('campC4').style.display = 'none';
    hideConfirma();
}
function deleteCampc5(){
    document.getElementById('campL1').style.display = 'none';
    hideConfirma();
}
function deleteCampc6(){
    document.getElementById('campL2').style.display = 'none';
    hideConfirma();
}
function deleteCampc7(){
    document.getElementById('campL3').style.display = 'none';
    hideConfirma();
}
function deleteCampc8(){
    document.getElementById('campL4').style.display = 'none';
    hideConfirma();
}
*/



