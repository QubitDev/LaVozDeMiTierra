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
let number = 1;
function addLista(){
    conteiner.innerHTML +=`
    <div class="list">
        <i class="fa-solid fa-headphones fa-3x" id="imageList"></i>
        <h1 class="titleLi">Hola primo como esras ${number}</h1>
        <h1 class="Audios">Numero de audios:</h1>
        <h1 class="number" type="number">0</h1>
        <button class="deleteC">
            <i class="fa-solid fa-trash-can fa-2x"></i>
        </button>
    </div>
    
    `;
    number++;
}
