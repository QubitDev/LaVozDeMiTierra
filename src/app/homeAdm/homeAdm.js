

const boton1 = document.querySelector(".boton1");
boton1.addEventListener("click", hideConfirma);

const botones = document.querySelector(".boton");
botones.addEventListener("click", deleteCamp);

const deleteCs = document.querySelectorAll(".deleteC");
for(let i = 0 ;i<=deleteCs.length;i++){
    deleteCs[i].addEventListener("click",confirmar);
}

function confirmar(){    
    document.getElementById('confirmacion').style.display = 'block';
    document.getElementById('header').style.background = "#3C3C3C";
    document.getElementById('menu').style.background ="#3C3C3C";
    document.getElementById('contenedor').style.background ="#3C3C3C";
    document.getElementById('scrollBg').style.background ="#3C3C3C";
    document.getElementById('DosScrollBg').style.background ="#3C3C3C";
    document.getElementById('page-content').style.background ="#3C3C3C";

}

function hideConfirma(){    
    document.getElementById('confirmacion').style.display = 'none';
    document.getElementById('header').style.background ="linear-gradient(to top, #43cea2, #185a9d)";
    document.getElementById('menu').style.background ="linear-gradient(to top, #43cea2, #185a9d)";
    document.getElementById('contenedor').style.background ="linear-gradient(to top, #43cea2, #185a9d)";
    document.getElementById('scrollBg').style.background ="linear-gradient(to top, #43cea2, #185a9d)";
    document.getElementById('DosScrollBg').style.background ="linear-gradient(to top, #43cea2, #185a9d)";
    document.getElementById('page-content').style.background ="linear-gradient(to top, #43cea2, #185a9d)";



}

function deleteCamp(){
    document.getElementById('camp').style.display = 'none';


}


