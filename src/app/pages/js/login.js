
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorContainer = document.getElementById("errorContainer");
var correoElectronico = "starValue";
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    correoElectronico = emailInput.value;
    const contrasena = passwordInput.value;

    // Validación de formato de correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(correoElectronico)) {
        errorContainer.innerText = "Ingrese un correo electrónico válido";
        return;
    }


    // Validación de longitud de campos
    if (email.length > 64) {
        errorContainer.innerText = "El correo electrónico no debe exceder los 64 caracteres";
        return;
    }
    if (password.length > 32) {
        errorContainer.innerText = "La contraseña no debe exceder los 32 caracteres";
        return;
    }

    // Iniciar sesión con Firebase
    firebase.auth().signInWithEmailAndPassword(correoElectronico, contrasena)
        .then((userCredential) => {
            // Usuario autenticado con éxito
            const user = userCredential.user;
            if (correoElectronico === "trabajosoftware201@gmail.com") {
                // Redirige a la página homeAdm.html si el correo es "trabajosoftware201@gmail.com"
                window.location.href = "./../../homeAdm/homeAdm.html";
            } else {
                // Redirige a la página homeUsu.html para otros correos
                window.location.href = "./../../homeUsu/homeUsu.html";
            }
        })
        .catch((error) => {
          // Maneja los errores de autenticación
          if (error.code === "auth/user-not-found") {
              errorContainer.innerText = "El correo electrónico no existe";
          } else if (error.code === "auth/wrong-password") {
              errorContainer.innerText = "Contraseña incorrecta";
          } else {
              // Otros errores
              errorContainer.innerText = "Error de inicio de sesión";
          }
        });        
});


const container = document.querySelector('.container')

const rain = () => {
    let j = 0

    while (j <= 80){
        let gout = document.createElement('i')
        let x = innerWidth * Math.random()
        let time = 1 * Math.random()
        gout.style.animationDuration = time <= 0.4 ? (time + 0.4) + 's'  : time + 's'
        gout.style.animationDelay = time + 's'
        gout.style.left = x + 'px'

        container.appendChild(gout)

        j++
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



const choosee = document.querySelector(".buttonEditar");
const cerrarChos = document.getElementById("cancelButton");

choosee.addEventListener("click",cambiar);
cerrarChos.addEventListener("click",cerrar);

function cambiar(){
    document.getElementById("userProfileEditar").style.display = "block";
}
function cerrar(){
    document.getElementById("userProfileEditar").style.display = "none";
}

