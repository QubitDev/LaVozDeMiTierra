// // Agregar evento clic al botón "Cancelar"
document.getElementById("cancelButton").addEventListener("click", onCancel);

// Agregar evento clic al botón "Subir"
document.getElementById("submitButton").addEventListener("click", onSubmit);

// Función para manejar el clic en el botón "Cancelar"
function onCancel() {
  resetForm();
}

function onSubmit(event) {
  event.preventDefault();

  // Obtener valores de los campos de formulario
  const title = getValue("titulo_audio");
  const musica = getValue("musica_fondo");
  const procedencia = getValue("procedencia");
    const formato = getValue("formato_audio");
    const categoria = getValue()

  // Realizar lógica de envío o procesamiento aquí
  console.log("Título:", title);
  console.log("Música de Fondo:", musica);
  console.log("Procedencia:", procedencia);
  console.log("Formato de Audio:", formato);

  // Restablecer el formulario
  resetForm();
}

function resetForm() {
  document.getElementById("audioForm").reset();
}

function getValue(id) {
  return document.getElementById(id).value;
}

// Captura de audio
const audioFileInput = document.getElementById("audioFileInput");

audioFileInput.addEventListener("change", function () {
  const selectedAudioFile = audioFileInput.files[0];

  if (selectedAudioFile) {
    // Aquí puedes trabajar con el archivo de audio seleccionado
    console.log("Nombre del archivo de audio:", selectedAudioFile.name);
    console.log("Tipo del archivo de audio:", selectedAudioFile.type);
  }
});

// Validación de elección de elemento en el file chooser de audio
document
  .getElementById("formato_audio")
  .addEventListener("change", updateAcceptAttribute);

function updateAcceptAttribute() {
  const formatoSelect = document.getElementById("formato_audio");
  const audioFileInput = document.getElementById("audioFileInput");

  switch (formatoSelect.value) {
    case "MP3":
      audioFileInput.accept = ".mp3";
      audioFileInput.disabled = false;
      break;
    case "WAV":
      audioFileInput.accept = ".wav";
      audioFileInput.disabled = false;
      break;
    case "AIFF":
      audioFileInput.accept = ".aiff";
      audioFileInput.disabled = false;
      break;
    default:
      audioFileInput.disabled = true;
  }
}

// Obtener la duración del audio
audioFileInput.addEventListener("change", function () {
  const audioFile = this.files[0];
  const duracionField = document.getElementById("duracion");

  if (audioFile) {
    getAudioDuration(audioFile).then((duration) => {
      const minutes = parseFloat(duration);

      if (!isNaN(minutes) && minutes >= 5 && minutes <= 20) {
        duracionField.value = duration;
        this.disabled = false;
      } else {
        alert("La duración del audio debe estar entre 5 y 10 minutos.");
        this.value = "";
        duracionField.value = "";
        this.disabled = true;
        document.getElementById("formato_audio").value = null;
      }
    });
  } else {
    duracionField.value = "";
    this.disabled = false;
  }
});

// Función para obtener la duración del archivo de audio
function getAudioDuration(file) {
  return new Promise((resolve) => {
    const audioElement = document.createElement("audio");
    audioElement.src = URL.createObjectURL(file);

    audioElement.addEventListener("loadedmetadata", () => {
      const durationInSeconds = audioElement.duration;
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = Math.floor(durationInSeconds % 60);

      const formattedDuration = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
      resolve(formattedDuration);
    });
  });
}