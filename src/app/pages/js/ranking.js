const audioCollection = firebase.firestore().collection("audio");

// Obtener y mostrar el ranking de reproducciones
audioCollection.orderBy("reproducciones", "desc").get().then((querySnapshot) => {
  const rankingElement = document.getElementById("ranking");

  querySnapshot.forEach((doc) => {
    const audio = doc.data();

    const songElement = document.createElement("div");
    songElement.classList.add("song");

    const imageElement = document.createElement("img");
    imageElement.src = audio.imageURL; // Reemplaza con la URL real de la imagen
    songElement.appendChild(imageElement);

    const textElement = document.createElement("p");
    textElement.textContent = `${audio.titulo} - Procedencia: ${audio.procedencia} - Narrador: ${audio.narrador} - Reproducciones: ${audio.reproducciones}`;
    songElement.appendChild(textElement);

    rankingElement.appendChild(songElement);
  });
}).catch((error) => {
  console.error("Error al obtener datos de Firebase:", error);
});