// document.getElementById("buttonCancel").addEventListener("click", onCancel);
// document.getElementById("buttonCopy").addEventListener("click", copyToClipboard);
const popup = document.getElementById('popup');
const linkShare = document.getElementById("__link__share");
const input = document.createElement("textarea");

function togglePopup() {
    popup.style.display = (popup.style.display === "none" || popup.style.display === "") ? "block" : "none";
}

function generateLinkShare() {

    var shareLink = window.location.origin + "/src/app/pages/html/reproducir.html?doc=" + docId;

    linkShare.innerText = shareLink;
    popup.style.display = (popup.style.display === "none" || popup.style.display === "") ? "block" : "none";
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