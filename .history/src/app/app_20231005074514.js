
function loadPage(ArchivoName,pageName) {
  const pageContent = document.getElementById("page-content");

  // Realizar una solicitud AJAX para obtener el contenido de la página
  // y cargarlo en el div "page-content"
  fetch(`pages/${ArchivoName}/${pageName}.html`)
    .then((response) => response.text())
    .then((html) => {
      pageContent.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error al cargar la página:", error);
    });
}

// Llamar a loadPage() con el nombre de la página que deseas cargar
loadPage("pages","app"); // Por ejemplo, cargar la página de inicio por defecto
