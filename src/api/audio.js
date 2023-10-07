document.getElementById("formulario").addEventListener("submit", function(e){

    e.preventDefault();
    let formulario = new FormData(document.getElementById("formulario"));
    fetch("agregarAudio.php", {
        method: "POST",
        body: formulario
    })
    .then(res => res.json())
    .then(data => {
        if(data == "true"){
            document.getElementById().value = "";

            alert("El audio se registro correctamente.");
        }else{
            console.log(data);
        }
    })
});