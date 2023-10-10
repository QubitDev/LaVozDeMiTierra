document.getElementById("cancelButton").addEventListener("click", onCancel);
document.getElementById("submitButton").addEventListener("click", onSubmit);
const audioInput = document.getElementById("audioFileInput");
const textInput = document.getElementById("textFileInput");
// const mensajeError = document.getElementById();

function onCancel() {
  resetForm();
  window.location.href = "./../app.html";
}

function resetForm() {
  document.getElementById("audio__form").reset();
  audioInput.disabled = true;
  textInput.disabled = true;
}

function onSubmit(event) {
  event.preventDefault();
  let enviarDatos = true;


  const titulo = getValue("titulo_audio");
  const musica = getValue("musica_fondo");
  const procedencia = getValue("procedencia");
  const formato = getValue("formato_audio");
  const narrador = getValue("narrador");

  const tipoAudioElements = document.getElementsByName("tipo_audio");
  let tipo
  let tipoAudio = "";
  for (let i = 0; i < tipoAudioElements.length; i++) {
    if (tipoAudioElements[i].checked) {
      tipoAudioSeleccionado = tipoAudioElements[i].value;
      tipoAudioSelec = true;
      break;
    }
  }

  // Obtén el archivo de audio y el archivo de texto seleccionados
  const audio = audioInput.files[0];
  const text = textInput.files[0];

  // Crea un objeto FormData para enviar los archivos al servidor
  const formData = new FormData();
  formData.append("audio", audio);
  formData.append("text", text);

  // Validar longitud mínima de los campos
  if (!titulo || !musica || !procedencia || !formato || !narrador || !audio || !text) {
    alert("¡Error! Faltan Datos.");
    return;
  }
  
  // validar que este seleccionado un tipo de audio
  if (!tipoAudioSelec) {
    alert("Por favor, seleccione un tipo de audio.");
    return;
  }
  
  // Verifica si alguno de los campos requeridos está vacío
  const campos = [
    { valor: titulo, nombre: "Título de audio", longitudMinima: 4, elementoError: "error_titulo_audio" },
    { valor: musica, nombre: "Música de fondo", longitudMinima: 4, elementoError: "error_musica_fondo" },
    { valor: procedencia, nombre: "Procedencia", longitudMinima: 4, elementoError: "error_procedencia" },
    { valor: narrador, nombre: "Narrador", longitudMinima: 4, elementoError: "error_narrador" },
  ];

  for (const campo of campos) {
    const mensajeError = document.getElementById(campo.elementoError);
    if (campo.valor.length < campo.longitudMinima) {
      mensajeError.textContent = `El campo '${campo.nombre}' debe tener al menos ${campo.longitudMinima} caracteres.`;
      enviarDatos = false;
    } else {
      mensajeError.textContent = "";
    }
  }
  
  // Verifica si se deben enviar los datos o no
  if (!enviarDatos) {
    return;
  }
  


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

// function getValue(elementId) {
//   return document.getElementById(elementId).value;
// }

function validateTitle(inputElement) {
  const inputValue = inputElement.value;

  if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
    alert("No se admiten caracteres especiales en el Título del Audio.");
    inputElement.value = "";
  }
}
// obtener el valor del elemento por id
function getValue(id) {
  return document.getElementById(id).value;
}

// Captura de audio
audioFileInput.addEventListener("change", function () {
  const selectedAudioFile = audioInput.files[0];
  textInput.disabled = false;
  if (selectedAudioFile) {
    // Aquí puedes trabajar con el archivo de audio seleccionado
    console.log("Nombre del archivo de audio:", selectedAudioFile.name);
    console.log("Tipo del archivo de audio:", selectedAudioFile.type);
  }
});

// Validación de elección de elemento en el file chooser de audio
function updateAcceptAttribute() {
  const formatoSelect = document.getElementById("formato_audio");
  // const audioFileInput = document.getElementById("audioFileInput");

  switch (formatoSelect.value) {
    case "MP3":
      audioInput.disabled = false;
      audioInput.accept = ".mp3";
      // textInput.disabled = false;
      break;
    case "WAV":
      audioInput.disabled = false;
      audioInput.accept = ".wav";
      // textInput.disabled = false;
      break;
    case "AIFF":
      audioInput.disabled = false;
      audioInput.accept = ".aiff";
      // textInput.disabled = false;
      break;
    default:
      audioInput.disabled = true;
      audioInput.accept = "";
      // textInput.disabled = true;
  }
}

// Obtener la duración del audio
audioInput.addEventListener("change", function () {
  const audio = this.files[0];
  const durationField = document.getElementById("duracion");

  if (audio) {
    getAudioDuration(audio).then((duration) => {
      const minutes = parseFloat(duration);

      if (!isNaN(minutes) && minutes >= 3 && minutes <= 20) {
        durationField.value = duration;
        // textInput.disabled = false;
      } else {
        alert("La duración del audio debe estar entre 3 y 10 minutos.");
        this.value = "";
        durationField.value = "";
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
