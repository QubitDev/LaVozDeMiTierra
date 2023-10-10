function agregarAudio() {
    // Obtén referencias a los archivos seleccionados por el usuario
    const archivoAudio = document.getElementById("archivo_audio").files[0];
    const archivoTexto = document.getElementById("archivo_texto").files[0];

    if (!archivoAudio || !archivoTexto) {
        alert("Selecciona tanto un archivo de audio como un archivo de texto.");
        return;
    }

    // Genera nombres únicos para los archivos en Firebase Storage
    const nombreArchivoAudio = archivoAudio.name + "_" + Date.now();
    const nombreArchivoTexto = archivoTexto.name + "_" + Date.now();

    // Referencias al almacenamiento en Firebase para ambos archivos
    const storageRefAudio = storage.ref().child(nombreArchivoAudio);
    const storageRefTexto = storage.ref().child(nombreArchivoTexto);

    // Sube los archivos al almacenamiento
    const subidaAudio = storageRefAudio.put(archivoAudio);
    const subidaTexto = storageRefTexto.put(archivoTexto);

    // Promesa para la subida de archivos
    Promise.all([subidaAudio, subidaTexto])
        .then((results) => {
            // Obtiene las URLs de descarga de ambos archivos subidos
            const audioDownloadURL = results[0].ref.getDownloadURL();
            const textoDownloadURL = results[1].ref.getDownloadURL();
            return Promise.all([audioDownloadURL, textoDownloadURL]);
        })
        .then(([audioURL, textoURL]) => {
            // Agrega los datos a Firestore, incluyendo las URLs de descarga de los archivos
            return db.collection("audio").add({
                tituloAudio: document.getElementById("titulo_audio").value,
                musicaFondo: document.getElementById("musica_fondo").value,
                procedencia: document.getElementById("procedencia").value,
                formatoAudio: document.getElementById("formato_audio").value,
                tipoAudio: document.getElementById("tipo_audio").value,
                narrador: document.getElementById("narrador").value,
                duracion: document.getElementById("duracion").value,
                archivoAudioURL: audioURL, // Agrega la URL de descarga del archivo de audio
                archivoTextoURL: textoURL  // Agrega la URL de descarga del archivo de texto
            });
        })
        .then((docRef) => {
            alert("Registro realizado exitosamente");
        })
        .catch((error) => {
            alert("Ocurrió un error al registrar: " + error.message);
        });
}