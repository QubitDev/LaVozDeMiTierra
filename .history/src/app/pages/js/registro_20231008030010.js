document.getElementById("cancelButton").addEventListener("click", onCancel);
document.getElementById("submitButton").addEventListener("click", onSubmit);
document.getElementById("okButton").addEventListener("click",closePopup);
document.getElementById("okButton").addEventListener("click",verifyButton);

const audioInput = document.getElementById("audioFileInput");
const textInput = document.getElementById("textFileInput");
// const mensajeError = document.getElementById();
const okButton = document.getElementById('okButton');
const verifyButton = document.getElementById('verifyButton');
const popup = document.getElementById('popup');
const windowAorE =document.getElementById('window_A_E');
const messagePopup = document.getElementById("message");

function onCancel() {
  resetForm();
  window.location.href = "./../app.html";
}

function resetForm() {
  document.getElementById("audio__form").reset();
  this.audioInput.disabled = true;
  this.textInput.disabled = true;
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
  const audio = this.audioInput.files[0];
  const text = this.textInput.files[0];

  // Crea un objeto FormData para enviar los archivos al servidor
  const formData = new FormData();
  formData.append("audio", audio);
  formData.append("text", text);

  // Validar longitud mínima de los campos
  if (!titulo || !musica || !procedencia || !formato || !narrador ||!duracion|| !audio || !text) {
    this.messagePopup.textContent = `❌¡Error! Faltan Datos.`;
    this.windowAorE.style.width = '350px';
    this.popup.style.display = 'flex';
    this.okButton.style.display = 'block';
    return;
  }
  
  // validar que este seleccionado un tipo de audio
  if (!selectedAudioType) {
    this.messagePopup.textContent  = `❌¡Error!\nPor favor, seleccione un tipo de audio.`;
    this.popup.style.display = 'flex';
    this.messagePopup.style.whiteSpace = 'pre-line'; 
    this.windowAorE.style.width = '400px';
    this.okButton.style.display = 'block';
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

  
  
  // Restablecer el formulario
  resetForm();
  
  messageCongratulations();
}
messageCongratulations(){
  
}
// cerrar popup
function closePopup(){
  this.popup.style.display = 'none';
}

// Función para manejar el botón "Verificar"
function verifyButton() {
  window.location.href = "./../app.html";
}


// function getValue(elementId) {
//   return document.getElementById(elementId).value;
// }

function validateTitle(inputElement) {
  const inputValue = inputElement.value;
  const placeholderText = inputElement.getAttribute("placeholder");

  if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
    this.messagePopup.textContent  = `❌¡Error!<br>No se admiten caracteres especiales en: ${placeholderText}`;
    this.messagePopup.style.whiteSpace = 'pre-line'; 
    this.popup.style.display = 'flex';
    this.windowAorE.style.width = '400px';
    this.okButton.style.display = 'block';
    return;
  }
}
// obtener el valor del elemento por id
function getValue(id) {
  return document.getElementById(id).value;
}

// Captura de audio
audioInput.addEventListener("change", function () {
  const selectedAudioFile = this.audioInput.files[0];
  this.textInput.disabled = false;
  if (selectedAudioFile) {
    // Aquí puedes trabajar con el archivo de audio seleccionado
    console.log("Nombre del archivo de audio:", selectedAudioFile.name);
    console.log("Tipo del archivo de audio:", selectedAudioFile.type);
  }
});

// Validación de elección de elemento en el file chooser de audio
function updateAcceptAttribute() {
  const formatoSelect = document.getElementById("formato_audio");

  switch (formatoSelect.value) {
    case "MP3":
      this.audioInput.disabled = false;
      this.audioInput.accept = ".mp3";
      break;
    case "WAV":
      this.audioInput.disabled = false;
      this.audioInput.accept = ".wav";
      break;
    case "AIFF":
      this.audioInput.disabled = false;
      this.audioInput.accept = ".aiff";
      break;
    default:
      this.audioInput.disabled = true;
      this.audioInput.accept = "";
  }
}

// Obtener la duración del audio
this.audioInput.addEventListener("change", function () {
  const audio = this.files[0];
  const durationField = document.getElementById("duracion");

  if (audio) {
    getAudioDuration(audio).then((duration) => {
      const minutes = parseFloat(duration);

      if (!isNaN(minutes) && minutes >= 3 && minutes <= 20) {
        durationField.value = duration;
      } else {
        alert("La duración del audio debe estar entre 3 y 10 minutos.");
        this.value = "";
        durationField.value = "";
        document.getElementById("formato_audio").value = "";
      }
    });
  } else {
    durationField.value = "";
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
