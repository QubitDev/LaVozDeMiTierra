<?php
include('conexion.php');

function agregarAudio($titulo_audio, $musica_fondo, $procedencia, $formato_audio, $tipo_audio, $narrador, $duracion, $archivo_audio_path, $archivo_texto_path) {
    $conn = conectarDB();

    $archivo_audio = file_get_contents($archivo_audio_path);
    $archivo_texto = file_get_contents($archivo_texto_path);

    $sql = "INSERT INTO audio (titulo_audio, musica_fondo, procedencia, formato_audio, tipo_audio, narrador, duracion, archivo_audio, archivo_texto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param($titulo_audio, $musica_fondo, $procedencia, $formato_audio, $tipo_audio, $narrador, $duracion, $archivo_audio, $archivo_texto);

        if ($stmt->execute()) {
            echo "Registro insertado con éxito.";
        } else {
            echo "Error al insertar el registro: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Error en la preparación de la sentencia: " . $conn->error;
    }

    $conn->close();
}
?>