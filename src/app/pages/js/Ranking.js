
const endSesion = document.querySelector(".sesion");
endSesion.addEventListener('click',cerrarSesion);
let cont = 1;
function cerrarSesion(){
    if(cont % 2 == 0){
        document.getElementById('sesionMenu').style.display= 'none';
    }
    else{
        document.getElementById('sesionMenu').style.display= 'block';
    }
    cont++;
}


// Obtener referencia a la colección 'audio'
const audioCollection = db.collection("audio");

// Obtener y mostrar los 10 mejores en reproducciones
audioCollection.orderBy("reproducciones", "desc").limit(10).get().then((querySnapshot) => {
  const rankingList = document.querySelector('.ranking-list');
  let numberList = 1;
  querySnapshot.forEach((doc, index) => {
    const audio = doc.data();
    const rankingItem = document.createElement("li");
    rankingItem.classList.add("ranking-item");
    rankingItem.innerHTML = `
    <h1>${numberList}</h1>
    <div class="caja">
      <a onclick="enviar('${doc.id}')">
        <div class="imagen" id="imagen${index}">
          <img src="${audio.imageURL}" alt="" height="100px" width="100px" class="imageF">
        </div>
      </a>
    </div> 
    <div class="descripcion">
      <h3 id="titulo${index}" style="text-align: right;">${audio.titulo}</h3>
      <h5 id="procedencia${index}" style="text-align: right;">${audio.procedencia}</h5>
      <h4 id="narrador${index}" style="text-align: right;">${audio.narrador}</h4>
      <h6 id="reproducciones${index}" style="text-align: right;">${audio.reproducciones}</h6>
    </div>
    `;

    rankingList.appendChild(rankingItem);
    numberList++;
  });
}).catch((error) => {
  console.error("Error al obtener datos de Firebase:", error);
});

function enviar(doc) {
  window.location.href = `reproducir.html?doc=${doc}`;
}