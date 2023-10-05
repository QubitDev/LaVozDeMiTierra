// Función para cargar el contenido de una página específica en el div "page-content"
function loadPage(pageName) {
  const pageContent = document.getElementById("page-content");

  // Realizar una solicitud AJAX para obtener el contenido de la página
  // y cargarlo en el div "page-content"
  fetch(`pages/${pageName}.html`)
    .then((response) => response.text())
    .then((html) => {
      pageContent.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error al cargar la página:", error);
    });
}

// Llamar a loadPage() con el nombre de la página que deseas cargar
loadPage("inicio"); // Por ejemplo, cargar la página de inicio por defecto
