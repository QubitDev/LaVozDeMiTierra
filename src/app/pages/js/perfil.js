
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
const buttonImg = document.querySelectorAll(".loadImg");
const imagenesPerfil = document.querySelectorAll(".imagenes");

for(let i = 0; i < buttonImg.length; i++) {
  buttonImg[i].addEventListener("click", function() {
    document.getElementById('imageUsuario').src = imagenesPerfil[i].src;
  });
}


const choosee = document.querySelector(".buttonEditar");
const cerrarChos = document.getElementById("cancelButton");

choosee.addEventListener("click",editar);
cerrarChos.addEventListener("click",cerrar);


function cerrar(){
    document.getElementById("userProfileEditar").style.display = "none";
}

// Función para manejar el caso cuando el usuario está autenticado
function onUsuarioAutenticado(user) {
  if (user) {
    // El usuario está autenticado
    console.log("Usuario autenticado:", user.email);
    searchUsu(user.email);
    return user.email;
  } else {
    // No hay un usuario autenticado
    console.log("No hay usuario autenticado.");
  }
}

// Función para manejar el cambio en el estado de autenticación
function handleAuthStateChanged(user) {
  onUsuarioAutenticado(user);
}

// Escuchar cambios en el estado de autenticación
firebase.auth().onAuthStateChanged(handleAuthStateChanged);
editar(getIdUsu(onUsuarioAutenticado(user)));
/*
// Verificar el estado de autenticación en cualquier momento
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // El usuario está autenticado
      console.log("Usuario autenticado:", user.email);
      searchUsu(user.email); 
      return user.email;
       } else {
          // No hay un usuario autenticado
          console.log("No hay usuario autenticado.");
        }
});*/

//Cargamos los datos del usario;
function searchUsu(correoUsu){
  // Obtén una referencia a la colección "usuarios"
  var usuariosRef = db.collection('users');
  // Obtén todos los documentos de la colección
  usuariosRef.get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
          // doc.data() es un objeto con los campos del documento
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


function editar(id){
    document.getElementById("userProfileEditar").style.display = "block";
    const subirAc =document.getElementById('submitButton');
    subirAc.onclick= async function(){
        const cambiar = db.collection('users').doc(id);
        var nombreUsu = document.getElementById('nombreU').textContent;
        var imagenPer = document.getElementById('imageUsuario').src;

        await cambiar.update({nombreDeUsuario: nombreUsu});
        await cambiar.update({imagenURL: imagenPer});       
        document.getElementById("userProfileEditar").style.display = "none";
        window.location.reload();
    }
    
}
/*
async function editarUsu(id){
  const cambiar = db.collection('users').doc(id);
  const nombreUsu = document.getElementById('NombeUsario').value;
  //const imagenUsu = document.getElementById('imagePerfil').src;
  await cambiar.update({nombreDeUsuario: nombreUsu});
  await cambiar.update({imagenURL: imagenUsu}); 
  document.getElementById("userProfileEditar").style.display = "none";
  window.location.reload();
}
*/
//Obtenemos el id del usario
function getIdUsu(email){
  db.collection('users').onSnapshot((snapshot) => {
    usuarios(snapshot.docs,email);
  })
}
const usuarios = (documentos,email) => {
  if (documentos.length > 0){        
      documentos.forEach(documento => {
          if(documento.data().correoElectronico == email){
            return(documento.id); 
          }
      }); 
  }
}
