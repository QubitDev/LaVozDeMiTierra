const numberCuentos = 4;
const numeroLeyendas = 4;
const scrollObject = document.querySelector('.contenidoUno');
const DosScrollObject = document.querySelector('.contenidoUno');

function agregarCuento(){
    const contenidoCinco = document.createElement("h2");
    contenidoCinco.innerHTML = 'Titulo de audio<br>Procedencia<br>Nombre del narrador<br>Nombre musica de fondo<br><br><br>'
    scrollObject.appendChild(contenidoCinco);
}
function eliminarCuento(){
    const contenidoUno = document.querySelector('#conenidoUno');
    scrollObject.removeChild(contenidoUno);
}
function agregarLeyenda(){
    const contenidoCinco = document.createElement("h2");
    contenidoCinco.innerHTML = 'Titulo de audio<br>Procedencia<br>Nombre del narrador<br>Nombre musica de fondo<br><br><br>'
    scrollObject.appendChild(contenidoCinco);
}
function eliminarLeyenda(){
    const contenidoCinco = document.createElement("h2");
    contenidoCinco.innerHTML = 'Titulo de audio<br>Procedencia<br>Nombre del narrador<br>Nombre musica de fondo<br><br><br>'
    scrollObject.appendChild(contenidoCinco);
}


