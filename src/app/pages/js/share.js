function generarEnlace() {
    const contenido = () => { 
        return "Este es el contenido del cuento o leyenda...";
    }
    
    var cuentoID = () => { 
         return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // Crear un enlace único para compartir
    var enlaceCompartir = window.location.origin + "/reproducir?cuento=" + cuentoID;

    // Mostrar el enlace para compartir (puedes usar una modal, alert, o cualquier otro método)
    alert("Comparte este enlace:\n" + enlaceCompartir);
}

function obtenerContenido() {
    // Aquí obtienes el contenido del cuento desde tu aplicación
    // Puedes usar una variable, una llamada AJAX, o cualquier método según tu implementación
    
}

function generarIDUnico() {
    // Generar un ID único para el cuento
    // Puedes usar bibliotecas como UUID o cualquier método que prefieras
   
}
