<?php
function conectarDB() {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "qubit";

    // Crea una conexión a la base de datos
    $conn = new mysqli($servername, $username, $password, $database);

    // Verifica si la conexión tuvo éxito
    if ($conn->connect_error) {
        die("Error en la conexión: " . $conn->connect_error);
    }

    return $conn;
}
?>