
const container = document.querySelector('.container')

const rain = () => {
    let j = 0

    while (j <= 80){
        let gout = document.createElement('i')
        let x = innerWidth * Math.random()
        let time = 1 * Math.random()
        gout.style.animationDuration = time <= 0.4 ? (time + 0.4) + 's'  : time + 's'
        gout.style.animationDelay = time + 's'
        gout.style.left = x + 'px'

        container.appendChild(gout)

        j++
    }
}
rain();

const endSesion = document.querySelector(".sesion");
endSesion.addEventListener('click',cerrarSesion);
const cagarName =document.getElementById("userNameContainer");
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



const choosee = document.querySelector(".buttonEditar");
const cerrarChos = document.getElementById("cancelButton");

choosee.addEventListener("click",cambiar);
cerrarChos.addEventListener("click",cerrar);

function cambiar(){
    document.getElementById("userProfileEditar").style.display = "block";
}
function cerrar(){
    document.getElementById("userProfileEditar").style.display = "none";
}

