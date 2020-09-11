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

        // Importar la conexión
        include_once("../functions/conexion.php");

        try {
            // Realizar la consulta a la base de datos
            $stmt = $conn->prepare("INSERT INTO usuarios(usuario, password) VALUES (?,?);");
            $stmt->bind_param("ss", $usuario, $hash_password);
            $stmt->execute();
            
            if($stmt->affected_rows > 0) {
                $respuesta = [
                    'respuesta' => 'correcto',
                    'id_insertado' => $stmt->insert_id,
                    'tipo' => $accion
                ];
                
            } else {
                $respuesta = [
                    'respuesta' => 'error'
                ];
            }

            $stmt->close();
            $conn->close();

        } catch (Exception $_ENV) {
            // En caso de un error tomar la excepcion
            $respuesta = [
                'pass' => $e->getMessage()
            ];
        }

        echo json_encode($respuesta);

    }

    if($accion === 'login') {
        // Escribir código para que loguee a los administradores
        // Importar la conexión
        include_once("../functions/conexion.php");

        try {
            // Seleccionar el administrador de la base de datos

            $stmt = $conn->prepare("SELECT id, usuario, password FROM usuarios WHERE usuario = ?;");
            $stmt->bind_param("s", $usuario);
            $stmt->execute();
            
            // Loguer el usuario
            $stmt->bind_result($id_usuario, $nombre_usuario, $password_usuario);
            $stmt->fetch();
            if($nombre_usuario) {
                // El usuario existe verificar el password
                if(password_verify($password, $password_usuario)) {
                    // Login correcto
                    $respuesta = [
                        'respuesta' => 'correcto',
                        'nombre' => $nombre_usuario,
                        'tipo' => $accion
                    ];
                } else {
                    // Login incorrecto, enviar error
                    $respuesta = [
                        'resultado' => 'Usuario o contraseña incorreto'
                    ];
                }
            } else {
                $respuesta = [
                    'respuesta' => 'Usuario no existe'
                ];
            }
            
            $stmt->close();
            $conn->close();

        } catch (Exception $_ENV) {
            // En caso de un error tomar la excepcion
            $respuesta = [
                'pass' => $e->getMessage()
            ];
        }

        echo json_encode($respuesta);

    }

?>