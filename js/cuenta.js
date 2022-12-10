//Rellenar con los datos del LS
let usuario = document.getElementById('usuario');
usuario.innerText = `${localStorage.getItem('nombre')}`;
let nombre = document.getElementById('nombre');
nombre.innerText = `${localStorage.getItem('nombre')}`;
let apellido = document.getElementById('apellido');
apellido.innerText = `${localStorage.getItem('apellido')}`;
let email = document.getElementById('email');
email.innerText = `${localStorage.getItem('email')}`;

//Opción de cerrar sesion y borrar los datos en el Storage
let cerrarSesion = document.getElementById('cerrar-sesion');
cerrarSesion.onclick = () =>{
    Swal.fire({
        title: '¿Seguro quiere cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#BA7C35',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem('registrado', false);
            sessionStorage.setItem('registrado', false);  
            window.location.href='../../index.html'; 
        }
    })    
}