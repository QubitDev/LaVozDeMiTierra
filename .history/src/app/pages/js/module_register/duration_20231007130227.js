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

  module.exports.get