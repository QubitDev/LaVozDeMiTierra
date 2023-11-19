const getAttributes = (function () {
  const cancel = document.getElementById("cancelButton");
  const submit = document.getElementById("submitButton");
  const close_Popup = document.getElementById("okButton");
  const verify_Button = document.getElementById("verifyButton");
  
  const audioInput = document.getElementById("audioFileInput");
  const textInput = document.getElementById("textFileInput");
  const imageInput = document.getElementById("imageInput");
  
  const okButton = document.getElementById('okButton');
  const verifyButton = document.getElementById('verifyButton');
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  const windowAorE = document.getElementById('window_A_E');
  const messagePopup = document.getElementById("message");
  const formatoSelect = document.getElementById("formato_audio");
  const durationField = document.getElementById("duracion");
  var idDoc = [];
  const datos = {};
  var bandera = true;

  return {
    cancel,
    submit,
    close_Popup,
    verify_Button,
    audioInput,
    textInput,
    imageInput,
    okButton,
    verifyButton,
    popup,
    overlay,
    windowAorE,
    messagePopup,
    formatoSelect,
    durationField,
    idDoc,
    datos,
    bandera,
  };
})();

if (getAttributes.cancel !== null) {
  getAttributes.cancel.addEventListener('click', onCancel);
}

if (getAttributes.submit !== null){
  getAttributes.submit.addEventListener('click', onSubmit);
}

if (getAttributes.close_Popup != null) {
  getAttributes.close_Popup.addEventListener("click", closePopup);
}

if (getAttributes.verify_Button !== null) {
  getAttributes.verify_Button.addEventListener("click",onVerifyButton);
}

if (getAttributes.imageInput !== null) {
  getAttributes.imageInput.addEventListener("change", function () {
    const selectedImage = this.files[0];

    const imagePreview = document.getElementById("imagePreview");
    const frase = document.getElementById("frase");

    frase.style.display = "none";
    imagePreview.style.display = "block";

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(selectedImage);
    } else {
      imagePreview.src = "";
    }
  });
    
}

// Captura de audio

if (getAttributes.audioInput !== null) {
  getAttributes.audioInput.addEventListener("change", function () {
    const selectedAudioFile = this.files[0];
    
    getAttributes.durationField.style.display ='inline-block';
    getAttributes.textInput.disabled = false;

    if (selectedAudioFile) {
      // obtener duracion del audio
      getAudioDuration(selectedAudioFile).then((duration) => {
        const minutes = parseFloat(duration);

        if (!isNaN(minutes) && minutes >= 3 && minutes <= 20) {
          getAttributes.durationField.textContent = duration; 
          
        }

        const maxSizeInBytes = 20 * 1024 * 1024; 
        const peso = selectedAudioFile.size;

        if (selectedAudioFile.size > maxSizeInBytes) {
          let sizeArch =parseInt( (peso /1024)/1024);
          onMessagePopup(`❌¡Error!\nEl archivo exede el peso con: ${sizeArch} MB`, 400);
          this.value = null;
          getAttributes.durationField.textContent = ""; 
          document.getElementById("formato_audio").value = "";
          bandera = false;
          return;
        } else if(isNaN(minutes) || !(minutes >= 2 && minutes <= 20)){
          onMessagePopup(`❌¡Error!\nSubir audio de 3 a 10 minutos`, 400);
          this.value = null;
          getAttributes.durationField.textContent = ""; 
          document.getElementById("formato_audio").value = "";
          getAttributes.bandera = false;
          return;
        }
      });
    }else {
      getAttributes.durationField.value = "";
    }
  });
}

// Captura de texto

if (getAttributes.textInput!==null) {
  getAttributes.textInput.addEventListener("change", function () {
    const selectedTextFile = this.files[0];
    if (selectedTextFile) {
      // Validar el peso del archivo de texto
      const maxSizeInBytes = 500 * 1024; // 500KB en bytes
      if (selectedTextFile.size > maxSizeInBytes) {
        onMessagePopup(`❌¡Error!\nDebe ser menor o igual a 500 KB.`,400);
        this.value = null;
        return;
      }
    }
  });
}




// Validación de elección de elemento en el file chooser de audio
function updateAcceptAttribute() {
  getAttributes.audioInput.value = '';
  getAttributes.textInput.value = '';
  getAttributes.textInput.disabled = true;
  getAttributes.durationField.textContent = '';
  getAttributes.durationField.style.display='none';

  switch (getAttributes.formatoSelect.value) {
    case "MP3":
      getAttributes.audioInput.disabled = false;
      getAttributes.audioInput.accept = ".mp3";
      break;
    case "WAV":
      getAttributes.audioInput.disabled = false;
      getAttributes.audioInput.accept = ".wav";
      break;
    case "AIFF":
      getAttributes.audioInput.disabled = false;
      getAttributes.audioInput.accept = ".aiff";
      break;
    default:
      getAttributes.audioInput.disabled = true;
      getAttributes.audioInput.accept = "";
  }
}


function onCancel() {
  resetForm();
  window.location.reload();
}

function resetForm() {
  document.getElementById("audio__form").reset();
  getAttributes.audioInput.disabled = true;
  getAttributes.textInput.disabled = true;
}

