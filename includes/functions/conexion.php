<?php

    $conn = new mysqli("localhost", "root", "", "uptask");

    if($conn->connect_error) {
        echo 'Error al conectarse con la base de datos: ' . $conn->connect_error;
        exit;
    }

    $conn->set_charset('utf8');

?>