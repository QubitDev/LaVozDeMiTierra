document.getElementById("registration-form").addEventListener("submit", (e) => {
  e.preventDefault();
  registrarUsuario();
});
document.getElementById("continue-button").addEventListener("click", () => {
  // Oculta el pop-up
  popup.style.display = "none";
})
// Configura el evento de clic para el botón "Continuar"
const usersCollection = db.collection("users");
const datos = {};
const validationRules = {
  nombre: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[A-Za-z]+$/,
    errorElementId: "nombreError",
    errorMessage: "El campo nombre debe tener entre 3 y 20 caracteres alfabéticos.",
    voidMessage: "Completa este campo",
  },
  apellido: {
    minLength: 4,
    maxLength: 20,
    pattern: /^[A-Za-z]+$/,
    errorElementId: "apellidoError",
    errorMessage: "El campo apellido debe tener entre 4 y 20 caracteres alfabéticos.",
    voidMessage: "Completa este campo",
  },
  nombreDeUsuario: {
    minLength: 4,
    maxLength: 15,
    pattern: /^[A-Za-z0-9]+$/,
    errorElementId: "nombreDeUsuarioError",
    errorMessage: "El campo nombre de usuario debe tener entre 4 y 15 caracteres alfanuméricos.",
    voidMessage: "Completa este campo",
  },
  correoElectronico: {
    maxLength: 64,
    pattern: /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~.]+@gmail\.com$/,
    errorElementId: "correoElectronicoError",
    errorMessage: "El campo correo electrónico debe contener caracteres alfabéticos y numéricos antes de @gmail.com.",
    voidMessage: "Completa este campo",
  },
  numeroCelular: {
    maxLength: 8,
    pattern: /^[6-7]\d+$/,
    errorElementId: "numeroCelularError",
    errorMessage: "El campo número de celular debe tener hasta 8 caracteres numéricos.",
    voidMessage: "Completa este campo",
  },
  contrasena: {
    minLength: 8,
    maxLength: 32,
    pattern: /^[A-Za-z0-9]+$/,
    errorElementId: "contrasenaError",
    errorMessage: "El campo contraseña debe tener entre 8 y 32 caracteres alfanuméricos.",
    voidMessage: "Completa este campo con al menos 8 caracteres",
  },
  repitaContrasena: {
    errorElementId: "repitaContrasenaError",
    errorMessage: "Las contraseñas no coinciden",
    voidMessage: "Por favor, repita su contraseña",
  },
};

function limpiarMensajesDeError() {
  for (const field in validationRules) {
    const rule = validationRules[field];
    document.getElementById(rule.errorElementId).innerText = "";
  }
}