async function onSubmit(event) {
  event.preventDefault();
  getAttributes.overlay.style.display = 'block';
  
  let sendData = true;
  
  const titulo = getValue("titulo_audio");
  const musica = getValue("musica_fondo");
  const procedencia = getValue("procedencia");
  const formato = getValue("formato_audio");
  const narrador = getValue("narrador");
  
  const duracion = getAttributes.durationField.textContent;
  const isUnique = await isTitleUnique(titulo);

  
  
  if(!isUnique){
    onMessagePopup(`❌¡Error!\nEl título ya existe en la base de datos.`, 450);
    getAttributes.overlay.style.display = 'none';
    return
  }

  const typeAudioElements = document.getElementsByName("tipo_audio");
  let tipoAudio = false;
  for (let i = 0; i < typeAudioElements.length; i++) {
    if (typeAudioElements[i].checked) {
      tipoAudio = typeAudioElements[i].value;
      break;
    }
  }

  // // Obtén el archivo de audio y el archivo de texto seleccionados
  const audio = getAttributes.audioInput.files[0];
  const text = getAttributes.textInput.files[0];
  const image = getAttributes.imageInput.files[0];


  // Validar longitud mínima de los campos
  if (!titulo || !musica || !procedencia || !formato || !narrador || !audio || !text || !image) {
    onMessagePopup(`❌¡Error! Faltan Datos.`,350);
    getAttributes.overlay.style.display = 'none';
    return;
  }
  
  // validar que este seleccionado un tipo de audio
  if (!tipoAudio) {
    onMessagePopup(`❌¡Error!\nPor favor, seleccione un tipo de audio.`,400);
    getAttributes.overlay.style.display = 'none';
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
      getAttributes.overlay.style.display = 'none';
      sendData = false;
    } else {
      messageError.textContent = "";
    }
  }
  
  // Verifica si se deben enviar los datos o no
  if (!sendData) {
    getAttributes.overlay.style.display = 'none';
    return;
  }
  
  Object.assign(getAttributes.datos,{titulo, musica, procedencia, formato, tipoAudio, narrador, duracion});
  
  handleSubmit();
  
  setTimeout(() => {
    getAttributes.overlay.style.display = 'none';
    document.querySelector(".wavi").style.display = 'none';
    onMessagePopup(`✅¡Se subió correctamente el audio!🎉`, 450); 
  }, 10000); // 10 segundos de espera
}



function onMessagePopup(messageX, length){
  getAttributes.messagePopup.textContent = `${messageX}`;
  getAttributes.windowAorE.style.width = `${length}px`;
  getAttributes.messagePopup.style.whiteSpace = 'pre-line'; 
  getAttributes.popup.style.display = 'flex';
  if(messageX.includes("❌")){
    getAttributes.okButton.style.display = 'block';
    getAttributes.verifyButton.style.display = 'none';
    
  } else{
    getAttributes.verifyButton.style.display = 'block';
    getAttributes.okButton.style.display = 'none';
  }
}

// cerrar popup
function closePopup(){
  getAttributes.popup.style.display = 'none';
}

function onVerifyButton() {
  getAttributes.idDoc.push(user);
  const encodedArray = getAttributes.idDoc.map(item => encodeURIComponent(item)).join(",");
  window.location.href = `./html/reproducirAdm.html?data=${encodedArray}`;
  resetForm();
}
// 
function validateInput(inputElement) {
  const inputValue = inputElement.value.trim(); // Eliminar espacios en blanco al principio y al final
  const placeholderText = inputElement.getAttribute("placeholder");

  if (!inputValue) {
    inputElement.value = '';
    return;
  }

  // Comprueba si el primer carácter es una letra
  if (!/^[a-zA-Z]/.test(inputValue)) {
    onMessagePopup(`❌¡Error!\nNo puede contener caracteres especiales.`, 450);
    inputElement.value = '';
    return;
  }

  // Comprueba si el valor contiene números
  if (/\d/.test(inputValue)) {
    onMessagePopup(`❌¡Error!\n${placeholderText} no puede contener números.`, 450);
    inputElement.value = '';
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

// verificacion de documento con el mismo titulo
async function isTitleUnique(title){
  const querySnapshot = await db.collection('audio').where('titulo','==',title).get();
  return querySnapshot.empty;
}

/*-----------------------------------------------KEVIN----------------------------------------------------- */

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
  const audioFile = getAttributes.audioInput.files[0];
  const textFile = getAttributes.textInput.files[0];
  const imageFile = getAttributes.imageInput.files[0];

  try {
      const audioURL = await uploadFile(audioFile, 'audio/' + audioFile.name);
      const textURL = await uploadFile(textFile, 'texto/' + textFile.name);
      const imageURL = await uploadFile(imageFile, 'images/' + imageFile.name);
      
      console.log("Documento escrito con ID: ", audioURL);
      console.log("Documento escrito con ID: ", textURL);
      console.log("Documento escrito con ID: ", imageURL);

      getAttributes.datos.audioURL = audioURL;
      getAttributes.datos.reproducciones = 0;
      getAttributes.datos.textURL = textURL;
      getAttributes.datos.imageURL = imageURL;
      
      await db.collection("audio").add(getAttributes.datos)
        .then((docRef) => {
        console.log(`id:${docRef.id}`)
          getAttributes.idDoc.push(docRef.id);
          console.log("Documento escrito con ID: ", getAttributes.idDoc[0]);
      })
      .catch((error) => {
          alert(`Error al agregar el documento: ${error}`);
      });
    
    console.log("id__doc",getAttributes.idDoc[0]);

  } catch (error) {
    alert(`Error: ${error}`);
  }
}

