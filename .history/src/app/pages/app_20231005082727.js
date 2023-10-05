const contentContainer = document.getElementById("content");
const menuLinks = document.querySelectorAll("aside a");

function loadPage(url) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      contentContainer.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error al cargar la página:", error);
    });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const pageUrl = link.getAttribute("href");
    loadPage(pageUrl);
  });
});
