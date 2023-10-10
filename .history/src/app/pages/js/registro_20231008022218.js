document.getElementById("cancelButton").addEventListener("click", onCancel);
document.getElementById("submitButton").addEventListener("click", onSubmit);
document.getElementById("okButton").addEventListener("click",closePopup);

const audioInput = document.getElementById("audioFileInput");
const textInput = document.getElementById("textFileInput");
// const mensajeError = document.getElementById();
const okButton = document.getElementById('okButton');
const popup = document.getElementById('popup');
const windowAorE =document.getElementById('window_A_E');
const messageError = document.getElementById("message");

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
  let sendData = true;
  
  const titulo = getValue("titulo_audio");
  const musica = getValue("musica_fondo");
  const procedencia = getValue("procedencia");
  const formato = getValue("formato_audio");
  const narrador = getValue("narrador");
  const duracion = getValue("duracion");

  const typeAudioElements = document.getElementsByName("tipo_audio");
  let selectedAudioType = false;
  let tipoAudio = "";
  for (let i = 0; i < typeAudioElements.length; i++) {
    if (typeAudioElements[i].checked) {
      selectedAudioType = typeAudioElements[i].value;
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
  if (!titulo || !musica || !procedencia || !formato || !narrador ||!duracion|| !audio || !text) {
    messageError.textContent = `❌¡Error! <> Faltan Datos.`;
    messageError.style.whiteSpace = 'pre-line'; 
    popup.style.display = 'flex';
    okButton.style.display = 'block';
    return;
  }
  
  // validar que este seleccionado un tipo de audio
  if (!selectedAudioType) {
    messageError.textContent  = `❌¡Error!<br>Por favor, seleccione un tipo de audio.`;
    popup.style.display = 'flex';
    windowAorE.style.width = '350px';
    okButton.style.display = 'block';
    return;
  }
  
  // Verifica si alguno de los campos requeridos está vacío
  const fields = [
    { valor: titulo, name: "Título de audio", minimumLength: 4, errorElement: "error_titulo_audio" },
    { valor: musica, name: "Música de fondo", minimumLength: 4, errorElement: "error_musica_fondo" },
    { valor: procedencia, name: "Procedencia", minimumLength: 4, errorElement: "error_procedencia" },
    { valor: narrador, name: "Narrador", minimumLength: 4, errorElement: "error_narrador" },
  ];

  for (const field of fields) {
    const messageError = document.getElementById(field.errorElement);
    if (campo.valor.length < field.minimumLength) {
      messageError.textContent = `El campo '${field.name}' debe tener al menos ${field.minimumLength} caracteres.`;
      sendData = false;
    } else {
      messageError.textContent = "";
    }
  }
  
  // Verifica si se deben enviar los datos o no
  if (!sendData) {
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

  popup.style.display = 'flex';

  // Restablecer el formulario
  resetForm();
}

// cerrar popup
function closePopup(){
  popup.style.display = 'none';
}

// Función para manejar el botón "Verificar"
function VerifyButton() {
  window.location.href = "./../app.html";
}


// function getValue(elementId) {
//   return document.getElementById(elementId).value;
// }

function validateTitle(inputElement) {
  const inputValue = inputElement.value;
  const placeholderText = inputElement.getAttribute("placeholder");

  if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
    messageError.textContent  = `❌¡Error!<br>No se admiten caracteres especiales en: ${placeholderText}`;
    popup.style.display = 'flex';
    windowAorE.style.width = '350px'
    okButton.style.display = 'block';
    return;
    // inputElement.value = "";
  }
}
// obtener el valor del elemento por id
function getValue(id) {
  return document.getElementById(id).value;
}

// Captura de audio
audioInput.addEventListener("change", function () {
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
