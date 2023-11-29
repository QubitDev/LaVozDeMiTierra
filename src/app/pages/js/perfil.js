
const emailRef = localStorage.getItem("email");

const container = document.querySelector('.container');
const rain = () => {
    let j = 0;
    while (j <= 80){
        let gout = document.createElement('i');
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

const endSesion = document.querySelector(".sesion");
endSesion.addEventListener('click',cerrarSesion);
const cagarName =document.getElementById("userNameContainer");
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

const choosee = document.getElementById("buttonEditar");
const cerrarChos = document.getElementById("cancelButton");

choosee.addEventListener("click",open);
cerrarChos.addEventListener("click",cerrar);

function cerrar(){
    document.getElementById("userProfileEditar").style.display = "none";
}
function open(){

  document.getElementById("userProfileEditar").style.display = "block";
}

// Función que devuelve una Promesa con el ID del usuario.
function getIdUsu() {
  return new Promise((resolve) => {
    const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
      const userId = obtenerIdUsuario(snapshot.docs, emailRef);
      unsubscribe(); // Detener el listener después de obtener el ID.
      resolve(userId);
      return userId;
    });
  });
}
// Función para obtener el ID del usuario.
const obtenerIdUsuario = (documentos, email) => {
  for (const documento of documentos) {
    if (documento.data().correoElectronico === email) {
      return documento.id;
    }
  }
  // Si no se encuentra ninguna coincidencia, puedes devolver un valor nulo o indicar que no se encontró.
  return null;
};


const buttonImg = document.querySelectorAll(".loadImg");
const imagenesPerfil = document.querySelectorAll(".imagenes");
const subirAc = document.getElementById("submitButton");


for(let i = 0; i < buttonImg.length; i++) {
  buttonImg[i].addEventListener("click", function() {
    document.getElementById('imageUsuario').src = imagenesPerfil[i].src;
  });
}


console.log(emailRef);
searchUsu(emailRef);


//Cargamos los datos del usario;
function searchUsu(correoUsu){
  var usuariosRef = db.collection('users');
  usuariosRef.get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
          var datosUsuario = doc.data().correoElectronico;
          if(datosUsuario == correoUsu){
            document.getElementById('nombreU').textContent = doc.data().nombreDeUsuario;
            if(doc.data().imagenURL != ""){
              document.getElementById('imageUsuario').src = doc.data().imagenURL;
            }
          }          
      });
    }).catch(function(error) {
      console.error("Error al leer la colección 'usuarios':", error);
    });
  }

subirAc.addEventListener("click", async () => {
    try {
        const userId = await getIdUsu();
        await actualizarUsu(userId);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    }
});

async function actualizarUsu(id) {
    try {
        const cambiar = db.collection('users').doc(id);
        var nombre = document.getElementById('NombeUsario').value;
        var imagen = document.getElementById('imageUsuario').src;
        await cambiar.update({ nombreDeUsuario: nombre, imagenURL: imagen });
        window.location.reload();
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    }
}
searchIconUsu(emailRef);
//Cargamos los datos del usario;
function searchIconUsu(correoUsu){
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