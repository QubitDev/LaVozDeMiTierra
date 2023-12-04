document.getElementById("reset-password-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Previene el envío del formulario

  const emailInput = document.getElementById("email");
  const email = emailInput.value;

  // Verifica si la dirección de correo electrónico tiene el dominio "@gmail.com"
  if (email.endsWith("@gmail.com")) {
    // Envía la solicitud de restablecimiento de contraseña a Firebase
    firebase.auth().sendPasswordResetEmail(email)
      .then(function () {
        // Solicitud de restablecimiento de contraseña enviada con éxito
        alert("Se ha enviado un correo electrónico para restablecer tu contraseña. Revise su bandeja de entrada.");
        window.location.href = "Login.html";
      })
      .catch(function (error) {
        // Ocurrió un error al enviar la solicitud de restablecimiento de contraseña
        alert("Ha ocurrido un error: " + error.message);
      });
  } else {
    // La dirección de correo electrónico no tiene el dominio "@gmail.com"
    alert("Por favor, ingrese una dirección de correo electrónico de Gmail.");
    // Puedes realizar otras acciones según sea necesario, como limpiar el campo de correo electrónico
    emailInput.value = "";
  }
});