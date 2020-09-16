
// Lista de proyectos
let listaProyectos = document.querySelector('ul#proyectos');


function eventListeners() {
    // Boton para crear proyecto
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

    // Boton para una nueva tarea
    document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);

}

function nuevoProyecto(e) {
    e.preventDefault();
    
    // Crea un input para el nombre del nuevo proyecto
    let nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);

    // Seleccionar el id con el nuevoProyecto
    let inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    // Al presioanr enter crear el proyecto

    inputNuevoProyecto.addEventListener('keypress', function(e){
        
        let tecla = e.which || e.keyCode;

        if(tecla === 13) {
            guardarProyectoDB(inputNuevoProyecto.value);
            listaProyectos.removeChild(nuevoProyecto);
        }

    });
}

function guardarProyectoDB(nombreProyecto) {
    
    // Crear llamado ajax
    let xhr = new XMLHttpRequest();

    // Enviar datos por FormData
    let datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

    // Abriri la conexion
    xhr.open('POST', 'includes/modelos/modelo-proyecto.php', true);

    // En la carga
    xhr.onload = function() {

        if(this.status === 200) {
            
            // Obtener datos de la respuesta
            let respuesta = JSON.parse(xhr.responseText);
            let proyecto = respuesta.nombre_proyecto,
                id_proyecto = respuesta.id_insertado,
                tipo = respuesta.tipo,
                resultado = respuesta.respuesta;
            
            // Comprabar la inserción
            if(resultado === 'correcto') {
                // Fue exitoso
                if(tipo === 'crear') {
                    // Se creo un nuevo proyecto
                    // Inyectar en el HTML
                    let nuevoProyecto = document.createElement('li');
                    nuevoProyecto.innerHTML = `
                        <a href="index.php?id_proyecto=${id_proyecto}" id="${id_proyecto}">
                            ${proyecto}
                        </a>
                    `;

                    // Agregar al html
                    listaProyectos.appendChild(nuevoProyecto);

                    // Enviar alerta
                    Swal.fire({
                        icon: 'success',
                        title: 'Proyecto creado',
                        text: 'El proyecto: ' + proyecto + ' se creó correctamente'
                    }).then (resultado => {

                        if(resultado.value) {
                            // Redireccionar a la nueva url
                            window.location.href = 'index.php?id_proyecto=' + id_proyecto;

                        }

                    });


                } else {
                    // Se actualizo o se elimino
                }

            } else {
                // Hubo un error
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Error al crear el proyecto'
                });
            }
        }
    }

    // Enviar el request
    xhr.send(datos);
}

// Agregar una nueva tara al proyecto actual

function agregarTarea(e) {
    e.preventDefault();
    let nombreTarea = document.querySelector('.nombre-tarea').value;

    if(nombreTarea === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Una tarea no puede ir vacía'
        });
    } else {
        // La tarea tiene algo, insertar en PHP
        
    }
}

eventListeners();