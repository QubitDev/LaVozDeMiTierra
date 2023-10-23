

const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("doc");
const docIdHome = urlParams.get("docHome");

console.log("id:: ",docId);
const tipo = document.getElementById("tipo__audio");
const titulo = document.getElementById("titulo__audio");
const narradorAudio = document.getElementById("narrador");
const musicaF = document.getElementById("musica");

const audioElement = document.getElementById("audioE");
const textContentElement = document.getElementById("text_content");

async function fetchData() {
  try {
    const doc = await db.collection("audio").doc(docId).get();

    if (doc.exists) {
      const data = doc.data();
      tipo.innerText = data.tipoAudio;
      titulo.innerText = data.titulo;
      narradorAudio.innerText = `Narrado por: ${data.narrador}`;
      musicaF.innerText = `Música de Fondo: ${data.musica}`;

      const textURL = data.textURL;
      console.log("URL: ", textURL);
      audioElement.src = data.audioURL;

      const response = await fetch(textURL);
      if (!response.ok) {
        throw new Error(`Error al cargar el archivo de texto: ${response.status} - ${response.statusText}`);
      }

      const text = await response.text();
      textContentElement.textContent = text;
    } else {
      console.log("No se encontró el documento en Firestore.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
