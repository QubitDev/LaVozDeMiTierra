const cancel = document.getElementById("cancelButton");
if (cancel !== null) {
    cancel.addEventListener('click',onCancel);
}

const submit = document.getElementById("submitButton");
if (submit !== null) {
    submit.addEventListener('click', onSubmit);
}

const close_Popup = document.getElementById("okButton");
if (close_Popup != null) {
  close_Popup.addEventListener("click", closePopup);
}

const verify_Button = document.getElementById("verifyButton");
if (verify_Button !== null) {
  verify_Button.addEventListener("click",onVerifyButton);
}

const audioInput = document.getElementById("audioFileInput");
const textInput = document.getElementById("textFileInput");
const imageInput = document.getElementById("imageInput");

const okButton = document.getElementById('okButton');
const verifyButton = document.getElementById('verifyButton');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const windowAorE =document.getElementById('window_A_E');
const messagePopup = document.getElementById("message");
const formatoSelect = document.getElementById("formato_audio");
const durationField = document.getElementById("duracion");

var idDoc='';
const datos = {};
var bandera = true;

if (imageInput !== null) {
  imageInput.addEventListener("change", function () {
    const selectedImage = this.files[0]; // Obtén el archivo de imagen seleccionado

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

if (audioInput !== null) {
  audioInput.addEventListener("change", function () {
    const selectedAudioFile = this.files[0];
    
    durationField.style.display ='inline-block';
    textInput.disabled = false;

    if (selectedAudioFile) {
      // obtener duracion del audio
      getAudioDuration(selectedAudioFile).then((duration) => {
        const minutes = parseFloat(duration);

        if (!isNaN(minutes) && minutes >= 3 && minutes <= 20) {
          durationField.textContent = duration; 
          
        }

        const maxSizeInBytes = 20 * 1024 * 1024; 
        const peso = selectedAudioFile.size;

        if (selectedAudioFile.size > maxSizeInBytes) {
          let sizeArch =parseInt( (peso /1024)/1024);
          onMessagePopup(`❌¡Error!\nEl archivo exede el peso con: ${sizeArch} MB`, 400);
          this.value = null;
          durationField.textContent = ""; 
          document.getElementById("formato_audio").value = "";
          bandera = false;
          return;
        } else if(isNaN(minutes) || !(minutes >= 2 && minutes <= 20)){
          onMessagePopup(`❌¡Error!\nSubir audio de 3 a 10 minutos`, 400);
          this.value = null;
          durationField.textContent = ""; 
          document.getElementById("formato_audio").value = "";
          bandera = false;
          return;
        }
      });
    }else {
      durationField.value = "";
    }
  });
}

// Captura de texto

if (textInput!==null) {
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
}




// Validación de elección de elemento en el file chooser de audio
function updateAcceptAttribute() {
  audioInput.value = null;
  textInput.value = null;
  textInput.disabled = true;
  durationField.textContent = '';
  durationField.style.display='none';

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
  window.location.href = "./../html/homeAdm.html";
}

function resetForm() {
  document.getElementById("audio__form").reset();
  audioInput.disabled = true;
  textInput.disabled = true;
}

async function onSubmit(event) {
  event.preventDefault();
  overlay.style.display = 'block';
  
  let sendData = true;
  
  const titulo = getValue("titulo_audio");
  const musica = getValue("musica_fondo");
  const procedencia = getValue("procedencia");
  const formato = getValue("formato_audio");
  const narrador = getValue("narrador");
  
  const duracion = durationField.textContent;
  const isUnique = await isTitleUnique(titulo);

  
  
  if(!isUnique){
    onMessagePopup(`❌¡Error!\nEl título ya existe en la base de datos.`, 450);
    overlay.style.display = 'none';
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
  const audio = audioInput.files[0];
  const text = textInput.files[0];
  const image = imageInput.files[0];


  // Validar longitud mínima de los campos
  if (!titulo || !musica || !procedencia || !formato || !narrador || !audio || !text || !image) {
    onMessagePopup(`❌¡Error! Faltan Datos.`,350);
    overlay.style.display = 'none';
    return;
  }
  
  // validar que este seleccionado un tipo de audio
  if (!tipoAudio) {
    onMessagePopup(`❌¡Error!\nPor favor, seleccione un tipo de audio.`,400);
    overlay.style.display = 'none';
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
      overlay.style.display = 'none';
      sendData = false;
    } else {
      messageError.textContent = "";
    }
  }
  
  // Verifica si se deben enviar los datos o no
  if (!sendData) {
    overlay.style.display = 'none';
    return;
  }
  
  Object.assign(datos,{titulo, musica, procedencia, formato, tipoAudio, narrador, duracion});
  
  handleSubmit();
 

  // Realizar lógica de envío o procesamiento aquí
  console.log("Título:", titulo);
  console.log("Música de Fondo:", musica);
  console.log("Procedencia:", procedencia);
  console.log("Formato de Audio:", formato);
  console.log("Tipo de Audio:", tipoAudio);
  console.log("Narrador:", narrador);
  console.log("Duracion:", duracion )
  
  

  setTimeout(() => {
    overlay.style.display = 'none';
    document.querySelector(".wavi").style.display = 'none';
    onMessagePopup(`✅¡Se subió correctamente el audio!🎉`, 450); 
  }, 10000); // 10 segundos de espera
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

function onVerifyButton() {
  window.location.href = `./../../pages/html/reproducir.html?doc=${idDoc}`;
  resetForm();
}

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

  // Comprueba si el valor contiene caracteres no válidos después de eliminar un carácter
 /* if (!/^[a-zA-Z\s.]+$/.test(inputValue)) {
    onMessagePopup(`❌¡Error!\nNo puede contener caracteres especiales.`, 450);
    inputElement.value = '';
    return;
  }*/
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
  const audioFile = audioInput.files[0];
  const textFile = textInput.files[0];
  const imageFile = imageInput.files[0];

  try {
      const audioURL = await uploadFile(audioFile, 'audio/' + audioFile.name);
      const textURL = await uploadFile(textFile, 'texto/' + textFile.name);
      const imageURL = await uploadFile(imageFile, 'images/' + imageFile.name);
      
      console.log("Documento escrito con ID: ", audioURL);
      console.log("Documento escrito con ID: ", textURL);
      console.log("Documento escrito con ID: ", imageURL);

      datos.audioURL = audioURL;
      datos.reproducciones = 0;
      datos.textURL = textURL;
      datos.imageURL = imageURL;
      
      await db.collection("audio").add(datos)
      .then((docRef) => {
          idDoc = docRef.id;
          console.log("Documento escrito con ID: ", idDoc);
      })
      .catch((error) => {
          alert(`Error al agregar el documento: ${error}`);
      });
  console.log("id__doc",idDoc);

  } catch (error) {
    alert(`Error: ${error}`);
  }
}

