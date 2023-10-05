class FormRegisterComponent {
  constructor() {
    this.files = [];
    this.audioForm = new FormGroup({
      Title: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z0-9\\s]+$"),
      ]),
      Musica: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(50),
        Validators.pattern("^[a-zA-Z\\s]+$"),
      ]),
      Procedencia: new FormControl("", [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(4),
        Validators.pattern("^[a-zA-Z\\s]+$"),
      ]),
      formato: new FormControl("----", Validators.required),
      Tipo: new FormControl("", Validators.required),
      narrador: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z\\s]+$"),
      ]),
      duracion: new FormControl("", Validators.required),
      inputMusica: new FormControl(null, Validators.required),
      inputTxt: new FormControl(null, Validators.required),
    });
    this.formatFile = "";
    this.duracion = "";
    this.selectedTipo = "";
  }

  ngOnInit() {}

  captureFile(event, audioForm) {
    const tipoAudioElement = audioForm.get("tipo_audio");
    if (tipoAudioElement !== null && tipoAudioElement !== undefined) {
      this.selectedTipo = tipoAudioElement.value;
    } else {
      this.selectedTipo = "";
    }
    const capturedFile = event.target.files[0];
    const formData = audioForm.value;
    this.files.push(capturedFile, formData);
  }

  captureAudio(event) {
    const capturedFile = event.target.files[0];
    if (capturedFile) {
      this.getAudioDuration(capturedFile).then((duration) => {
        this.duracion = duration;
      });
    }
    this.files.push(capturedFile);
  }

  uploadFile() {
    try {
      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append("files", file);
        console.log(file);
      });
      // Lógica para subir archivos
    } catch (error) {
      console.log("error", error);
    }
  }

  reset() {
    this.audioForm.reset();
  }

  updateAcceptAttribute(event) {
    const selectedFormat = event.target.value;
    switch (selectedFormat) {
      case "MP3":
        this.formatFile = ".mp3";
        break;
      case "WAV":
        this.formatFile = ".wav";
        break;
      case "AIFF":
        this.formatFile = ".aiff";
        break;
    }
  }

  async getAudioDuration(file) {
    return new Promise((resolve, reject) => {
      const audioElement = new Audio();
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

      audioElement.addEventListener("error", (error) => {
        reject("Error al obtener la duración del archivo de audio.");
      });
    });
  }

  onSubmit() {}
}


function resetForm