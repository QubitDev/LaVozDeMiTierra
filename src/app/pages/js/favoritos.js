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
/* --------------------- la lista de los favoritos ----------------------------------------------------*/ 

// referencias a las collecciones
const refAudio = db.collection('audio');
const refFav = db.collection('favorito');
const emailRef = localStorage.getItem("email");
const contenedorCards = document.getElementById('card');

refFav.onSnapshot((snapshot) => {
    snapshot.docs.forEach(document => {
        const emailFb = document.data().email;
        
        if(emailFb === emailRef){
            refAudio.doc(document.data().idNarracion).get().then((doc) => {
                if (doc.exists) {
                    contenedorCards.innerHTML += `
                    <div class="contenedora" >
                        <div class="contenedor_div" onClick="enviar('${document.data().idNarracion}')">
                          <img src="${doc.data().imageURL}">
                        </div>
                
                        <div class="contenedor_div" onClick="enviar('${document.data().idNarracion}')">
                           <h2>${doc.data().titulo}</h2>
                        </div>
                        <div class="contenedor_div" >
                            <h2>${doc.data().procedencia}</h2>
                        </div>
                        <div class="contenedor_div" >
                           <h2>${doc.data().narrador}</h2>
                        </div>
                        <div class="contenedor_div">
                           <h2>${doc.data().duracion}</h2>
                        </div>
                        <div class="contenedor_Cor">
                           <p id="Cora_fav" onClick="eliminarFav('${document.id}')" >♥️</p>
                        </div>
                    </div>
                    `;
                } 
            });
        }
    })
});


async function eliminarFav(id) {
    await refFav.doc(id).delete();
    window.location.reload();
}

function enviar(doc) {
    window.location.href = `./../html/reproducir.html?doc=${doc}`;
}

