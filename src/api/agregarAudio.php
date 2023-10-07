<?php

$titulo_audio = isset($_POST["titulo_audio"]) ? $_POST["titulo_audio"] : "";
$musica_fondo = isset($_POST["musica_fondo"]) ? $_POST["musica_fondo"] : "";
$procedencia = isset($_POST["procedencia"]) ? $_POST["procedencia"] : "";
$formato_audio =isset($_POST["formato_audio"]) ? $_POST["formato_audio"] : "";
$tipo_audio = isset($_POST["tipo_audio"]) ? $_POST["tipo_audio"] : "";
$narrador = isset($_POST["narrador"]) ? $_POST["narrador"] : "";
$duracion = isset($_POST["duracion"]) ? $_POST["duracion"] : "";

$archivo_audio_tmp = isset($_FILES["archivo_audio"]["tmp_name"]) ? $_FILE["archivo_audio"]["tmp_name"] : "";
$archivo_texto_tmp = isset($_FILES["archivo_texto"]["tmp_name"]) ? $_FILE["archivo_texto"]["tmp_name"] : "";

$archivo_audio = file_get_contents($archivo_audio_tmp);
$archivo_texto = file_get_contents($archivo_texto_tmp);
try{

    $conexion = new PDO("mysql:host=localhost;port=3306;dbname=qubit", "root", "");
    $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    $pdo = $conexion ->prepare("INSERT INTO audio(titulo_audio, musica_fondo, procedencia, formato_audio, tipo_audio, narrador, duracion, archivo_audio, archivo_texto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $pdo->bindParam(1, $titulo_audio);
    $pdo->bindParam(2, $musica_fondo);
    $pdo->bindParam(3, $procedencia);
    $pdo->bindParam(4, $formato_audio);
    $pdo->bindParam(5, $tipo_audio);
    $pdo->bindParam(6, $narrador);
    $pdo->bindParam(7, $duracion);
    $pdo->bindParam(8, $archivo_audio);
    $pdo->bindParam(9, $archivo_texto);
    $pdo->execute() or die(print($pdo->errorInfo()));

    echo json_encode("true");

} catch(PDOException $error){
    echo $error -> getMessage();
    die();
}
?>