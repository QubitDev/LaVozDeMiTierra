document.getElementById("reset-password-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Previene el envío del formulario

  const email = document.getElementById("email").value;

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
});
