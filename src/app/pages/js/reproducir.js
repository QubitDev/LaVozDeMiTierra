//const doc = document.getElementById('id-doc').value;

db.collection("audio").get().then((querySnapshot) =>{
   querySnapshot.forEach((doc) => {
      document.getElementById("datos_Audio").innerHTML=`<br><br><h3> ${doc.data().tipoAudio}</h3> 
      <br>
      <p>${doc.data().titulo}</p>
      <p> Narrado por: ${doc.data().narrador}</p>
      <p> Musica: ${doc.data().musica}</p>`;

      datos.appendChild(div);
      
   });

});