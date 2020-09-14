<?php
    
    $accion = $_POST['accion'];
    $proyecto = $_POST['proyecto'];

    
    if($accion === 'crear') {

        // Importar la conexión
        include_once("../functions/conexion.php");

        try {
            // Realizar la consulta a la base de datos
            $stmt = $conn->prepare("INSERT INTO proyectos(nombre) VALUES (?);");
            $stmt->bind_param("s", $proyecto);
            $stmt->execute();
            
            if($stmt->affected_rows > 0) {
                $respuesta = [
                    'respuesta' => 'correcto',
                    'id_insertado' => $stmt->insert_id,
                    'tipo' => $accion,
                    'nombre_proyecto' => $proyecto
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
                'error' => $e->getMessage()
            ];
        }

        echo json_encode($respuesta);

    }

?>