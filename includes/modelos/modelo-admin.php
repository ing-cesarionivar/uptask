<?php

    $accion = $_POST['accion'];
    $password = $_POST['password'];
    $usuario = $_POST['usuario'];

    if($accion === 'crear') {
        // Código para crear los administradores

        // Hashear passwords
        $opciones  = [
            'cost' => 12
        ];
        $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

        $respuesta = [
            'pass' => $hash_password
        ];

        echo json_encode($respuesta);

    }

    if($accion === 'login') {
        // Escribir código para que loguee a los administradores

    }

?>