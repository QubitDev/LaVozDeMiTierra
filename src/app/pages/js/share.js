// document.getElementById("buttonCancel").addEventListener("click", onCancel);
// document.getElementById("buttonCopy").addEventListener("click", copyToClipboard);
const popup = document.getElementById('popup');
const linkShare = document.getElementById("__link__share");
const input = document.createElement("textarea");

function togglePopup() {
    popup.style.display = (popup.style.display === "none" || popup.style.display === "") ? "block" : "none";
    generateLinkShare();
}

function generateLinkShare() {
    // Obtén los datos relevantes que deseas compartir (pueden ser el título, el narrador, etc.)
    var typeAudio = document.getElementById("tipo__audio").textContent;
    var titleAudio = document.getElementById("titulo__audio").textContent;

    // Simula la generación de un ID único para el contenido que se está reproduciendo
    var contentID = generateUniqueID();

    // Construye el enlace con la información necesaria
    var shareLink = window.location.origin + "./../html/reproducir.html?contenido=" + contentID;

    linkShare.innerText = shareLink;
}

// Función para generar un ID único (puedes mejorarla según tus necesidades)
function generateUniqueID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function copyToClipboard() {
 
    input.value = linkShare.innerText;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }
