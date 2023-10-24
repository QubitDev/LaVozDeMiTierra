document.getElementById("cancelButton").addEventListener("click", onCancel);
document.getElementById("submitButton").addEventListener("click", onSubmit);
document.getElementById("okButton").addEventListener("click",closePopup);
document.getElementById("verifyButton").addEventListener("click",onVerifyButton);

const audioInput = document.getElementById("audioFileInput");
const textInput = document.getElementById("textFileInput");
const okButton = document.getElementById('okButton');
const verifyButton = document.getElementById('verifyButton');
const popup = document.getElementById('popup');
const windowAorE =document.getElementById('window_A_E');
const messagePopup = document.getElementById("message");
const id_doc ='';
const datos = {};
var bandera = true;



// Captura de audio
audioInput.addEventListener("change", function () {
  const selectedAudioFile = this.files[0];
  const durationField = document.getElementById("duracion");
  textInput.disabled = false;

  if (selectedAudioFile) {
    // obtener duracion del audio
    getAudioDuration(selectedAudioFile).then((duration) => {
      const minutes = parseFloat(duration);

      if (!isNaN(minutes) && minutes >= 3 && minutes <= 20) {
        durationField.value = duration;
      }
      const maxSizeInBytes = 20 * 1024 * 1024; 

      if(selectedAudioFile.size > maxSizeInBytes && (!isNaN(minutes) && minutes >= 3 && minutes <= 20) ){
      onMessagePopup(`❌¡Error!\nEl archivo exede el pero y tiempo de duracion`, 400);
      this.value = null;
      durationField.value = "";
      document.getElementById("formato_audio").value = "";
        bandera = false;
        return;
      }else if (selectedAudioFile.size > maxSizeInBytes) {
        onMessagePopup(`❌¡Error!\nDebe ser menor o igual a 20 MB.`, 400);
        this.value = null;
        bandera = false;
        return;
      }
    });

    
  }else {
    durationField.value = "";
  }
});


// // Obtener la duración del audio
// audioInput.addEventListener("change", function () {
//   const audio = this.files[0];
//   const durationField = document.getElementById("duracion");

//   if (audio) {
//     getAudioDuration(audio).then((duration) => {
//       const minutes = parseFloat(duration);

//       if (!isNaN(minutes) && minutes >= 3 && minutes <= 20) {
//         durationField.value = duration;
//       } else {
//         alert("La duración del audio debe estar entre 3 y 10 minutos.");
//         this.value = "";
//         durationField.value = "";
//         document.getElementById("formato_audio").value = "";
//       }
//     });
//   } else {
//     durationField.value = "";
//   }
// });


// Captura de texto
textInput.addEventListener("change", function () {
  const selectedTextFile = this.files[0];

  if (selectedTextFile) {
    // Validar el peso del archivo de texto
    const maxSizeInBytes = 500 * 1024; // 500KB en bytes
    if (selectedTextFile.size > maxSizeInBytes) {
      onMessagePopup(`❌¡Error!\nDebe ser menor o igual a 500 KB.`,400);
      this.value = null;
      return;
    }

    // Aquí puedes trabajar con el archivo de texto seleccionado
    console.log("Nombre del archivo de texto:", selectedTextFile.name);
    console.log("Tipo del archivo de texto:", selectedTextFile.type);
  }
});



// Validación de elección de elemento en el file chooser de audio
function updateAcceptAttribute() {
  const formatoSelect = document.getElementById("formato_audio");

  switch (formatoSelect.value) {
    case "MP3":
      audioInput.disabled = false;
      audioInput.accept = ".mp3";
      break;
    case "WAV":
      audioInput.disabled = false;
      audioInput.accept = ".wav";
      break;
    case "AIFF":
      audioInput.disabled = false;
      audioInput.accept = ".aiff";
      break;
    default:
      audioInput.disabled = true;
      audioInput.accept = "";
  }
}


function onCancel() {
  resetForm();
  window.location.href = "http://localhost/LaVozDeMiTierra/src/app/homeAdm/homeAdm.html";
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
  let tipoAudio = false;
  for (let i = 0; i < typeAudioElements.length; i++) {
    if (typeAudioElements[i].checked) {
      tipoAudio = typeAudioElements[i].value;
      break;
    }
  }

  // // Obtén el archivo de audio y el archivo de texto seleccionados
  const audio = audioInput.files[0];
  const text = textInput.files[0];


  // Validar longitud mínima de los campos
  if (!titulo || !musica || !procedencia || !formato || !narrador ||!duracion|| !audio || !text) {
    onMessagePopup(`❌¡Error! Faltan Datos.`,350);
    return;
  }
  
  // validar que este seleccionado un tipo de audio
  if (!tipoAudio) {
    onMessagePopup(`❌¡Error!\nPor favor, seleccione un tipo de audio.`,400);
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
    if (field.valor.length < field.minimumLength) {
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
  
  Object.assign(datos,{titulo, musica, procedencia, formato, tipoAudio, narrador, duracion});
  
  handleSubmit();
 

  // Realizar lógica de envío o procesamiento aquí
  // console.log("Título:", titulo);
  // console.log("Música de Fondo:", musica);
  // console.log("Procedencia:", procedencia);
  // console.log("Formato de Audio:", formato);
  // console.log("Tipo de Audio:", tipoAudio);
  // console.log("Narrador:", narrador);
  // console.log("Duracion:", duracion )
  
  onMessagePopup(`✅¡Se subio correctamente el audio!🎉`,450);
}


function onMessagePopup(messageX, length){
  messagePopup.textContent = `${messageX}`;
  windowAorE.style.width = `${length}px`;
  messagePopup.style.whiteSpace = 'pre-line'; 
  popup.style.display = 'flex';
  if(messageX.includes("❌")){
    okButton.style.display = 'block';
    verifyButton.style.display = 'none';
    
  } else{
    verifyButton.style.display = 'block';
    okButton.style.display = 'none';
  }
}

// cerrar popup
function closePopup(){
  popup.style.display = 'none';
}

// Función para manejar el botón "Verificar"
function onVerifyButton() {
  window.location.href = "http://localhost/LaVozDeMiTierra/src/app/pages/html/reproducir.html";
  resetForm();
}


function validateInput(inputElement) {
  const inputValue = inputElement.value;
  const placeholderText = inputElement.getAttribute("placeholder");

  // Comprobar si el valor contiene caracteres no válidos después de eliminar un carácter
  if (inputValue && !/^[a-zA-Z\s]+$/.test(inputValue)) {
    onMessagePopup(`❌¡Error!\nNo se admiten caracteres especiales en: ${placeholderText}`, 450);
    return;
  }
}
// obtener el valor del elemento por id
function getValue(id) {
  return document.getElementById(id).value;
}

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




function uploadFile(file, path) {
  return new Promise((resolve, reject) => {
      const storageRef = storage.ref(path);
      const uploadTask = storageRef.put(file);

      uploadTask.on('state_changed', 
          (snapshot) => {
          }, 
          (error) => {
              reject(error);
          }, 
          () => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  resolve(downloadURL);
              });
          }
      );
  });
}

async function handleSubmit() {
  const audioFile = document.getElementById('audioFileInput').files[0];
  const textFile = document.getElementById('textFileInput').files[0];

  try {
      const audioURL = await uploadFile(audioFile, 'audio/' + audioFile.name);
      const textURL = await uploadFile(textFile, 'texto/' + textFile.name);

      datos.audioURL = audioURL;
      datos.textURL = textURL;
      
      await db.collection("audio").add(datos)
      .then((docRef) => {
          console.log("Documento escrito con ID: ", docRef.id);
      })
      .catch((error) => {
          Alert(`Error al agregar el documento: ${error}`);
      });

  } catch (error) {
    Alert(`Error: ${error}`);
  }
}
