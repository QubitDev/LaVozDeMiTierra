// class FormRegisterComponent {
//   constructor() {
//     this.files = [];
//     this.audioForm = new FormGroup({
//       Title: new FormControl("", [
//         Validators.required,
//         Validators.minLength(10),
//         Validators.maxLength(30),
//         Validators.pattern("^[a-zA-Z0-9\\s]+$"),
//       ]),
//       Musica: new FormControl("", [
//         Validators.required,
//         Validators.maxLength(50),
//         Validators.minLength(50),
//         Validators.pattern("^[a-zA-Z\\s]+$"),
//       ]),
//       Procedencia: new FormControl("", [
//         Validators.required,
//         Validators.maxLength(30),
//         Validators.minLength(4),
//         Validators.pattern("^[a-zA-Z\\s]+$"),
//       ]),
//       formato: new FormControl("----", Validators.required),
//       Tipo: new FormControl("", Validators.required),
//       narrador: new FormControl("", [
//         Validators.required,
//         Validators.maxLength(50),
//         Validators.minLength(2),
//         Validators.pattern("^[a-zA-Z\\s]+$"),
//       ]),
//       duracion: new FormControl("", Validators.required),
//       inputMusica: new FormControl(null, Validators.required),
//       inputTxt: new FormControl(null, Validators.required),
//     });
//     this.formatFile = "";
//     this.duracion = "";
//     this.selectedTipo = "";
//   }

//   ngOnInit() {}

//   captureFile(event, audioForm) {
//     const tipoAudioElement = audioForm.get("tipo_audio");
//     if (tipoAudioElement !== null && tipoAudioElement !== undefined) {
//       this.selectedTipo = tipoAudioElement.value;
//     } else {
//       this.selectedTipo = "";
//     }
//     const capturedFile = event.target.files[0];
//     const formData = audioForm.value;
//     this.files.push(capturedFile, formData);
//   }

//   captureAudio(event) {
//     const capturedFile = event.target.files[0];
//     if (capturedFile) {
//       this.getAudioDuration(capturedFile).then((duration) => {
//         this.duracion = duration;
//       });
//     }
//     this.files.push(capturedFile);
//   }

//   uploadFile() {
//     try {
//       const formData = new FormData();
//       this.files.forEach((file) => {
//         formData.append("files", file);
//         console.log(file);
//       });
//       // Lógica para subir archivos
//     } catch (error) {
//       console.log("error", error);
//     }
//   }

//   reset() {
//     this.audioForm.reset();
//   }

//   updateAcceptAttribute(event) {
//     const selectedFormat = event.target.value;
//     switch (selectedFormat) {
//       case "MP3":
//         this.formatFile = ".mp3";
//         break;
//       case "WAV":
//         this.formatFile = ".wav";
//         break;
//       case "AIFF":
//         this.formatFile = ".aiff";
//         break;
//     }
//   }

//   async getAudioDuration(file) {
//     return new Promise((resolve, reject) => {
//       const audioElement = new Audio();
//       audioElement.src = URL.createObjectURL(file);

//       audioElement.addEventListener("loadedmetadata", () => {
//         const durationInSeconds = audioElement.duration;
//         const minutes = Math.floor(durationInSeconds / 60);
//         const seconds = Math.floor(durationInSeconds % 60);

//         const formattedDuration = `${minutes}:${seconds
//           .toString()
//           .padStart(2, "0")}`;
//         resolve(formattedDuration);
//       });

//       audioElement.addEventListener("error", (error) => {
//         reject("Error al obtener la duración del archivo de audio.");
//       });
//     });
//   }

//   onSubmit() {}
// }

// Agregar evento clic al botón "Cancelar"
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
  const title = document.getElementById("titulo_audio").value;
  const musica = document.getElementById("musica_fondo").value;
  const procedencia = document.getElementById("procedencia").value;
  const formato = document.getElementById("formato_audio").value;

  // Realizar lógica de envío o procesamiento aquí
  console.log("Título:", title);
  console.log("Música de Fondo:", musica);
  console.log("Procedencia:", procedencia);
  console.log("Formato de Audio:", formato);

  // Restablecer el formulario
  resetForm();
}
function resetForm() {
  document.getElementById("audio__form").reset();
}

const captureAudio = (event) => {
  const capturedFile = event.target.files[0];
  if (capturedFile) {
    this.getAudioDuration(capturedFile).then((duration) => {
      this.duracion = duration;
    });
  }
  this.files.push(capturedFile);
};

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

// Validacion de Eleccion de elemento en el file chooser de audio
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

// obtener la duracion del audio
document
  .getElementById("audioFileInput")
  .addEventListener("change", function () {
    const audioFile = this.files[0]; // Obtén el archivo de audio seleccionado
    const duracionField = document.getElementById("duracion"); // Campo de duración

    if (audioFile) {
      getAudioDuration(audioFile).then((duration) => {
        // Convierte la duración en minutos
        const minutes = parseFloat(duration);

        // Valida que la duración esté entre 5 y 10 minutos
        if (!isNaN(minutes) && minutes >= 5 && minutes <= 10) {
          duracionField.value = duration;
          this.disabled = false; // Habilita el input de archivo
        } else {
          alert("La duración del audio debe estar entre 5 y 10 minutos.");
          this.value = ""; // Borra la selección de archivo
          duracionField.value = ""; // Borra la duración del campo
          this.disabled = true; 
        }
      });
    } else {
      duracionField.value = ""; // Borra la duración si no se selecciona ningún archivo
      this.disabled = false; // Habilita el input de archivo si no hay archivo seleccionado
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
