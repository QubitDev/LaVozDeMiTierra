document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById('error-message');
  const validationRules = {    
      nombreDeUsuario: {
          minLength: 4,
          maxLength: 15,
          pattern: /^[A-Za-z0-9]+$/,
          errorElementId: "nombreDeUsuarioError",
          errorMessage: "El campo nombre de usuario debe tener entre 4 y 15 caracteres alfanuméricos."
      },
      contrasena: {
          maxLength: 64,
          pattern: /^[A-Za-z0-9]+@gmail\.com$/,
          errorElementId: "correoElectronicoError",
          errorMessage: "El campo correo electrónico debe contener caracteres alfabéticos y numéricos antes de @gmail.com."
      }
  };
  // cuando se pasa el limite inferior y superior al momento de ingresar datos se limpia la pantalla
  loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearAllErrors();
      const usernameValue = document.getElementById('username').value;
      const passwordValue = document.getElementById('password').value;
      const nombre = usernameInput.value;
      const password = passworInput.value;
      let isValid = true;

      // Validate the username
      if (
          usernameValue.length < validationRules.nombreDeUsuario.minLength ||
          usernameValue.length > validationRules.nombreDeUsuario.maxLength ||
          !validationRules.nombreDeUsuario.pattern.test(usernameValue)
      ) {
          displayError(validationRules.nombreDeUsuario.errorElementId, validationRules.nombreDeUsuario.errorMessage);
          isValid = false;
      }

      // Validate the password
      if (
          passwordValue.length > validationRules.contrasena.maxLength ||
          !validationRules.contrasena.pattern.test(passwordValue)
      ) {
          displayError(validationRules.contrasena.errorElementId, validationRules.contrasena.errorMessage);
          isValid = false;
      } 
      //para el administrador*/
      if (isValid) {
        const allowedCredentials = {
            'superAdmin': 'tbomch87',
            'admin213': '018846',
            'adminRed': '12345'
        };

        if (allowedCredentials.hasOwnProperty(usernameValue) && allowedCredentials[usernameValue] === passwordValue) {
            switch (usernameValue) {
                case 'superAdmin':
                    window.location.href = "./../../../app/homeAdm/homeAdm.html";
                    break;
                case 'admin213':
                    window.location.href = "./../../../app/homeAdm/homeAdm.html";
                    break;
                case 'adminRed':
                    window.location.href = "./../../../app/homeAdm/homeAdm.html";
                    break;
                default:
                    errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
            }
        } else if (usernameValue === nombreDeUsuario && passwordValue === contrasena) {
            window.location.href = "./../../../app/homeUsu/homeUsu.html";
        } else {
            errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
        }
    }
      //seria para el usuario en general
      
      firebase.auth().signInWithEmailAndPassword(usernameValue, passwordValue).then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario autenticado: ", user);
        window.location.href = "./../../../app/homeUsu/homeUsu.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error de autenticación:", errorCode, errorMessage);

        // Muestra un mensaje de error al usuario
        errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
      });   
});

  function displayError(errorElementId, errorMessage) {
      const errorElement = document.getElementById(errorElementId);
      errorElement.textContent = errorMessage;
  }

  function clearAllErrors() {
      const errorElements = document.querySelectorAll(".error");
      errorElements.forEach((element) => {
          element.textContent = "";
      });
  }
});


















































































/*

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById('error-message');
  
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Aquí deberías verificar las credenciales en el servidor.
      // Este es solo un ejemplo para administrador que son estatiscos
      const allowedCredentials = {
        'superAdmin': 'tbomch87',
        'admin213': '018846',
        'adminRed': '12345'
        // Agregar más credenciales aquí si es necesario
    };

    // Verificar si las credenciales coinciden con las permitidas
    if (allowedCredentials.hasOwnProperty(username) && allowedCredentials[username] === password) {
        // Las credenciales son correctas.
        // Realiza la redirección apropiada según el nombre de usuario
        switch (username) {
            case 'superAdmin':
                window.location.href = "./../../../app/homeAdm/homeAdm.html";
                break;
            case 'admin213':
                window.location.href = "./../../../app/homeUsu1/homeAdm.html";
                break;
            case 'adminRed':
                window.location.href = "./../../../app/homeUsu2/homeAdm.html";
                break;
            // Agregar más casos para otros usuarios si es necesario
            default:
                errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
        }
    } else {
        // Las credenciales son incorrectas.
        errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
    }

      //ejemplo para el usuario
      if (username === 'MarcoSG' && password === '100087') {
        // Las credenciales son correctas.
        // Redirige a la pantalla de inicio de la plataforma
        window.location.href = "./../../../app/homeUsu/homeUsu.html";
      } else {
        errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
      }
    });
});
*/