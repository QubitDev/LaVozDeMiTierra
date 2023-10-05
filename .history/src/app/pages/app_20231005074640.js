
function loadPage(ArchivoName,pageName) {
  const pageContent = document.getElementById("page-content");

  fetch(`pages/${ArchivoName}/${pageName}.html`)
    .then((response) => response.text())
    .then((html) => {
      pageContent.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error al cargar la página:", error);
    });
}


loadPage("pages","app"); // Por ejemplo, cargar la página de inicio por defecto
