
// Lista de proyectos
let listaProyectos = document.querySelector('ul#proyectos');


function eventListeners() {
    // Boton para crear proyecto
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
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
    
}

eventListeners();