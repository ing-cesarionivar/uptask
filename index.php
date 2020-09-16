<?php 
    include_once("includes/functions/sesiones.php"); 
    include_once("includes/functions/funciones.php");
    include_once("includes/templates/header.php");
    include_once("includes/templates/barra.php");
    
    //Obtener el id de la url
    if(isset($_GET['id_proyecto'])) {
        $id_proyecto = $_GET['id_proyecto'];
    } else {
        $id_proyecto = null;
    }
?>

    <div class="contenedor">
        
        <?php include_once("includes/templates/sidebar.php"); ?>

        <main class="contenido-principal">
                
            <?php 
            $proyecto = obtenerNombreProyecto($id_proyecto);

            if($proyecto): ?>

            <h1> Proyecto Actual:
            <?php
                foreach($proyecto as $nombre): ?>

                <span>
                    <?php echo $nombre['nombre']; ?>
                </span>        
            
                <?php endforeach; ?>

            </h1>

            <form action="#" class="agregar-tarea">
                <div class="campo">
                    <label for="tarea">Tarea:</label>
                    <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
                </div>
                <div class="campo enviar">
                    <input type="hidden" id="<?php echo $id_proyecto; ?>">
                    <input type="submit" class="boton nueva-tarea" value="Agregar">
                </div>
            </form>
            
            <?php else:
                    // Si no hay proyecto seleccionados
                    echo "<p>Selecciona un proyecto a la izquierda";
                endif;
            ?>

                    

            <h2>Listado de tareas:</h2>

            <div class="listado-pendientes">
                <ul>

                    <li id="tarea:" class="tarea">
                    <p>Cambiar el Logotipo</p>
                        <div class="acciones">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-trash"></i>
                        </div>
                    </li>  
                </ul>
            </div>
        </main>
    </div><!--.contenedor-->
<?php include_once("includes/templates/footer.php"); ?>