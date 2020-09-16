<?php
    
    $accion = $_POST['accion'];
    $id_proyecto = (int) $_POST['id_proyecto'];
    $tarea = $_POST['tarea'];
    $estado = $_POST['estado'];
    $id_tarea = (int) $_POST['id'];

    
    if($accion === 'crear') {

        // Importar la conexión
        include_once("../functions/conexion.php");

        try {
            // Realizar la consulta a la base de datos
            $stmt = $conn->prepare("INSERT INTO tareas(nombre, id_proyecto) VALUES (?,?);");
            $stmt->bind_param("si", $tarea, $id_proyecto);
            $stmt->execute();
            
            if($stmt->affected_rows > 0) {
                $respuesta = [
                    'respuesta' => 'correcto',
                    'id_insertado' => $stmt->insert_id,
                    'tipo' => $accion,
                    'tarea' => $tarea
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

    if($accion === 'actualizar') {
        // importar la conexion
        include '../functions/conexion.php';
        try {
            // Realizar la consulta a la base de datos
            $stmt = $conn->prepare("UPDATE tareas set estado = ? WHERE id = ? ");
            $stmt->bind_param('ii', $estado, $id_tarea);
            $stmt->execute();
            if($stmt->affected_rows > 0) {
                $respuesta = array(
                    'respuesta' => 'correcto'
                );
            }  else {
                $respuesta = array(
                    'respuesta' => 'error'
                );
            }
            $stmt->close();
            $conn->close();
        } catch(Exception $e) {
            // En caso de un error, tomar la exepcion
            $respuesta = array(
                'error' => $e->getMessage()
            );
        }
        
        echo json_encode($respuesta);
    }

?>