function registrarUsuario() {
  limpiarMensajesDeError();
  const nombre = document.getElementById("name").value;
  const apellido = document.getElementById("lastName").value;
  const correoElectronico = document.getElementById("email").value;
  const nombreDeUsuario = document.getElementById("username").value;
  const contrasena = document.getElementById("password").value;
  const repitaContrasena = document.getElementById("passwordRepeat").value;
  const numeroCelular = document.getElementById("phone").value;
  Object.assign(datos,{nombre, apellido, correoElectronico, nombreDeUsuario, numeroCelular});
  // Verifica si las contraseñas coinciden
  if(repitaContrasena === ""){
    document.getElementById(validationRules.repitaContrasena.errorElementId).innerText = validationRules.repitaContrasena.voidMessage;
  }else if (contrasena !== repitaContrasena) {
    document.getElementById(validationRules.repitaContrasena.errorElementId).innerText = validationRules.repitaContrasena.errorMessage;
    return;
  }

  // Realiza la validación para cada campo
  if(nombre === ""){
    document.getElementById(validationRules.nombre.errorElementId).innerText = validationRules.nombre.voidMessage;
  }else if (nombre.length < validationRules.nombre.minLength || nombre.length > validationRules.nombre.maxLength || !validationRules.nombre.pattern.test(nombre)) {
    document.getElementById(validationRules.nombre.errorElementId).innerText = validationRules.nombre.errorMessage;
    return;
  }
  if(apellido === ""){
    document.getElementById(validationRules.apellido.errorElementId).innerText = validationRules.apellido.voidMessage;
  }else if (apellido.length < validationRules.apellido.minLength || apellido.length > validationRules.apellido.maxLength || !validationRules.apellido.pattern.test(apellido)) {
    document.getElementById(validationRules.apellido.errorElementId).innerText = validationRules.apellido.errorMessage;
    return;
  }
  if(nombreDeUsuario === ""){
    document.getElementById(validationRules.nombreDeUsuario.errorElementId).innerText = validationRules.nombreDeUsuario.voidMessage;
  }else if (nombreDeUsuario.length < validationRules.nombreDeUsuario.minLength || nombreDeUsuario.length > validationRules.nombreDeUsuario.maxLength || !validationRules.nombreDeUsuario.pattern.test(nombreDeUsuario)) {
    document.getElementById(validationRules.nombreDeUsuario.errorElementId).innerText = validationRules.nombreDeUsuario.errorMessage;
    return;
  }
  if(correoElectronico === ""){
    document.getElementById(validationRules.correoElectronico.errorElementId).innerText = validationRules.correoElectronico.voidMessage;
  }else if (correoElectronico.length > validationRules.correoElectronico.maxLength || !validationRules.correoElectronico.pattern.test(correoElectronico)) {
    document.getElementById(validationRules.correoElectronico.errorElementId).innerText = validationRules.correoElectronico.errorMessage;
    return;
  }
  if(numeroCelular === ""){
    document.getElementById(validationRules.numeroCelular.errorElementId).innerText = validationRules.numeroCelular.voidMessage;
  }else if (numeroCelular.length !== validationRules.numeroCelular.maxLength || !validationRules.numeroCelular.pattern.test(numeroCelular)) {
    document.getElementById(validationRules.numeroCelular.errorElementId).innerText = validationRules.numeroCelular.errorMessage;
    return;
  }
  if(contrasena === ""){
    document.getElementById(validationRules.contrasena.errorElementId).innerText = validationRules.contrasena.voidMessage;
  }else if (contrasena.length < validationRules.contrasena.minLength || contrasena.length > validationRules.contrasena.maxLength || !validationRules.contrasena.pattern.test(contrasena)) {
    document.getElementById(validationRules.contrasena.errorElementId).innerText = validationRules.contrasena.errorMessage;
    return;
  }

  // Validación de nombre de usuario repetido
  if(contrasena!=="" && numeroCelular!=="" && nombre!=="" && nombreDeUsuario!=="" && apellido!=="" && repitaContrasena!=="" && correoElectronico!==""){
  usersCollection.where("nombreDeUsuario", "==", nombreDeUsuario).get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        document.getElementById(validationRules.nombreDeUsuario.errorElementId).innerText = "Nombre de usuario ya existe";
      } else {
        // Registro exitoso
        // Crea el usuario en Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(correoElectronico, contrasena)
          .then((userCredential) => {
            // Registro exitoso
            const user = userCredential.user;
            const popup = document.getElementById("popup");
                  popup.style.display = "block";
            // Configura el evento de clic para el botón "Continuar"
            //setTimeout(() => {
              usersCollection.add(datos)
                .then(() => {
                  // Redirige a la pantalla de inicio de la plataforma
                  window.location.href = "Login.html";
                })
                .catch((error) => {
                  // Maneja cualquier error relacionado con Firestore aquí
                  alert("Error al agregar datos a Firestore: " + error.message);
                });
           // }, 2000); // espera de 2segundos.
          })
          .catch((error) => {
            // Error en el registro
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Error al registrar el usuario: " + errorMessage);
          });
      }
    })
    .catch((error) => {
      console.error("Error al verificar el nombre de usuario:", error);
    });
  }
}