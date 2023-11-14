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


});