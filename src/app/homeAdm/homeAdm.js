const boton1 = document.querySelector(".boton1");
boton1.addEventListener("click", hideConfirma);

const botones = document.querySelector(".boton");
botones.addEventListener("click",deleteCampc1);

const deleteCs = document.querySelectorAll(".deleteC");
for(let i = 0 ;i<=deleteCs.length;i++){
    deleteCs[i].addEventListener("click",confirmar);
}


function confirmar(){    
    document.getElementById('confirmacion').style.display = 'block'; 
    cambioBack();   
    
}
function cambioBack(){
    document.getElementById('header').style.background = "#3C3C3C";
    document.getElementById('menu').style.background ="#3C3C3C";
    document.getElementById('contenedor').style.background ="#3C3C3C";
    document.getElementById('scrollBg').style.background ="#3C3C3C";
    document.getElementById('DosScrollBg').style.background ="#3C3C3C";
    document.getElementById('page-content').style.background ="#3C3C3C";
}
function returnBack(){
    document.getElementById('header').style.background ="linear-gradient(to top, #43cea2, #185a9d)";
    document.getElementById('menu').style.background ="linear-gradient(to top, #43cea2, #185a9d)";
    document.getElementById('contenedor').style.background ="linear-gradient(to top, #43cea2, #185a9d)";
    document.getElementById('scrollBg').style.background ="linear-gradient(to top, #43cea2, #185a9d)";
    document.getElementById('DosScrollBg').style.background ="linear-gradient(to top, #43cea2, #185a9d)";
    document.getElementById('page-content').style.background ="linear-gradient(to top, #43cea2, #185a9d)";
}

function hideConfirma(){    
    document.getElementById('confirmacion').style.display = 'none';
    returnBack();
}

function deleteCampc1(){
    document.getElementById('campC1').style.display = 'none';
    hideConfirma();    
    document.getElementById('contenidoDos').style.top = '9%';
    document.getElementById('contenidoTres').style.top = '23%';
    document.getElementById('contenidoCuatro').style.top = '37%';

    document.getElementById('iconoDos').style.top = '14%';
    document.getElementById('iconoTres').style.top = '28%';
    document.getElementById('iconoCuatro').style.top = '42%';   
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



