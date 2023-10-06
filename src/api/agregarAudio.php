<?php
include("conexion.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $titulo_audio = $_POST["titulo_audio"];
    $musica_fondo = $_POST["musica_fondo"];
    $procedencia = $_POST["procedencia"];
    $formato_audio = $_POST["formato_audio"];
    $tipo_audio = $_POST["tipo_audio"];
    $narrador = $_POST["narrador"];
    $duracion = $_POST["duracion"];

    $archivo_audio_tmp = $_FILES["archivo_audio"]["tmp_name"];
    $archivo_texto_tmp = $_FILES["archivo_texto"]["tmp_name"];

    if (empty($archivo_audio_tmp) || empty($archivo_texto_tmp)) {
        die("Error: Debes cargar ambos archivos de audio y texto.");
    }

    $archivo_audio = file_get_contents($archivo_audio_tmp);
    $archivo_texto = file_get_contents($archivo_texto_tmp);

    $conn = conectarDB();

    $consulta = "INSERT INTO audio (titulo_audio, musica_fondo, procedencia, formato_audio, tipo_audio, narrador, duracion, archivo_audio, archivo_texto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";


    if ($stmt = $conn->prepare($consulta)) {

        $stmt->bind_param("sssbbb",$titulo_audio, $musica_fondo, $procedencia, $formato_audio, $tipo_audio, $narrador, $duracion, $archivo_audio, $archivo_texto);

        if ($stmt->execute()) {
            echo "Los datos se han insertado correctamente en la base de datos.";
        } else {
            die("Error al insertar datos en la base de datos: " . $stmt->error);
        }

        $stmt->close();
    } else {
        die("Error al preparar la sentencia SQL: " . $conn->error);
    }

    $conn->close();
}
?>