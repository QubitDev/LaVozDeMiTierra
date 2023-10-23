document.getElementById("registroForm").addEventListener("submit", (e) => {
    e.preventDefault();
});
document.querySelectorAll("#registroForm input");
function registrarUsuario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correoElectronico = document.getElementById("correoElectronico").value;
    const nombreDeUsuario = document.getElementById("nombreDeUsuario").value;
    const contrasena = document.getElementById("contrasena").value;
    const repitaContrasena = document.getElementById("repitaContrasena").value;
    const numeroCelular = document.getElementById("numeroCelular").value;
  
    // Validación: Nombre de usuario repetido
    db.collection("users");
    db.where("nombreDeUsuario", "==", nombreDeUsuario).get()
    .then((querySnapshot) => {
        if (!querySnapshot.empty) {
            alert("Nombre de usuario ya existe");
        }else {
            // Validación: Campos vacíos
            if (!nombre || !apellido || !correoElectronico || !nombreDeUsuario || !contrasena || !repitaContrasena || !numeroCelular) {
                alert("Error espacios vacíos");
                return;
            }
            // Validación: Tamaño nombre 
            if (nombre.length < 3 || nombre.length > 20 || !/^[A-Za-z]+$/.test(nombre)) {
                alert("El campo nombre debe tener entre 3 y 20 caracteres alfabéticos.");
                return;
            }
            // Validación: Tamaño apellido
            if (apellido.length < 5 || apellido.length > 20 || !/^[A-Za-z]+$/.test(apellido)) {
                alert("El campo apellido debe tener entre 5 y 20 caracteres alfabéticos.");
                return;
            }
            // Validación: Tamaño nombre de usuario
            if (nombreDeUsuario.length < 4 || nombreDeUsuario.length > 15 || !/^[A-Za-z0-9]+$/.test(nombreDeUsuario)) {
                alert("El campo nombre de usuario debe tener entre 4 y 15 caracteres alfanuméricos.");
                return;
            }
            // Validación: Correo electrónico válido
            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(correoElectronico)) {
                alert("Ingrese un correo electrónico válido.");
                return;
            }
            // Validación: Tamaño correo electrónico
            if (correoElectronico.length > 64) {
                alert("El campo correo electrónico no debe exceder los 64 caracteres.");
                return;
              }
            
              // Validación: Correo electrónico tiene formato correcto
            if (!/^[A-Za-z0-9]+@gmail\.com$/.test(correoElectronico)) {
                alert("El campo correo electrónico debe contener caracteres alfabéticos y numéricos antes de @gmail.com.");
                return;
            }
            // Validación: Número de celular no excede los 8 caracteres y es numérico
            if (numeroCelular.length != 8 || !/^\d+$/.test(numeroCelular)) {
                alert("El campo número de celular debe tener 8 caracteres numéricos.");
                return;
            }
            // Validación: Número de celular comienza con código de área (por ejemplo, 6 o 7)
            if (!/^[67]/.test(numeroCelular)) {
                alert("El primer carácter del número de celular debe ser 6 o 7.");
                return;
            }
            // Validación: Contraseña no excede los 32 caracteres y permite caracteres alfanuméricos
            if (contrasena.length < 8 || contrasena.length > 32 || !/^[A-Za-z0-9]+$/.test(contrasena)) {
                alert("El campo contraseña debe tener entre 8 y 32 caracteres alfanuméricos.");
                return;
            }

            // Validación: Repetir contraseña es igual a la contraseña
            if (contrasena !== repitaContrasena) {
                alert("La contraseña y la repetición de contraseña no coinciden.");
                return;
            }
            
          // Si todas las validaciones pasan, crea el usuario en Firebase Authentication
            firebase.auth().createUserWithEmailAndPassword(correoElectronico, contrasena)
            .then((userCredential) => {
                const user = userCredential.user;
                //guardar los datos en Firestore
                db.add({
                    nombre,
                    apellido,
                    correoElectronico,
                    nombreDeUsuario,
                    numeroCelular,
                });
  
                console.log("Usuario registrado con éxito");
                // Redirige a la pantalla de inicio de la plataforma
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error al registrar el usuario:", errorMessage);
            }
            );
        }
    })
    .catch((error) => {
        console.error("Error al verificar el nombre de usuario:", error);
    });
}