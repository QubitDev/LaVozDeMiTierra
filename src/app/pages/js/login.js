document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById('error-message');
  
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Aquí deberías verificar las credenciales en el servidor.
      // Este es solo un ejemplo para administrador
      const allowedCredentials = {
        'superAdmin': 'tbomch87',
        'admin213': '018846',
        'adminRed': '12345'
        // Agregar más credenciales aquí si es necesario
    };

    // Verificar si las credenciales coinciden con las permitidas
    if (allowedCredentials.hasOwnProperty(username) && allowedCredentials[username] === password) {
        // Las credenciales son correctas.
        // Realiza la redirección apropiada según el nombre de usuario
        switch (username) {
            case 'superAdmin':
                window.location.href = "./../../../app/homeAdm/homeAdm.html";
                break;
            case 'admin213':
                window.location.href = "./../../../app/homeUsu1/homeAdm.html";
                break;
            case 'adminRed':
                window.location.href = "./../../../app/homeUsu2/homeAdm.html";
                break;
            // Agregar más casos para otros usuarios si es necesario
            default:
                errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
        }
    } else {
        // Las credenciales son incorrectas.
        errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
    }

      //ejemplo para el usuario
      if (username === 'MarcoSG' && password === '100087') {
        // Las credenciales son correctas.
        // Redirige a la pantalla de inicio de la plataforma
        window.location.href = "./../../../app/homeUsu/homeUsu.html";
      } else {
        errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
      }
    });
});






/*
cerrar.addEventListener('clik', (e) =>{
    auth.signOut().then(()=>{
        alert('Sesion cerrada');
    }).cath((error)=>{
        alert('Error al cerrar sesion');
    });
});

auth.onAuthStateChanged(user =>{
    if(user){
        console.log("Usuario activo");
        var nombreDeUsuario = user.userVerified;
        if(userVerified){
            window.open("https://www.google.com/")
        }else{
            auth.signOut();
        }
    }
})*/
/*
document.getElementById('Acceder').addEventListener('clik',function(){
    document.getElementById("login-form");
    alert("Bienvenido");
    const  nombre = document.getElementById("nombreDeUsuario").value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, nombre,password).then((userCredential) =>{
        const user = user.userCredential.user;
        document.getElementById()
    })
})*/