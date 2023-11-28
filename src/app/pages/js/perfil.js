
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
console.log(getIdUsu(emailRef));

const buttonImg = document.querySelectorAll(".loadImg");
const imagenesPerfil = document.querySelectorAll(".imagenes");
const subirAc =document.getElementById('submitButton');


for(let i = 0; i < buttonImg.length; i++) {
  buttonImg[i].addEventListener("click", function() {
    document.getElementById('imageUsuario').src = imagenesPerfil[i].src;
  });
}


console.log(emailRef);
searchUsu(emailRef);

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
  const subirUsu = document.getElementById('submitButton');
  subirUsu.addEventListener("click", () => {
    const idUsuario = getIdUsu(emailRef);
    actualizarUsu(idUsuario);
});

async function actualizarUsu(id) {
    const cambiar = db.collection('users').doc(id);
    var nombre = document.getElementById('NombeUsario').value;
    //var imagen = document.getElementById('imageUsuario').src;

    await cambiar.update({ nombreDeUsuario: nombre});

    setTimeout(() => {
        cerrar();
        window.location.reload();
    }, 2500);
}

/*
  const subirUsu = document.getElementById('submitButton');
  searchUsu.addEventListener("click",actualizarUsu(getIdUsu(emailRef)));

  async function actualizarUsu(id){
    const cambiar = db.collection('users').doc(id);
      var nombre = document.getElementById('NombeUsario').value;
      var imagen = document.getElementById('imageUsuario').src;     

      await cambiar.update({nombreDeUsuario: nombre});
      await cambiar.update({imagenURL: imagen});        

      setTimeout(() => {            
          cerrar();
          window.location.reload();
        },2500); 
  }

  
/*function editar(id) {  
    // El usuario está autenticado
    console.log("Usuario autenticado:", user.email);
    searchUsu(user.email);
    subirAc.onclick= async function(){
      const cambiar = db.collection('users').doc(id);
      var nombreUsu = document.getElementById('nombreU').textContent;
      var imagenPer = document.getElementById('imageUsuario').src;

      await cambiar.update({nombreDeUsuario: nombreUsu});
      await cambiar.update({imagenURL: imagenPer});       
      window.location.reload();
  }
    return user.email;
  
}
*/
/*
// Función para manejar el caso cuando el usuario está autenticado

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


