document.getElementById("cancelButton").addEventListener("click", onCancel);
document.getElementById("submitButton").addEventListener("click", onSubmit);
const audioFileInput = document.getElementById("audioFileInput");
const textFileInput = document.getElementById("textFileInput");

function onCancel() {
  resetForm();
}

function resetForm() {
  document.getElementById("audio__form").reset();
  this.audioFileInput.disabled = true;
  document.getElementById("textFileInput").disabled = true;
}

function onSubmit(event) {
  event.preventDefault();

  const titulo = getValue("titulo_audio");
  const musica = getValue("musica_fondo");
  const procedencia = getValue("procedencia");
  const formato = getValue("formato_audio");
  const narrador = getValue("narrador");

  const tipoAudioElements = document.getElementsByName("tipo_audio");
  let tipoAudio = "";
  for (let i = 0; i < tipoAudioElements.length; i++) {
    if (tipoAudioElements[i].checked) {
      tipoAudioSeleccionado = tipoAudioElements[i].value;
      break;
    }
  }

  // Obtén el archivo de audio y el archivo de texto seleccionados
  const audioFile = document.getElementById("audioFileInput").files[0];
  const textFile = document.getElementById("textFileInput").files[0];

  // Crea un objeto FormData para enviar los archivos al servidor
  const formData = new FormData();
  formData.append("audioFile", audioFile);
  formData.append("textFile", textFile);

  //   // Envía los archivos al servidor utilizando fetch
  //   fetch("/guardar-archivos", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       alert(data.mensaje);
  //       resetForm();
  //     })
  //     .catch((error) => {
  //       alert("Error al enviar los archivos");
  //     });

  // Realizar lógica de envío o procesamiento aquí
  console.log("Título:", titulo);
  console.log("Música de Fondo:", musica);
  console.log("Procedencia:", procedencia);
  console.log("Formato de Audio:", formato);
  console.log("Tipo de Audio:", tipoAudio);
  console.log("Narrador:", narrador);

  // Restablecer el formulario
  resetForm();
}

function getValue(elementId) {
  return document.getElementById(elementId).value;
}

function validateTitle(inputElement) {
  const inputValue = inputElement.value;

  if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
    alert("No se admiten caracteres especiales en el Título del Audio.");
    inputElement.value = "";
  }
}
function getValue(id) {
  return document.getElementById(id).value;
}


// Captura de audio

audioFileInput.addEventListener("change", function () {
  const selectedAudioFile = audioFileInput.files[0];

  if (selectedAudioFile) {
    // Aquí puedes trabajar con el archivo de audio seleccionado
    console.log("Nombre del archivo de audio:", selectedAudioFile.name);
    console.log("Tipo del archivo de audio:", selectedAudioFile.type);
  }
});

// Validación de elección de elemento en el file chooser de audio
// document
function updateAcceptAttribute() {
  const formatoSelect = document.getElementById("formato_audio");
  const audioFileInput = document.getElementById("audioFileInput");

  switch (formatoSelect.value) {
    case "MP3":
      audioFileInput.disabled = false;
      audioFileInput.accept = ".mp3";
      break;
    case "WAV":
      audioFileInput.disabled = false;
      audioFileInput.accept = ".wav";
      break;
    case "AIFF":
      audioFileInput.disabled = false;
      audioFileInput.accept = ".aiff";
      break;
    default:
      audioFileInput.disabled = true;
      audioFileInput.accept = "";
  }
}
// Obtener la duración del audio
audioFileInput.addEventListener("change", function () {
  const audioFile = this.files[0];
  const durationField = document.getElementById("duracion");

  if (audioFile) {
    getAudioDuration(audioFile).then((duration) => {
      const minutes = parseFloat(duration);

      if (!isNaN(minutes) && minutes >= 3 && minutes <= 20) {
        durationField.value = duration;
        // this.disabled = false;
      } else {
        alert("La duración del audio debe estar entre 3 y 10 minutos.");
        this.value = "";
        duracionField.value = "";
        // this.disabled = true;
        document.getElementById("formato_audio").value = "";
      }
    });
  } else {
    duracionField.value = "";
    // this.disabled = false;
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
