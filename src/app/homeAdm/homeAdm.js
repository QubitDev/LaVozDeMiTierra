

const boton1 = document.querySelector(".boton1");
boton1.addEventListener("click", hideConfirma);
/**FALTA APLICAR PROCESO DE REFACTORING*/
const botones = document.querySelectorAll(".boton");
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


const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("doc");
const docIdHome = urlParams.get("docHome");

console.log("id:: ",docId);

const tipo = document.getElementById("tipo__audio");
const  titulo = document.getElementById("titulo__audio");
const narradorAudio = document.getElementById("narrador");
const musicaF = document.getElementById("musica");
const audioElement = document.getElementById("audioE");

db.collection("audio").doc(docId).get().then((doc) => {
  if (doc.exists) {
      const data = doc.data();
      tipo.innerText = data.tipoAudio;
      titulo.innerText = data.titulo;
      narradorAudio.innerText = `Narrado por: ${data.narrador}`;
      musicaF.innerText = `Música de Fondo: ${data.musica}`;
      

      textURL.URLt = data.textURL;
      
      console.log("url: ",textURL);
      
      audioElement.src = data.audioURL;

  } else {
      console.log("No se encontró el documento en Firestore.");
  }
}).catch((error) => {
  console.error("Error al obtener el documento:", error);
});



