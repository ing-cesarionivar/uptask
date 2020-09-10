
function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();

    let usuario = document.querySelector('#usuario').value;
    let password = document.querySelector('#password').value;
    let tipo = document.querySelector('#tipo').value;
    
    if(usuario === '' || password === '') {
        // La validación falló
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Ambos campos son obligatorios!'
        });
    } else {
        // Ambos campos son correctas, mandar a ejecutar ajax

        // Datos que se envian al servidor
        let datos =  new FormData();
        datos.append('usuario', usuario);
        datos.append('password', password);
        datos.append('accion', tipo);

        // Crear el llamado a ajax
        let xhr = new XMLHttpRequest();

        // Abrir la conexion
        xhr.open('POST', 'includes/modelos/modelo-admin.php', true);

        // Retorno de datos
        xhr.onload = function() {

            if(this.status === 200){
                console.log(JSON.parse(xhr.responseText));
            }
        }   


        // Enviar la petición
        xhr.send(datos);

    }
    
}

eventListeners();