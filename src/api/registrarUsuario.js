document.getElementById("registroForm").addEventListener("submit", (e) => {
    e.preventDefault();
  });
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
            alert("Error: El nombre de usuario ya existe.");
        }else {
            // Validación: Campos vacíos
            if (!nombre || !apellido || !correoElectronico || !nombreDeUsuario || !contrasena || !repitaContrasena || !numeroCelular) {
                alert("Error: Todos los campos deben estar llenos.");
                return;
            }
            // Validación: Tamaño nombre 
            if (nombre.length < 3 || nombre.length > 20 || !/^[A-Za-z]+$/.test(nombre)) {
                alert("Error: El campo nombre debe tener entre 3 y 20 caracteres alfabéticos.");
                return;
            }
            // Validación: Tamaño apellido
            if (apellido.length < 5 || apellido.length > 20 || !/^[A-Za-z]+$/.test(apellido)) {
                alert("Error: El campo apellido debe tener entre 5 y 20 caracteres alfabéticos.");
                return;
            }
            // Validación: Tamaño nombre de usuario
            if (nombreDeUsuario.length < 4 || nombreDeUsuario.length > 15 || !/^[A-Za-z0-9]+$/.test(nombreDeUsuario)) {
                alert("Error: El campo nombre de usuario debe tener entre 4 y 15 caracteres alfanuméricos.");
                return;
            }
            // Validación: Correo electrónico válido
            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(correoElectronico)) {
                alert("Error: Ingrese un correo electrónico válido.");
                return;
            }
            // Validación: Tamaño correo electrónico
            if (correoElectronico.length > 64) {
                alert("Error: El campo correo electrónico no debe exceder los 64 caracteres.");
                return;
              }
            
              // Validación: Correo electrónico tiene formato correcto
            if (!/^[A-Za-z0-9]+@gmail\.com$/.test(correoElectronico)) {
                alert("Error: El campo correo electrónico debe contener caracteres alfabéticos y numéricos antes de @gmail.com.");
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