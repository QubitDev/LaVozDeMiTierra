const routes = {
  "/": "home.html",
  registro: "registro.html",
};

function loadContent(route) {
  const pageContent = document.getElementById("page-content");
  const fileName = routes[route] || "404.html"; // Manejar rutas no encontradas
  fetch(`pages/html/${fileName}`)
    .then((response) => response.text())
    .then((html) => {
      pageContent.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error al cargar la página:", error);
    });
}

window.addEventListener("hashchange", () => {
  const currentRoute = location.hash.substr(1); // Eliminar el "#" al principio
  loadContent(currentRoute);
});


document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu__item");
  const pageContent = document.getElementById("page-content");

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", function () {
      const pageName = this.getAttribute("data-page");
      loadPage(pageName);
    });
  });

  function loadPage(pageName) {
    fetch(`pages/html/${pageName}.html`)
      .then((response) => response.text())
      .then((html) => {
        pageContent.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar la página:", error);
      });
  }
});
