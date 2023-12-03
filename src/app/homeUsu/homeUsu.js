
const container = document.querySelector('.contenedor_todo');
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
const emailRef = localStorage.getItem("email");

searchUsu(emailRef);
//Cargamos los datos del usario;
function searchUsu(correoUsu){
  var usuariosRef = db.collection('users');
  usuariosRef.get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
          var datosUsuario = doc.data().correoElectronico;
          if(datosUsuario == correoUsu){
            if(doc.data().imagenURL != ""){
              document.getElementById('imagenUsu').src = doc.data().imagenURL;
            }
          }          
      });
    }).catch(function(error) {
      console.error("Error al leer la colección 'usuarios':", error);
    });
  }
// ********************************************** home usu **************************************************
const contenedorCards = document.getElementById('card');
const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');
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
db.collection('audio').onSnapshot((snapshot) => {
    cargarDocumentoCuento(snapshot.docs);
});

const cargarDocumentoCuento = (documentos) => {
    const contenedorCards = document.getElementById('card');
    if (documentos.length > 0) {
        
        documentos.forEach(documento => {
            if (documento.data().tipoAudio == "Cuento" && contenedorCards !== null) {
                contenedorCards.innerHTML += `
                    <div class="carta" id="carta" onClick="enviar('${documento.id}')">
                        <img src="${documento.data().imageURL}"
						    alt="La-leyenda-de-la-quinua-y-la-sal">
			
				        <div class="contenido-card">
					        <h3>${documento.data().titulo}</h3>
					        <p>${documento.data().musica}</p>
				        </div>

                    </div>
                `;
            }
        });

    }
}

db.collection('audio').onSnapshot((snapshot) => {

    cargarDocumentoLeyenda(snapshot.docs);
});


const cargarDocumentoLeyenda = (documentos) => {
    const contenedorCards1 = document.getElementById('card1');
    if (documentos.length > 0) {
        
        documentos.forEach(documento => {
            if (documento.data().tipoAudio == "Leyenda" && contenedorCards1 !== null) {
                contenedorCards1.innerHTML += `
                    <div class="carta" id="carta" onClick="enviar('${documento.id}')">
                         <img src="${documento.data().imageURL}"
                            alt="La-leyenda-de-la-quinua-y-la-sal">
                        <div class="contenido-card">
                            <h3>${documento.data().titulo}</h3>
                            <p>${documento.data().musica}</p>
                        </div>
                    </div>
                `;
           }
        });
    }
}


function enviar(doc) {
    window.location.href = `./../pages/html/reproducir.html?doc=${doc}`;
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // El usuario ha iniciado sesión, redirige a pagina principal
      console.log("El usuario ha iniciado sesión:", user);
      window.location.href = "homeUsu.html";
    } else {
      // El usuario no ha iniciado sesión, redirige a login.
      console.log("El usuario no ha iniciado sesión");
      window.location.href = "Login.html";
    }
  });

