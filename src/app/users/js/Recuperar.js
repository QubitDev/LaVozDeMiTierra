document.addEventListener("DOMContentLoaded", function () {
    // Inicializa Firebase con los datos de configuración de configuracion.js
    firebase.initializeApp(configuracion);
    
    // Accede a elementos HTML
    const usernameInput = document.getElementById("usernameInput");
    const userSelect = document.getElementById("userSelect");
    const emailInfo = document.getElementById("emailInfo");
    const sendButton = document.getElementById("sendRecoveryEmail");
    const cancelLink = document.getElementById("cancelLink");

    // Agrega un evento al campo de entrada para el nombre de usuario
    usernameInput.addEventListener("input", function () {
        // Limpia el correo y oculta el enlace de cancelación
        emailInfo.textContent = "";
        cancelLink.style.display = "none";

        // Realiza la búsqueda en Firebase Firestore según el nombre de usuario
        const username = usernameInput.value;
        // ...
        // Tu lógica para buscar el usuario y llenar la lista desplegable aquí
    });

    // Agrega un evento al botón de enviar correo de recuperación
    sendButton.addEventListener("click", function () {
        // ...
        // Tu lógica para enviar el correo de recuperación aquí
    });


});
