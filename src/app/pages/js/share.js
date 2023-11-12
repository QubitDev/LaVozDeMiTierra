// document.getElementById("buttonCancel").addEventListener("click", onCancel);
// document.getElementById("buttonCopy").addEventListener("click", copyToClipboard);
const popup = document.getElementById('popup');
const linkShare = document.getElementById("__link__share");
const input = document.createElement("textarea");

function togglePopup() {
    popup.style.display = (popup.style.display === "none" || popup.style.display === "") ? "block" : "none";
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
    popup.style.display = (popup.style.display === "none" || popup.style.display === "") ? "block" : "none";
}

// Función para generar un ID único (puedes mejorarla según tus necesidades)
function generateUniqueID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function copyToClipboard() {
    var range = document.createRange();
    range.selectNode(linkShare);

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy");

    selection.removeAllRanges();
}

function shareOnFacebook() {
  var facebookShareLink = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(linkShare.textContent);
  openShareWindow(facebookShareLink);
}

function shareOnWhatsApp() {
  var whatsappShareLink = "https://api.whatsapp.com/send?text=" + encodeURIComponent(linkShare.textContent);
  openShareWindow(whatsappShareLink);
}

function shareOnGmail() {
  var gmailShareLink = "mailto:?subject=Check%20this%20out&body=" + encodeURIComponent(linkShare.textContent);
  openShareWindow(gmailShareLink);
}

function openShareWindow(shareLink) {
  window.open(shareLink, "_blank", "width=600,height=400");
}