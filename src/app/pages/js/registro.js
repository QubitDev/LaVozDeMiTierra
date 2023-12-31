
const container = document.querySelector('.container__body');
const rain = () => {
    let j = 0;
    while (j <= 80){
        let gout = document.createElement('o');
        let x = innerWidth * Math.random();
        let time = 1 * Math.random();
        gout.style.animationDuration = time <= 0.4 ? (time + 0.4) + 's'  : time + 's';
        gout.style.animationDelay = time + 's';
        gout.style.left = x + 'px';
        container.appendChild(gout);
        j++;
    }
}
rain();

//*********************************************** REGISTRO AUDIO ********************************************* */ 
document.getElementById("cancelButton").addEventListener("click", onCancel);
document.getElementById("submitButton").addEventListener("click", onSubmit);
document.getElementById("okButton").addEventListener("click",closePopup);
document.getElementById("verifyButton").addEventListener("click",onVerifyButton);

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

imageInput.addEventListener("change", function () {
  const selectedImage = this.files[0]; // Obtén el archivo de imagen seleccionado

  const imagePreview = document.getElementById("imagePreview");
  const frase = document.getElementById("frase");

  frase.style.display = "none";
  imagePreview.style.display = "block";

  if (selectedImage) {
    const allowedImageTypes = ["image/jpeg", "image/png"];

    if (!allowedImageTypes.includes(selectedImage.type)) {
      onMessagePopup(`❌¡Error!\nTipo de archivo de imagen no permitido.`, 400);
      this.value = null;
      imagePreview.src = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(selectedImage);
  } else {
    imagePreview.src = "";
  }
});

// Captura de audio
audioInput.addEventListener("change", function () {
  const selectedAudioFile = this.files[0];
  
  durationField.style.display ='inline-block';
  textInput.disabled = false;
  if (selectedAudioFile) {
    // const allowedAudioTypes = ["audio/mpeg","audio/aiff", "audio/wav", "audio/mp3"];
    console.log(`type;${selectedAudioFile.type}`);
    if (this.accept !== selectedAudioFile.type) {
      // onMessagePopup(`❌¡Error!\nTipo de archivo de audio no permitido.`, 400);
      this.value = null;
      durationField.textContent = ""; 
      formatoSelect.value = "null";
      audioInput.disabled = true;
      textInput.disabled = true;
      return;
    }

    // obtener duración del audio
    getAudioDuration(selectedAudioFile).then((duration) => {
      const minutes = parseFloat(duration);

      if (!isNaN(minutes) && minutes >= 3 && minutes <= 20) {
        durationField.textContent = duration;
      } else {
        onMessagePopup(`❌¡Error!\nSubir audio de 3 a 20 minutos`, 400);
        this.value = null;
        durationField.textContent = ""; 
        formatoSelect.value = "null";
      }
    });
  }else {
    durationField.value = "";
  }
});

// Captura de texto
textInput.addEventListener("change", function () {
  const selectedTextFile = this.files[0];
  if (selectedTextFile) {
    const allowedTextTypes = ["text/plain"];

    if (!allowedTextTypes.includes(selectedTextFile.type)) {
      // onMessagePopup(`❌¡Error!\nTipo de archivo de texto no permitido.`, 400);
      this.value = null;
      imageInput.disabled = true;
      return;
    }

    const maxSizeInBytes = 500 * 1024; // 500KB en bytes
    if (selectedTextFile.size > maxSizeInBytes) {
      // onMessagePopup(`❌¡Error!\nDebe ser menor o igual a 500 KB.`,400);
      this.value = null;
      return;
    }

  }
  imageInput.disabled = false;
});



// Validación de elección de elemento en el file chooser de audio
function updateAcceptAttribute() {
  audioInput.value = null;
  textInput.value = null;
  textInput.disabled = true;
  imageInput.disabled = true;
  durationField.textContent = '';
  durationField.style.display='none';

  switch (formatoSelect.value) {
    case "MP3":
      audioInput.disabled = false;
      audioInput.accept = "audio/mpeg";
      break;
    case "WAV":
      audioInput.disabled = false;
      audioInput.accept = "audio/wav";
      break;
    case "AIFF":
      audioInput.disabled = false;
      audioInput.accept = "audio/aiff";
      break;
    default:
      audioInput.disabled = true;
      audioInput.accept = "";
  }
}


function onCancel() {
  resetForm();
  window.location.href = "./../../homeAdm/homeAdm.html";
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
  }, 20000); // 20 segundos de espera
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



function validateInput(inputElement) {
  const inputValue = inputElement.value.trim(); // Eliminar espacios en blanco al principio y al final
  const placeholderText = inputElement.getAttribute("placeholder");

  if (!inputValue) {
    // // El campo está vacío después de eliminar espacios en blanco
    // onMessagePopup(`❌¡Error!\nFaltan Datos.`, 450);
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
  /*if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
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
      
      datos.audioURL = audioURL;
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

function onVerifyButton() {
  window.location.href = `./../html/reproduccirAdm.html?doc=${idDoc}`;  
  resetForm();
}

const endSesion = document.querySelector(".sesion");
endSesion.addEventListener('click',cerrarSesion);

let cont = 1;
function cerrarSesion(){
    if(cont % 2 == 0){
        document.getElementById('sesionMenu').style.display= 'none';
    }
    else{
        document.getElementById('sesionMenu').style.display= 'block';
    }
    cont++;
}