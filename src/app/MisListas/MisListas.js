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
const addList = document.getElementById("newList");
const conteiner = document.getElementById("container_list");
addList.addEventListener("click",addLista);

function addLista(){
    conteiner.innerHTML +=`
    
    `;

}