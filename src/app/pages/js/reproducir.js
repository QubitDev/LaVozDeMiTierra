const doc = document.getElementById('id-doc').value;

function getAllAudios() {
   // Obtén una referencia a la colección "audio"
   var audioCollection = db.collection("audio");
 
   // Realiza una consulta para obtener todos los documentos de la colección
   audioCollection.get().then((querySnapshot) => {
     querySnapshot.forEach((doc) => {
       // Accede al ID del documento
       console.log("ID del documento:", doc.id);
 
       // Accede a atributos específicos del documento
       var data = doc.data();
       console.log("Tipo audio", data.tipoAudio);
       console.log("Titulo:", data.titulo);
       console.log("Narrado por:", data.narrador);
       console.log("Musica:", data.musica);
     });
   }).catch((error) => {
     console.error("Error al recuperar documentos:", error);
   });
 }


 function getAllAudios() {
   var audioCollection = db.collection("audio");
   var documentList = document.getElementById("id-doc"); // Obtén el elemento ul
 
   audioCollection.get().then((querySnapshot) => {
     querySnapshot.forEach((doc) => {
       var listItem = document.createElement("li"); // Crea un elemento li para cada documento
       listItem.textContent = "ID: " + doc.id + ", Tipo de audio: " + doc.data().tipoAudio + ", Titulo: " + doc.data().titulo;
       documentList.appendChild(listItem); // Agrega el elemento li a la lista ul
     });
   }).catch((error) => {
     console.error("Error al recuperar documentos:", error);
   });
 }
 

 
 