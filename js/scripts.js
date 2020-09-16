
// Lista de proyectos
let listaProyectos = document.querySelector('ul#proyectos');


function eventListeners() {
    // Boton para crear proyecto
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

    // Boton para una nueva tarea
    document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);

    // Botones para las acciones de las tareas
    document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);

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
                        <a href="index.php?id_proyecto=${id_proyecto}" id="proyecto:${id_proyecto}">
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

        // Crear llamado ajax
        let xhr = new XMLHttpRequest();

        let datos =  new FormData();
        datos.append('tarea', nombreTarea);
        datos.append('accion', 'crear');
        datos.append('id_proyecto', document.querySelector('#id_proyecto').value);

        // Abrir la conexión
        xhr.open('POST', 'includes/modelos/modelo-tareas.php', true);

        // Ejecutarlo y respuesta
        xhr.onload = function() {
            if(this.status === 200) {
                let respuesta = JSON.parse(xhr.responseText);
                
                // Asignar valores
                let resultado = respuesta.respuesta;
                
                if(resultado === 'correcto') {
                    let id_insertado = respuesta.id_insertado;
                    let tarea = respuesta.tarea;
                    let tipo = respuesta.tipo;
                    
                    if(tipo === 'crear') {
                        // Lanzar alerta
                        Swal.fire({
                            icon: 'success',
                            title: 'Tarea creada',
                            text: 'La tarea: ' + tarea + ' se creó correctamente'
                        });
                        
                        // Construir el template
                        let nuevaTarea = document.createElement('li');

                        // Agregamos el ID
                        nuevaTarea.id = 'tarea:'+id_insertado;

                        // Agregar la clase tarea
                        nuevaTarea.classList.add('tarea');

                        // Construir el html 
                        nuevaTarea.innerHTML = `
                            <p>${tarea}</p>
                            <div class="acciones">
                                <i class="far fa-check-circle"></i>
                                <i class="fas fa-trash"></i>
                            </div>
                        `;

                        // Agregarlo al HTML
                        let listado = document.querySelector('.listado-pendientes ul');
                        listado.appendChild(nuevaTarea);

                        // Limpiar el formulario
                        document.querySelector('.agregar-tarea').reset();

                    }
                    


                } else {
                    // Hubo un error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Error al agregar la tarea'
                    });
                }

            }
        }

        // Enviar los datos
        xhr.send(datos);
        
    }
}

// Cambia el estado de las tareas o las elimina
function accionesTareas(e) {
    e.preventDefault();
    
    if(e.target.classList.contains('fa-check-circle')) {
        console.log('Hiciste click en el circulo');
    }

    if(e.target.classList.contains('fa-trash')) {
        console.log('Hiciste click en el zafacón');
    } 
}
eventListeners();