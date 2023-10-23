 
 const urlParams = new URLSearchParams(window.location.search);
 const docId = urlParams.get("doc");
 const docIdHome = urlParams.get("docHome"); 
 
 const tipo = document.getElementById("tipo__audio");

 const  titulo = document.getElementById("titulo__audio");
 const narradorAudio = document.getElementById("narrador");
 const musicaF = document.getElementById("musica");
 
 const audioElement = document.getElementById("audioE");
 const textContentElement = document.getElementById('text_content');
 
 db.collection("audio").doc(docId).get().then((doc) => {
   if (doc.exists) {
       const data = doc.data();
       tipo.innerText = data.tipoAudio;
       titulo.innerText = data.titulo;
       narradorAudio.innerText = `Narrado por: ${data.narrador}`;
       musicaF.innerText = `Música de Fondo: ${data.musica}`;
       var texto = d.child(data.textURL);
       textContentElement = texto.getDownloadURL();
       



       audioElement.src = data.audioURL;
       console.log(textContentElement);
       console.log(audioElement);
 
   } else {
       console.log("No se encontró el documento en Firestore.");
   }
 } );
 
 /*<!-- HTML -->
  // Reemplaza con la ruta de tu archivo

// Obtiene la URL de descarga del archivo
archivoRef.getDownloadURL()

<textarea id="textArea" rows="10" cols="50"></textarea>

<script>
  // Obtén una referencia al elemento de texto y al archivo que deseas cargar
  var textArea = document.getElementById('textArea');
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var txtFileRef = storageRef.child('ruta/del/archivo.txt'); // Reemplaza con la ruta de tu archivo .txt en Firebase Storage

  // Descarga el archivo
  txtFileRef.getDownloadURL().then(function(url) {
    // Utiliza la URL para descargar el contenido del archivo
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener el archivo.');
        }
        return response.text();
      })
      .then(data => {
        textArea.textContent = data; // Muestra el contenido en el elemento <textarea>
      })
      .catch(function(error) {
        console.error('Error al recuperar el archivo:', error);
      });
  }).catch(function(error) {
    console.error('Error al obtener la URL de descarga:', error);
  });
</script>

 */

 
