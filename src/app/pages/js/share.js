
function generarEnlaceCompartir() {
    // Obtén los datos relevantes que deseas compartir (pueden ser el título, el narrador, etc.)
    var tipoAudio = document.getElementById("tipo__audio").textContent;
    var tituloAudio = document.getElementById("titulo__audio").textContent;

    // Simula la generación de un ID único para el contenido que se está reproduciendo
    var contenidoID = generarIDUnico();

    // Construye el enlace con la información necesaria
    var enlaceCompartir = window.location.origin + "/reproducir.html?contenido=" + contenidoID;

    // Muestra el enlace para compartir (puedes usar una modal, alert, o cualquier otro método)
    alert("Comparte este enlace:\n" + enlaceCompartir);
}

// Función para generar un ID único (puedes mejorarla según tus necesidades)
function generarIDUnico() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// ... (Más código, según sea necesario)
