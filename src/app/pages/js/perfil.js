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

const choosee = document.getElementById("changeNameButton");
const cerrarChos = document.getElementById("cancelButton");
const cambiarDatos = document.getElementById("submitButton");
const nombreUsu = document.getElementById("NombeUsario");
cambiarDatos.addEventListener("click", actualizar);
choosee.addEventListener("click",cambiar);
cerrarChos.addEventListener("click",cerrar);

const image1 = document.querySelector(".primero");
const image2 = document.querySelector(".segundo");
const image3 = document.querySelector(".tercero");
const image4 = document.querySelector(".cuarto");
const image5 = document.querySelector(".quito");


//image1.addEventListener("click",cambiarImagenUno);
image2.addEventListener("click",cambiarImagenDos);
//image3.addEventListener("click",cambiarImagenTres);
//image4.addEventListener("click",cambiarImagenCuatro);
//image5.addEventListener("click",cambiarImagenCinco);

const imagenMain = document.querySelector(".imagenMain");

/*function cambiarImagenUno(){
    imagenMain.src = "./../../../assets/imagenesUsu/llama.jpg";
}*/
function cambiarImagenDos(){
    imagenMain.src = "./../../../assets/imagenesUsu/capibara.png";
}/*
function cambiarImagenTres(){
    imagenMain.src = "./../../../assets/imagenesUsu/CÓNDOR.png";
}
function cambiarImagenCuatro(){
    imagenMain.src = "./../../../assets/imagenesUsu/Mascara.jpg";    
}
function cambiarImagenCinco(){
    imagenMain.src = "./../../../assets/imagenesUsu/sapo.jpg";
}*/

function cambiar(){
    document.getElementById("userProfileEditar").style.display = "block";
}
function cerrar(){
    document.getElementById("userProfileEditar").style.display = "none";
}


db.collection('users').onSnapshot((snapshot) => {
    cargarNombre(snapshot.docs);
})
const cargarNombre = (documentos) => {
    if (documentos.length > 0){          
        documentos.forEach(documento => {            
            if(documento.data().nombreDeUsuario == "gaboOyente"){                
                cagarName.innerHTML += ` 
                <h1 id="userName">${documento.data().nombreDeUsuario}</h1>
            `;            
            }        
        });        
    }
}
const nombreUsuario = document.getElementById("userName");
function actualizar(){
    cerrar();
    nombreUsuario.textContent = nombreUsu.value;  
}



/*
 <div id="userProfileEdit">
            <div id="profilePictureContainer">
                <img src="default-profile-picture.jpg" alt="Profile Picture" id="profilePicture">
                <button id="changePictureButton" onclick="changeProfilePicture()">&#9998;</button>
            </div>
            <div id="userNameContainer">
                <span id="userName">Nombre de Usuario</span>
                <button id="changeNameButton" onclick="changeUserName()">&#9998;</button>
                <input type="text" id="newUserName" style="display: none;">
            </div>
            <button id="saveChangesButton" onclick="saveChanges()">Guardar Cambios</button>
        </div>
document.addEventListener("DOMContentLoaded", function () {
    // Aquí puedes agregar lógica para cambiar la foto de perfil, el nombre de usuario, etc.
// Lógica para cambiar la foto de perfil, el nombre de usuario, etc.

function changeProfilePicture() {
    // Implementa la lógica para cambiar la foto de perfil aquí
    alert("Cambiando la foto de perfil...");
}

function changeUserName() {
    // Muestra el input para el nuevo nombre de usuario y oculta el nombre actual
    document.getElementById("userName").style.display = "none";
    document.getElementById("newUserName").style.display = "block";
    // Asigna el valor actual del nombre al input
    document.getElementById("newUserName").value = document.getElementById("userName").textContent;
}

function saveChanges() {
    // Guarda los cambios del nombre
    var newName = document.getElementById("newUserName").value;
    document.getElementById("userName").textContent = newName;
    // Oculta el input y muestra el nombre actualizado
    document.getElementById("userName").style.display = "block";
    document.getElementById("newUserName").style.display = "none";
    alert("Cambios guardados");
}


});*/