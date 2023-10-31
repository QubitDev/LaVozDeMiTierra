const entrar = document.getElementById('boton');

const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
entrar.addEventListener('click',homeUsua);


function homeAdmi(){
  window.location.src = "../../homeAdm/homeAdm.html";
}
function homeUsua(){
  window.location.href = "../homeUsu";
}

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí deberías verificar las credenciales en el servidor.
    // Este es solo un ejemplo para administrador
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
              window.location.href = "../../homeAdm/homeAdm.html";
              break;
          case 'admin213':
              window.location.href = "../../homeAdm/homeAdm.html";
              break;
          case 'adminRed':
              window.location.href = "../../homeAdm/homeAdm.html";
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
      window.location.href = "../../homeUsu/homeUsu.html";
    } else {
      errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
    }
  });
});
