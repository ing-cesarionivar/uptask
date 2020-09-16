<?php
    // Obtiene la pagina actual que se ejecta
    function obtenerPaginaActual() {
        $archivo = basename($_SERVER['PHP_SELF']);
        $pagina = str_replace(".php", "", $archivo);
        return $pagina;
    }

    /* Consultas */
    // Obtener todos los proyectos
    function obtenerProyectos() {
        include("conexion.php");

        try {
            return $conn->query("SELECT id, nombre FROM proyectos");

        } catch(Exception $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    // Obtener nombre proyecto
    function obtenerNombreProyecto($id) {
        include("conexion.php");

        if($id != null) {
            try {
             return $conn->query("SELECT nombre FROM proyectos WHERE id = {$id}");
    
            } catch(Exception $e) {
                echo "Error: " . $e->getMessage();
                return false;
            }

        } else {
            return [];
        }

    }

   
?>