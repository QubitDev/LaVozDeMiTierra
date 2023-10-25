document.getElementById("registration-form").addEventListener("submit", (e) => {
  e.preventDefault();
  registrarUsuario();
});
const usersCollection = db.collection("users");
const validationRules = {
  nombre: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[A-Za-z]+$/,
    errorElementId: "nombreError",
    errorMessage: "El campo nombre debe tener entre 3 y 20 caracteres alfabéticos.",
  },
  apellido: {
    minLength: 5,
    maxLength: 20,
    pattern: /^[A-Za-z]+$/,
    errorElementId: "apellidoError",
    errorMessage: "El campo apellido debe tener entre 5 y 20 caracteres alfabéticos.",
  },
  nombreDeUsuario: {
    minLength: 4,
    maxLength: 15,
    pattern: /^[A-Za-z0-9]+$/,
    errorElementId: "nombreDeUsuarioError",
    errorMessage: "El campo nombre de usuario debe tener entre 4 y 15 caracteres alfanuméricos.",
  },
  correoElectronico: {
    maxLength: 64,
    pattern: /^[A-Za-z0-9]+@gmail\.com$/,
    errorElementId: "correoElectronicoError",
    errorMessage: "El campo correo electrónico debe contener caracteres alfabéticos y numéricos antes de @gmail.com.",
  },
  numeroCelular: {
    maxLength: 8,
    pattern: /^\d+$/,
    errorElementId: "numeroCelularError",
    errorMessage: "El campo número de celular debe tener hasta 8 caracteres numéricos.",
  },
  contrasena: {
    maxLength: 32,
    pattern: /^[A-Za-z0-9]+$/,
    errorElementId: "contrasenaError",
    errorMessage: "El campo contraseña debe tener hasta 32 caracteres alfanuméricos.",
  },
  repitaContrasena: {
    errorElementId: "repitaContrasenaError",
    errorMessage: "Las contraseñas no coinciden",
  },
};

function registrarUsuario() {
  const nombre = document.getElementById("name").value;
  const apellido = document.getElementById("lastName").value;
  const correoElectronico = document.getElementById("email").value;
  const nombreDeUsuario = document.getElementById("username").value;
  const contrasena = document.getElementById("password").value;
  const repitaContrasena = document.getElementById("passwordRepeat").value;
  const numeroCelular = document.getElementById("phone").value;

  // Verifica si las contraseñas coinciden
  if (contrasena !== repitaContrasena) {
    document.getElementById(validationRules.repitaContrasena.errorElementId).innerText = validationRules.repitaContrasena.errorMessage;
  }

  // Realiza otras validaciones de acuerdo a los criterios
  for (const field in validationRules) {
    const value = document.getElementById(field).value;
    const rule = validationRules[field];

    // Elimina mensajes de error anteriores
    document.getElementById(rule.errorElementId).innerText = "";

    // Realiza la validación
    if (rule.minLength && value.length < rule.minLength) {
      document.getElementById(rule.errorElementId).innerText = rule.errorMessage;
      return;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      document.getElementById(rule.errorElementId).innerText = rule.errorMessage;
      return;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      document.getElementById(rule.errorElementId).innerText = rule.errorMessage;
      return;
    }
  }

  // Validación de nombre de usuario repetido
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

            //guardar los datos en Firestore
            usersCollection.add({
              apellido,
              nombre,
              correoElectronico,
              nombreDeUsuario,
              numeroCelular,
            });

            alert("Usuario registrado con éxito");
            // Redirige a la pantalla de inicio de la plataforma
            window.location.href = "./../../../pages/html/Login.html";
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